import React, { useEffect, useState } from "react";
import { ICar } from "../../interfaces";
import { CarImage, FlagImage } from '../svg-component/svg-component';
import './car-item.css';

export default function CarItem({ data }: { data: ICar }) {
  return (
    <div className="car-item">
      <div className="car-item__wrapper">
        <div className="car-item__top">
         
          <div className="car-item__buttons">
            <div className="car-item__button-wrapper">
              <button className="btn car-item__btn car-item__btn--edit">Edit</button>
              <button className="btn car-item__btn car-item__btn--remove">Remove</button>
            </div>

            <div className="car-item__button-wrapper">
              <button className="btn car-item__btn car-item__btn--start">Start</button>
              <button className="btn car-item__btn car-item__btn--stop">Stop</button>
            </div>
          </div>

          <p className="car-item__name">{data.name}</p>
        </div>

        <div className="car-item__track">
          <CarImage className="car-image" style={{ fill: '#00f' }} />
          <FlagImage className="flag-image" style={{ fill: '#f00' }} />
        </div>
      </div>

    </div>
  )
}