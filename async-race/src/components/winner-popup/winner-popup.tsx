import React from "react";
import { ICar, IWinner } from "../../interfaces";
import '../../style.css';

type WinnerPopupProps = {
  winnerData: ICar & IWinner;
  onCancel: () => void;
}

export default function WinnerPopup({ winnerData, onCancel }: WinnerPopupProps) {
  return (
    <div className="edit-popup">
      <div>
        <p>{winnerData.name}</p>
        <p>{winnerData.time}</p>
        <p></p>
      </div>
      
      <div className="edit-popup__buttons">      
        <button className="edit-popup__button" onClick={() => onCancel()}>Cancel</button>
      </div>

    </div>
  )
}
