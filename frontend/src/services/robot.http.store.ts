import { iRobot } from '../models/robot';

export class RobotHttpStore {
    apiUrl: string;
    constructor() {
        this.apiUrl = 'http://localhost:9000/robots/';
    }

    getRobot(id: iRobot['_id']): Promise<iRobot> {
        return fetch(this.apiUrl + id).then((resp) => resp.json());
    }
    getAllRobots(): Promise<Array<iRobot>> {
        return fetch(this.apiUrl).then((resp) => resp.json());
    }
    setRobot(data: iRobot): Promise<iRobot> {
        return fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json());
    }
    updateRobot(id: iRobot['_id'], data: iRobot): Promise<iRobot> {
        return fetch(this.apiUrl + id, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json());
    }
    deleteRobot(id: iRobot['_id']): Promise<number> {
        return fetch(this.apiUrl + id, { method: 'DELETE' }).then((resp) =>
            resp.json()
        );
    }
}
