const baseURL = 'http://localhost:3000';

const garage = `${baseURL}/garage`;
const engine = `${baseURL}/engine`;
const winners = `${baseURL}/winners`;

// get cars
export const getCars = (page: number, limit: number) => {
    return fetch(`${garage}?_page=${page}&_limit=${limit}`).then(res => res.json());
};

// get one car
export const getCar = (id: number) => {
    return fetch(`${garage}/${id}`).then(res => res.json());
};

// create car
export const createCar = (name: string, color: string) => {
    return fetch(garage, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({name, color})}).then(res => res.json());
};

// delete car
export const deleteCar = (id: number) => {
    return fetch(`${garage}/${id}`, { method: 'DELETE' }).then(res => res.json());
};

export const updateCar = (id: number, name: string, color: string) => {
    return fetch(`${garage}/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'},  body: JSON.stringify({name, color})}).then(res => res.json());
}