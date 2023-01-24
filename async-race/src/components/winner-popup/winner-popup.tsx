import React, { useEffect, useState } from "react";
import { ICar, IWinner } from "../../interfaces";
import '../../style.css';


type EditPopupProps = {
  winnerData: ICar & IWinner;
  onCancel: () => void;
}

export default function WinnerPopup({ winnerData, onCancel }: EditPopupProps) {

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
