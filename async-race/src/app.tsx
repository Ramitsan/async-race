import React, { useEffect, useState } from "react";
import { ICar } from './interfaces';
import { getCars } from './api/api';
import Garage from './components/garage/garage';
import Winners from './components/winners/winners';
import MainNavigate from './components/main-navigate/main-navigate';

const routes = {
  garage: Garage,
  winners: Winners,
};

export function App() {
  const [activePage, setActivePage] = useState('garage');

  return (
    <div>
      <MainNavigate activePage={activePage} onNavigate={pageName => {
        setActivePage(pageName);
      }} />
      {React.createElement(routes[activePage as keyof typeof routes])}
    </div>
  )

}

