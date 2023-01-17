import React, { useEffect, useState } from "react";
import { getCars } from "../api/api";
import { ICar } from "../interfaces";
import Car from './car';
import EditPopup from './edit-popup';

export default function Garage() {
    const [cars, setCars] = useState<Array<ICar>>([]);

    let page: number = 1;
    let limit: number = 7;
    let id: number;  
   
    // get cars
    useEffect(() => {
      getCars(page, limit).then(cars => setCars(cars));
    }, []);
    return (
        <div>
            <EditPopup />
            <button>Add</button>
            <button>Race</button>
            <button>Reset</button>
            <div>{cars.map(it => <Car data={it}/>)}</div>
        </div>
    )
}