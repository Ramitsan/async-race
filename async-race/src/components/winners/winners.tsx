import React, { useEffect, useState } from "react";
import { getWinners } from '../../api/api';
import Winner from '../winner/winner';
import '../../style.css';
import './winners.css';

export default function Winners() {
  const [winners, setWinners] = useState([]);
  const [winnersTotal, setWinnersTotal] = useState(0);
  const [winnersPage, setWinnersPage] = useState(0);

  let limitWinnersPerPage = 10;
  const firstIndex = winnersPage * limitWinnersPerPage;
  // const lastIndex = winnersPage * limitWinnersPerPage;
  // const itemsPerPage = winners.slice(firstIndex, lastIndex);

  useEffect(() => {
    getWinners(winnersPage + 1, limitWinnersPerPage).then(res => {
      console.log(res);
      setWinnersTotal(res.total);
      setWinners(res.winners);
    });
  }, [winnersPage]);

  return (
    <div className="winners">
      <div className="winners__wrapper">
        <h3 className="winners__title">Winners <span className="winners__count">({winnersTotal})</span></h3>
        <h4 className="winners__page-number">Page: {winnersPage + 1}</h4>
      
        {winners.map((it, index) => <Winner data={it} itemNumber={index + 1 + firstIndex} />)}

        <div className="winners__pagination">
          {new Array(Math.ceil(winnersTotal / limitWinnersPerPage)).fill(null)
            .map((it, index) => <button className="btn winners__pagination-button" onClick={() => setWinnersPage(index)}>{index + 1}</button>)
          }
        </div>
      </div>
    </div>
  )
}