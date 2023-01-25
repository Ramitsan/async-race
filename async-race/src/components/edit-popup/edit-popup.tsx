import React, { useEffect, useState } from "react";
import { ICar } from "../../interfaces";
import '../../style.css';
import './edit-popup.css';

type EditPopupProps = {
  selectedCarData: ICar;
  onOk: (result: ICar) => void;
  onCancel: () => void;
}

export default function EditPopup({ selectedCarData, onOk, onCancel }: EditPopupProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState("#ff0000");
  
  useEffect(() => {
    setName(selectedCarData.name)
  }, [selectedCarData.name]);

  useEffect(() => {
    setColor(selectedCarData.color)
  }, [selectedCarData.color]);

  return (
    <div className="edit-popup">
      <p className="edit-popup__block">
        <label className="edit-popup__label" htmlFor="car-name">Enter car name</label>
        <input className="edit-popup__input edit-popup__input--name" type="text" id="car-name" value={name} onChange={(e) => setName(e.target.value)} />
      </p>

      <p className="edit-popup__block">
        <label className="edit-popup__label" htmlFor="car-color">Select car color</label>
        <input className="edit-popup__input edit-popup__input--color" type="color" id="car-color" value={color} onChange={(e) => setColor(e.target.value)} />
      </p>

      <div className="edit-popup__buttons">
        <button className="btn edit-popup__button edit-popup__button--ok" onClick={() => { onOk({ id: selectedCarData.id, name: name, color: color }) }}>Ok</button>
        <button className="btn edit-popup__button edit-popup__button--cancel" onClick={() => onCancel()}>Cancel</button>
      </div>

    </div>
  )
}