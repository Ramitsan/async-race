export enum CarState {
    initial = 0,
    animate = 1,
    broken = 2,
    finished = 3
}

// export type CarState = keyof IStates;

// interface IStates {
//     initial: void;
//     animate: number;
// }

export interface ICarState {
    name: CarState;
    time?: number;
}