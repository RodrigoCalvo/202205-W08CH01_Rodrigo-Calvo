export interface iRobot {
    _id?: string;
    name: string;
    image: string;
    speed: number;
    life: number;
    born: string;
}

export class Robot implements iRobot {
    constructor(
        public name: string,
        public image: string,
        public speed: number,
        public life: number,
        public born: string
    ) {}
}
