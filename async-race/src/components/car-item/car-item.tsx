import React, { useEffect, useState } from "react";
import { ICar } from "../../interfaces";
import { CarImage, FlagImage } from '../svg-component/svg-component';
import '../../style.css';
import './car-item.css';
import { CarState, ICarState } from '../garage/carstate';

type CarItemProps = {
  data: ICar;
  carState: ICarState;
  onStart: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStop: () => void;
}

export default function CarItem({ data, carState, onStart, onEdit, onDelete, onStop }: CarItemProps) { 
  return (
    <div className="car-item">
      <div className="car-item__wrapper">
        <div className="car-item__top">
      
          <div className="car-item__buttons">
            <div className="car-item__button-wrapper">
              <button className="btn car-item__btn car-item__btn--edit" onClick={() => onEdit()}>Edit</button>
              <button className="btn car-item__btn car-item__btn--remove" onClick={() => onDelete()}>Remove</button>
            </div>

            <div className="car-item__button-wrapper">
              <button className="btn car-item__btn car-item__btn--start"
              onClick={() => {onStart()}}>Start</button>
              <button className="btn car-item__btn car-item__btn--stop" onClick={() => onStop()}>Stop</button>
            </div>
          </div>

          <p className="car-item__name">{data.name}</p>
        </div>

        <div className="car-item__track">
          <CarImage className={"car-image" + ((carState.name !== CarState.initial && carState.name !== CarState.started)  ? " car-image-finish" : "")} style={{ fill: data.color, animationDuration: `${carState.time}ms`, animationPlayState: carState.name === CarState.broken? 'paused' : 'running' }} />
          <FlagImage className="flag-image" style={{ fill: '#f00' }} />
        </div>
      </div>

    </div>
  )
}