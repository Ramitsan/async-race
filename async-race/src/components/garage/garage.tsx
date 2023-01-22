import React, { useEffect, useState } from "react";
import { getCars, createCar, updateCar, deleteCar } from "../../api/api";
import { ICar } from "../../interfaces";
import CarItem from '../car-item/car-item';
import EditPopup from '../edit-popup/edit-popup';
import { CarState } from './carstate';

export default function Garage() {
  const [cars, setCars] = useState<Array<{ data: ICar, state: CarState }>>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  let page: number = 1;
  let limit: number = 7;
  let id: number;

  useEffect(() => {
    getCars(page, limit).then((cars: Array<ICar>) => setCars(cars.map(it => ({ data: it, state: CarState.initial }))));
  }, []);

  return (
    <div>
      <h3>Garage</h3>
      {openPopup &&
        <EditPopup selectedCarData={selectedCar === null ? { id: null, name: '', color: 'black' } : cars.find(it => selectedCar === it.data.id).data}
          onOk={(result) => {
            setOpenPopup(false);
            // обновление элемента машины
            if (result.id === null) {
              createCar(result.name, result.color).then(() => getCars(page, limit).then((cars: Array<ICar>) => setCars(cars.map(it => ({ data: it, state: CarState.initial })))))
            } else {
              updateCar(result.id, result.name, result.color).then(() => getCars(page, limit).then((cars: Array<ICar>) => setCars(cars.map(it => ({ data: it, state: CarState.initial })))))
            }
          }}
          onCancel={() => { setOpenPopup(false)}}
        />}
      <button onClick={() => {
        setSelectedCar(null);
        setOpenPopup(true)
      }}>Add</button>

      <button onClick={() => {
        setCars(last => last.map(it => ({ ...it, state: CarState.animate })));
      }}>Race</button>

      <button>Reset</button>

      <div>{cars.map((it) => <CarItem key={it.data.id} data={it.data}
        // добавление новой машины
        onEdit={() => {
          setSelectedCar(it.data.id);
          setOpenPopup(true)
        }} carState={it.state} onStart={() => {
          setCars(last => last.map(item => ({ ...item, state: item.data.id === it.data.id ? CarState.animate : item.state })));
        }} 
        onDelete={
          () => deleteCar(it.data.id).then(() => getCars(page, limit).then((cars: Array<ICar>) => setCars(cars.map(it => ({ data: it, state: CarState.initial })))))
        } />)}</div>
    </div>
  )
}