import React, { useEffect, useState } from "react";
import { ICar } from './interfaces';
import { getCars } from './api/api';
import Garage from './components/garage/garage';
import Winners from './components/winners/winners';

export function App() {


  return (
    <div>
      <Garage />
    </div>
  )

}

