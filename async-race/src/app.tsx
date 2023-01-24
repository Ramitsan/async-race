import React, { useEffect, useState } from "react";
import Garage from './components/garage/garage';
import Winners from './components/winners/winners';
import MainNavigate from './components/main-navigate/main-navigate';

const routes = {
  garage: Garage,
  winners: Winners,
};

export function App() {
  const [activePage, setActivePage] = useState('garage');
  const [pages, setPages] = useState({garage: 0, winners: 0});

  return (
    <div>
      <MainNavigate activePage={activePage} onNavigate={pageName => {
        setActivePage(pageName);
      }} />
      {React.createElement(routes[activePage as keyof typeof routes], {page: pages[activePage as keyof typeof routes], onPage: (page: number) => {setPages(last => {
        return {
          ...last, 
          [activePage]: page
        }
      })}})}
    </div>
  )
}
