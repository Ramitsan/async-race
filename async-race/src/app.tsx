import React, { useEffect, useState } from "react";
import { ICar } from './interfaces';

export function App() {
  const baseURL = 'http://localhost:3000';

  const garage = `${baseURL}/garage`;
  const engine = `${baseURL}/engine`;
  const winners = `${baseURL}/winners`;
  let page: number = 1;
  let limit: number = 7;
  let id: number;

  console.log(1);

  // get cars
  useEffect(() => {
    fetch(`${garage}?_page=${page}&_limit=${limit}`).then(res => res.json()).then(data => console.log(data));
  }, []);

  // get one car
  useEffect(() => {
    fetch(`${garage}/${id}`).then(res => res.json()).then(data => console.log(data));
  }, []);

  // create car
  useEffect(() => {
    fetch(garage, { method: 'POST', headers: {'Content-Type': 'application/json'}, }).then(res => res.json());
  }, []);

  // delete car
  useEffect(() => {
    fetch(`${garage}/${id}`, { method: 'DELETE' }).then(res => res.json());
  }, []);

  return (
    <div>kfjbgk</div>
  )

}

