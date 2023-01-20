import React, { useEffect, useState } from "react";
import { getCars } from "../../api/api";
import { ICar } from "../../interfaces";
import CarItem from '../car-item/car-item';
import EditPopup from '../edit-popup/edit-popup';
import {CarState} from './carstate';

export default function Garage() {
    const [cars, setCars] = useState<Array<{data: ICar, state: CarState}>>([]);
    
    let page: number = 1;
    let limit: number = 7;
    let id: number;  
   
    useEffect(() => {
      getCars(page, limit).then((cars: Array<ICar>) => setCars(cars.map(it => ({data: it, state: CarState.initial}))));
    }, []);
    return (
        <div>
            <EditPopup />
            <button>Add</button>
            <button onClick={() => {
                setCars(last => last.map(it => ({...it, state: CarState.animate})));
            }}>Race</button>
            <button>Reset</button>
            <div>{cars.map((it) => <CarItem key={it.data.id} data={it.data} carState={it.state} onStart={() => {
                setCars(last => last.map(item => ({...item, state: item.data.id === it.data.id ? CarState.animate : item.state})));
            }} />)}</div>
        </div>
    )
}