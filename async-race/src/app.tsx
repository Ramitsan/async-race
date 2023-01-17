import React, { useEffect, useState } from "react";
import { ICar } from './interfaces';
import { getCars } from './api/api';
import Garage from './components/garage';
import Winners from './components/winners';

export function App() {


  return (
    <div>
      <Garage />
    </div>
  )

}

