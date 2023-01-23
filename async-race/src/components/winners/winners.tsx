import React, { useEffect, useState } from "react";
import {getWinners} from '../../api/api';
import Winner from '../winner/winner';

export default function Winners() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    getWinners().then(res => setWinners(res));
  }, []);

  return (
    <div>
      <h3>Winners</h3>
      {winners.map(it=> <Winner data={it} />)}


    </div>
  )
}