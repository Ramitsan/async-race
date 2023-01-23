export enum CarState {
    initial = 0,
    animate = 1,
    broken = 2,
    finished = 3, 
    stoped = 4,
    started = 5
}

export interface ICarState {
    name: CarState;
    time?: number;
}