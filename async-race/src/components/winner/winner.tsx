import React, { useEffect, useState } from "react";
import { IWinner } from "../../interfaces";
import '../../style.css';
import './winner.css';

type WinnerProps = {
  data: IWinner;
  itemNumber: number;
}

export default function Winner({ data, itemNumber }: WinnerProps) {
  return (
    <div className="winner">
      <div className="winner__wrapper">
        <div className="winner__number">{itemNumber}</div>
        <div className="winner__car-image"></div>
        <div className="winner__car-name"></div>
        <div className="winner__victory-count">{data.wins}</div>
        <div className="winner__best-time">{(data.time / 1000).toFixed(2)}s</div>        
      </div>
    </div>
  )
}