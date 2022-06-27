import { configureStore } from '@reduxjs/toolkit';
import { iRobot } from '../models/robot';
import { robotReducer } from '../reducers/robots/robot.reducer';

export interface iStore {
    robots: Array<iRobot>;
}

const preloadedState: iStore = {
    robots: [] as Array<iRobot>,
};

export const store = configureStore({
    reducer: { robots: robotReducer },
    preloadedState,
});
