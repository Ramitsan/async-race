import React from "react";
import { ICar, IWinner } from "../../interfaces";
import '../../style.css';
import './winner-popup.css';

type WinnerPopupProps = {
  winnerData: ICar & IWinner;
  onCancel: () => void;
}

export default function WinnerPopup({ winnerData, onCancel }: WinnerPopupProps) {
  return (
    <div className="winner-popup">
      <div className="winner-popup__wrapper">
        <p className="winner-popup__win">WIN!</p>
        <p className="winner-popup__car"><span>Car: </span>{winnerData.name}</p>
        <p className="winner-popup__time"><span>Time: </span>{(winnerData.time / 1000).toFixed(2)}sec</p>
      </div>
      
      <div className="winner-popup__buttons">      
        <button className="btn winner-popup__button" onClick={() => onCancel()}>Cancel</button>
      </div>

    </div>
  )
}
