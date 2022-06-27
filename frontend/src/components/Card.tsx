import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { iRobot } from '../models/robot';
import { deleteRobotAction } from '../reducers/robots/robot.action.creators';
import { RobotHttpStore } from '../services/robot.http.store';

export function RobotCard({ robot }: { robot: iRobot }) {
    const dispatcher = useDispatch();
    const apiRobots = new RobotHttpStore();
    function deleteRobot() {
        apiRobots
            .deleteRobot(robot._id)
            .then(() => dispatcher(deleteRobotAction(robot)));
    }
    const template = (
        <>
            <Link to={'../details/' + robot._id}>{robot.name}</Link>
            <button onClick={deleteRobot}>Borrar</button>
        </>
    );
    return template;
}
