import React, { useEffect, useState } from "react";
import { getCar } from "../../api/api";
import { ICar, IWinner } from "../../interfaces";
import { CarImage } from '../svg-component/svg-component';
import '../../style.css';
import './winner.css';
import { isDark } from "../garage/create-random-cars";

type WinnerProps = {
  data: IWinner;
  itemNumber: number;
}

export default function Winner({ data, itemNumber }: WinnerProps) {
  const [carData, setCarData] = useState<ICar | null>(null);
  useEffect(() => {
    getCar(data.id).then(res => {
      setCarData(res);
    });
  }, []);

  return (
      <tr className="winner__row">
        <td className="winner__number">{itemNumber}</td>
        <td className="winner__car-image"><CarImage className={"car-image"} style={{ fill: carData?.color || 'transparent', stroke: (carData == null)  ? 'transparent': (carData.color && isDark(carData.color) ? '#ffffff' : 'transparent') }} /></td>
        <td className="winner__car-name">{carData?.name || 'loading...'}</td>
        <td className="winner__victory-count">{data.wins}</td>
        <td className="winner__best-time">{(data.time / 1000).toFixed(2)}sec</td>        
      </tr>
  )
}