import React, { useEffect, useRef, useState } from "react";
import { getCars, createCar, updateCar, deleteCar, startEngine, switchEngine, stopEngine, createWinner, getWinner, updateWinner, deleteWinner } from "../../api/api";
import { ICar, IWinner } from "../../interfaces";
import CarItem from '../car-item/car-item';
import EditPopup from '../edit-popup/edit-popup';
import { ICarState, CarState } from './carstate';
import { createRandomCars, isDark } from './create-random-cars';
import WinnerPopup from '../winner-popup/winner-popup';
import '../../style.css';
import './garage.css';

class CarController {
  onChange: (state: ICarState, id: number) => void;
  private state: CarState;
  id: number;

  constructor(id: number) {
    this.id = id;
    this.state = CarState.initial;
  }
  destroy() { }
  cancel() {
    // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.stoped } : item.state })));
    if (this.state == CarState.stoped) return;
    this.state = CarState.stoped;
    stopEngine(this.id).then(() => {
      console.log('stoped');
      this.state = CarState.initial;
      this.onChange({ name: CarState.initial }, this.id);
      // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.initial } : item.state })))
    }
    )
  }
  start() {
    if (this.state !== CarState.initial) return;
    this.state = CarState.started;
    // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.started } : item.state })));
    return startEngine(this.id).then(res => {
      if (this.state !== CarState.started) return;
      this.state = CarState.animate;
      const time = res.distance / res.velocity;
      this.onChange({ name: CarState.animate, time: time }, this.id);
      // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.animate, time: time } : item.state })));
      return switchEngine(this.id).then(res => {
        if (this.state !== CarState.animate) return;
        if (res === 'broken') {
          this.state = CarState.broken;
          this.onChange({ name: CarState.broken}, this.id);
          return;
          // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.broken } : item.state })));
        } else if (res === 'finished') {
          this.state = CarState.finished;
          this.onChange({ name: CarState.finished }, this.id);
          return { state: this.state, time: time, id: this.id }
          // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.finished } : item.state })));
        }
      })
    })
  }
}

class RaceController {
  cars: ICar[];
  controllers: Record<number, CarController> = {};
  onChange: (state: ICarState, id: number) => void;

  constructor(cars: Array<ICar>) {
    this.cars = cars;
    cars.map(it => {
      const controller = new CarController(it.id);
      controller.onChange = (state, id) => this.onChange(state, id);
      this.controllers[it.id] = controller;
    })

  }
  start(id: number) {
    this.controllers[id].start();
  }
  cancel(id: number) {
    this.controllers[id].cancel();
  }
  destroy() {}
  race() {
    return Promise.all(Object.values(this.controllers).map(it => it.start()))
      .then(res => res.filter(it => it).sort((a, b) => a.time - b.time))
      .then(res => {
        console.log(res);
        return res[0]
      })
      .then(winner => {
        console.log(this.cars.find(it =>(it.id === winner.id)))
        return getWinner(winner.id).then(res => {
          if (res) {
            console.log('update', winner.id)
            return updateWinner({ id: winner.id, time: winner.time, wins: res.wins + 1 });
          } else {
            console.log('add', winner.id)
            return createWinner({ id: winner.id, time: winner.time, wins: 1 });
          }
        }).then((res) => {
          return {
            ...winner,
            ...res,
            ...(this.cars.find(it =>(it.id === winner.id)))
          }
        })
      });
  }
  reset() {
    Object.values(this.controllers).map(it => it.cancel());
  }
}

type GarageProps = {
  page: number;
  onPage: (page: number) => void;
}

export default function Garage({page, onPage}: GarageProps) {
  const raceController = useRef<RaceController | null>(null);

  const [cars, setCars] = useState<Array<{ data: ICar, state: ICarState }>>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(0);
  const [winnerData, setWinnerData] = useState<(ICar & IWinner) | null>(null);

  let limit: number = 7;

  useEffect(() => {
    const controller = new RaceController(cars.map(it => it.data));
    raceController.current = controller;
    controller.onChange = (state, id) => {
      setCars(last => last.map(item => ({ ...item, state: item.data.id === id ? state : item.state })));
    }
    return () => {
      controller.destroy();
    }
  }, [cars])

  const updateCars = () => {
    return getCars(page + 1, limit).then(({ cars, total }: { cars: Array<ICar>, total: number }) => {
      setTotal(total);
      console.log(cars);
      setCars(cars.map(it => ({ data: it, state: { name: CarState.initial } })))
    });
  }

  useEffect(() => {
    updateCars();
  }, [page]);

  return (
    <div className="garage">
      <div className="garage__wrapper">
        <h3 className="garage__title">Garage <span className="garage__car-count">({total})</span></h3>
        <h4 className="garage__page-number">Page: {page + 1}</h4>

        <div className="garage__buttons">
          <button className="btn garage__button garage__button--create100"
            onClick={() => createRandomCars().then(() => updateCars())}>Create 100 cars
          </button>

          <button className="btn garage__button garage__button--add"
            onClick={() => {
              setSelectedCar(null);
              setOpenPopup(true)
            }}>Add</button>

          <button className="btn garage__button garage__button--race"
            onClick={() => {
              raceController.current.race().then(winner => setWinnerData(winner));
            }}>Race</button>

          <button className="btn garage__button garage__button--reset"
            onClick={() => {
              raceController.current.reset();
            }}>Reset</button>
        </div>

        {openPopup &&
          <EditPopup selectedCarData={selectedCar === null ? { id: null, name: '', color: '#ff0000' } : cars.find(it => selectedCar === it.data.id).data}
            onOk={(result) => {
              setOpenPopup(false);
              // создание новой машины или обновление уже имеющейся
              // в зависимости от id 
              if (result.id === null) {
                createCar(result.name, result.color).then(() => updateCars());
              } else {
                updateCar(result.id, result.name, result.color).then(() => updateCars());
              }
            }}
            onCancel={() => { setOpenPopup(false) }}
          />}

        <div>{cars.map((it) => <CarItem key={it.data.id} data={it.data} carState={it.state}
          onEdit={() => {
            setSelectedCar(it.data.id);
            setOpenPopup(true)
          }}
          onStart={() => {
            raceController.current.start(it.data.id);
          }}
          onStop={() => {
            raceController.current.cancel(it.data.id);
          }}
          onDelete={
            () => deleteCar(it.data.id).then(() => {
              deleteWinner(it.data.id);
              updateCars();
            })
          }
        />)}
        </div>
        <div className="garage__pagination">
          {new Array(Math.ceil(total / limit)).fill(null)
            .map((it, index) => <button className="btn garage__pagination-button" onClick={() => onPage(index)}>{index + 1}</button>)
          }            
        </div>
        {winnerData && <WinnerPopup winnerData={winnerData} onCancel={() => setWinnerData(null)}/>}
      </div>
    </div>
  )
}