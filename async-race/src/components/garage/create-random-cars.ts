import { getRandomCarName, getRandomInteger } from './car-names';
import { createCar } from '../../api/api';

const getRandomColor = () => {
  return '#' + new Array(3).fill(0).map(() => {
    const randomColor = getRandomInteger(0, 255).toString(16)
    return randomColor.length === 1 ? '0' + randomColor : randomColor
  }).join('');
}

const createRandomCarsData = () => {
  return new Array(100).fill(null).map(() => ({ name: getRandomCarName(), color: getRandomColor() }))
}

export const createRandomCars = () => {
  return Promise.all(createRandomCarsData().map(it => {
    return createCar(it.name, it.color).then(() => console.log(1));
  }))
}

export const isDark = (color: string) => {
  if(color.length !== 7) return true;
  const c = color.slice(1);
  const r = Number.parseInt(c[0] + c[1], 16);
  const g = Number.parseInt(c[2] + c[3], 16);
  const b = Number.parseInt(c[4] + c[5], 16);
  const t = 50;
  return (r < t) && (g < t) && (b < t); 
}

