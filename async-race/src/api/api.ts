import { ICar, IWinner } from "../interfaces";

const baseURL = 'http://localhost:3000';

const garage = `${baseURL}/garage`;
const engine = `${baseURL}/engine`;
const winners = `${baseURL}/winners`;

type SortType = 'id'|'wins'|'time';
type OrderType = 'ASC'|'DESC';

// get cars
export const getCars = (page: number, limit: number) => {
    return fetch(`${garage}?_page=${page}&_limit=${limit}`).then(res => {
        return res.json().then(cars => {
            return {total: +res.headers.get('X-Total-Count'),
                cars: cars}
        })
        
    });
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

export const startEngine = (id: number) => {
    return fetch(`${engine}?id=${id}&status=started`, {method: 'PATCH'}).then(res => res.json())
}

export const stopEngine = (id: number) => {
    return fetch(`${engine}?id=${id}&status=stopped`, {method: 'PATCH'})
}

export const switchEngine = (id: number) => {
    return fetch(`${engine}?id=${id}&status=drive`, {method: 'PATCH'}).then(res => ({
        500: 'broken',
        200: 'finished'
    })[res.status])
}

export const getWinners = (page?: number, limit?: number, sort?: SortType, order?: OrderType) => {
    return fetch(winners, { method: 'GET'}).then(res => res.json());
}

export const createWinner = (car: IWinner) => {
    return fetch(winners, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(car)}).then(res => res.json());
}

export const getWinner = (id: number) => {
    return fetch(`${winners}/${id}`).then(res => {
        if(res.status === 200) {
            return res.json();
        } else {
            return null;
        }
    });
}

export const deleteWinner = (id: number) => {
    return fetch(`${winners}/${id}`, { method: 'DELETE' }).then(res => res.json());
}

export const updateWinner = (car: IWinner) => {
    return fetch(`${winners}/${car.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(car)}).then(res => res.json());
}