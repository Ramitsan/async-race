import { getRandomCarName, getRandomInteger } from './car-names';
import { createCar } from '../../api/api';

const getRandomColor = () => {
   return '#' + new Array(3).fill(0).map(() => getRandomInteger(0, 255).toString(16)).join('');
}

const createRandomCarsData = () => {
    return new Array(100).fill(null).map(() => ({name: getRandomCarName(), color: getRandomColor()}))
}

export const createRandomCars = () => {
    return Promise.all(createRandomCarsData().map(it => {
        return createCar(it.name, it.color).then(() => console.log(1));
    }))
}

