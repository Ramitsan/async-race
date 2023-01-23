import React, { useEffect, useRef, useState } from "react";
import { getCars, createCar, updateCar, deleteCar, startEngine, switchEngine, stopEngine } from "../../api/api";
import { ICar } from "../../interfaces";
import CarItem from '../car-item/car-item';
import EditPopup from '../edit-popup/edit-popup';
import { ICarState, CarState } from './carstate';
import { createRandomCars } from './create-random-cars';
import '../../style.css';
import './garage.css';

class CarController{
  onChange: (state: ICarState, id: number) => void; 
  private state: CarState;
  id: number;

  constructor(id: number) {
    this.id = id;
    this.state = CarState.initial;
  }
  destroy() {}
  cancel() {
    // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.stoped } : item.state })));
    if(this.state == CarState.stoped) return;
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
    if(this.state !== CarState.initial) return;
    this.state = CarState.started;
    // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.started } : item.state })));
    startEngine(this.id).then(res => {
      // console.log(cars.find(jt => jt.data.id == it.data.id).state.name, 'animate')
      if(this.state !== CarState.started) return;
      this.state = CarState.animate;
      const time = res.distance / res.velocity;
      this.onChange({ name: CarState.animate, time: time }, this.id);
      // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.animate, time: time } : item.state })));
      switchEngine(this.id).then(res => {
        if(this.state !== CarState.animate) return;
        // console.log(cars.find(jt => jt.data.id == it.data.id).state.name, 'finished')
        if (res === 'broken') {
          this.state = CarState.broken;
          // setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.broken } : item.state })));
        } else if (res === 'finished') {
          this.state = CarState.finished;
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
    Object.values(this.controllers).map(it => it.start());
  }
  reset() {
    Object.values(this.controllers).map(it => it.cancel());
  }
}

export default function Garage() {  
 
    const raceController = useRef<RaceController | null>(null);
    // const [state, setState] = useState([]);

  const [cars, setCars] = useState<Array<{ data: ICar, state: ICarState }>>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(()=>{
    const controller = new RaceController(cars.map(it => it.data));
    raceController.current = controller;
    controller.onChange = (state, id) => {
      setCars(last => last.map(item => ({ ...item, state: item.data.id === id ? state : item.state })));
    }
    return ()=>{
      controller.destroy();
    }
  }, [cars])

  // let page: number = 1;
  let limit: number = 7;

  const updateCars = () => {
    return getCars(page + 1, limit).then(({ cars, total}: {cars: Array<ICar>, total: number}) => {
      setTotal(total);
      setCars(cars.map(it => ({ data: it, state: { name: CarState.initial } })))});
  }

  useEffect(() => {
    updateCars();
  }, [page]);

  return (
    <div className="garage">
      <div className="garage__wrapper">
        <h3 className="garage__title">Garage <span className="garage__car-count">({total})</span></h3>

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
              // setCars(last => last.map(it => ({ ...it, state: { name: CarState.animate } })));
              raceController.current.race();
            }}>Race</button>

          <button className="btn garage__button garage__button--reset"
          onClick={() => {
            raceController.current.reset();
          }}>Reset</button>
        </div>

        {openPopup &&
            <EditPopup selectedCarData={selectedCar === null ? { id: null, name: '', color: 'black' } : cars.find(it => selectedCar === it.data.id).data}
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
            () => deleteCar(it.data.id).then(() => updateCars())
          }
        />)}
        </div>
        <div className="pagination">
          {new Array(Math.ceil(total / limit)).fill(null).map((it, index) => <button onClick={() => setPage(index)}>{index+1}</button>)}
        </div>
      </div>
    </div>
  )
}