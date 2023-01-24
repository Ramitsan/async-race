import React, { useEffect, useState } from "react";
import Garage from './components/garage/garage';
import Winners from './components/winners/winners';
import MainNavigate from './components/main-navigate/main-navigate';

const routes = {
  garage: Garage,
  winners: Winners,
};

export function App() {
  const [activePage, setActivePage] = useState<keyof typeof routes>('garage');
  const [pages, setPages] = useState({garage: 0, winners: 0});

  return (
    <div>
      <MainNavigate activePage={activePage} onNavigate={pageName => {
        setActivePage(pageName as keyof typeof routes);
      }} />
      {React.createElement(routes[activePage], {page: pages[activePage], onPage: (page: number) => {setPages(last => {
        return {
          ...last, 
          [activePage]: page
        }
      })}})}
    </div>
  )
}
