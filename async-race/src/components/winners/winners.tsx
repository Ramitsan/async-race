import React, { useEffect, useState } from "react";
import { getWinners } from '../../api/api';
import Winner from '../winner/winner';
import '../../style.css';
import './winners.css';

type WinnersProps = {
  page: number;
  onPage: (page: number) => void;
}

export default function Winners({page: winnersPage, onPage}: WinnersProps) {
  const [winners, setWinners] = useState([]);
  const [winnersTotal, setWinnersTotal] = useState(0);
  // const [winnersPage, setWinnersPage] = useState(0);

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

        <table className="winners__table">
          <thead>
            <tr>
              <td className="winners__number">№</td>
              <td className="winners__car-image">Image of the car</td>
              <td className="winners__car-name">Name of the car</td>
              <td className="winners__victory-count">Wins number</td>
              <td className="winners__best-time">Best time in seconds</td>
            </tr>
          </thead>
          <tbody>
            {winners.map((it, index) => <Winner data={it} itemNumber={index + 1 + firstIndex} />)}
          </tbody>

        </table>

        <div className="winners__pagination">
          {new Array(Math.ceil(winnersTotal / limitWinnersPerPage)).fill(null)
            .map((it, index) => <button className="btn winners__pagination-button" onClick={() => onPage(index)}>{index + 1}</button>)
          }
        </div>
      </div>
    </div>
  )
}