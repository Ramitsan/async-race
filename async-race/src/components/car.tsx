import React, { useEffect, useState } from "react";
import { ICar } from "../interfaces";
import CarImage from './car-image';

export default function Car({ data }: { data: ICar }) {
    return (
        <div>
            <button>Edit</button>
            <button>Remove</button>
            <button>Start</button>
            <button>Stop</button>
            <div>{data.id}</div>
            <CarImage className=""  style={{fill: '#f00'}}/>           
        </div>
    )
}