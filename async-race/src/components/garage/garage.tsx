import React, { useEffect, useState } from "react";
import { getCars, createCar, updateCar, deleteCar, startEngine, switchEngine, stopEngine } from "../../api/api";
import { ICar } from "../../interfaces";
import CarItem from '../car-item/car-item';
import EditPopup from '../edit-popup/edit-popup';
import { ICarState, CarState } from './carstate';
import { createRandomCars } from './create-random-cars';
import '../../style.css';
import './garage.css';

export default function Garage() {
  const [cars, setCars] = useState<Array<{ data: ICar, state: ICarState }>>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  let page: number = 1;
  let limit: number = 100;

  const updateCars = () => {
    return getCars(page, limit).then((cars: Array<ICar>) => setCars(cars.map(it => ({ data: it, state: { name: CarState.initial } }))));
  }

  useEffect(() => {
    updateCars();
  }, []);

  return (
    <div className="garage">
      <div className="garage__wrapper">
        <h3 className="garage__title">Garage <span className="garage__car-count">({cars.length})</span></h3>

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
              setCars(last => last.map(it => ({ ...it, state: { name: CarState.animate } })));
            }}>Race</button>

          <button className="btn garage__button garage__button--reset">Reset</button>
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
            setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.started } : item.state })));
            startEngine(it.data.id).then(res => {
              console.log(cars.find(jt => jt.data.id == it.data.id).state.name, 'animate')
              const time = res.distance / res.velocity;
              setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.animate, time: time } : item.state })));
              switchEngine(it.data.id).then(res => {
                console.log(cars.find(jt => jt.data.id == it.data.id).state.name, 'finished')
                if (res === 'broken') {
                  setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.broken } : item.state })));
                } else if (res === 'finished') {
                  setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.finished } : item.state })));
                }
              })
            })
          }}
          onStop={() => {
            setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.stoped } : item.state })));
            stopEngine(it.data.id).then(() => {
              console.log('stoped');
              setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? { name: CarState.initial } : item.state })))
            }
            )
          }}
          onDelete={
            () => deleteCar(it.data.id).then(() => updateCars())
          }
        />)}
        </div>
      </div>
    </div>
  )
}