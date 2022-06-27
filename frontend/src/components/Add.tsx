import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Robot } from '../models/robot';
import { addRobotAction } from '../reducers/robots/robot.action.creators';
import { RobotHttpStore } from '../services/robot.http.store';

export function Add() {
    const apiRobots = new RobotHttpStore();
    const dispatcher = useDispatch();
    const initialFormState = {
        name: '',
        image: '',
        speed: 10,
        life: 10,
        born: '1980-01-01',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [formVisibility, setFormVisibility] = useState(false);
    function toggleForm() {
        if (formVisibility) {
            setFormData(initialFormState);
        }
        setFormVisibility(!formVisibility);
    }
    function handleChange(ev: SyntheticEvent) {
        const eventTarget = ev.target as HTMLFormElement;
        const newFormData = {
            ...formData,
            [eventTarget.name]: eventTarget.value,
        };
        setFormData(newFormData);
    }
    function handleSubmit(ev: SyntheticEvent) {
        ev.preventDefault();
        if (!formData.name) return;
        const newRobot = new Robot(
            formData.name,
            formData.image,
            formData.speed,
            formData.life,
            formData.born
        );
        apiRobots.setRobot(newRobot).then((resp) => {
            dispatcher(addRobotAction(resp));
            setFormData(initialFormState);
        });
    }
    const template = (
        <aside>
            <button onClick={toggleForm}>
                {formVisibility ? 'Cancelar' : 'Añadir un robot'}
            </button>
            <form
                className={formVisibility ? 'on' : 'off'}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Nombre: </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="image">URL de la imagen: </label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                />
                <label htmlFor="speed">Velocidad: {formData.speed}</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    name="speed"
                    id="speed"
                    onChange={handleChange}
                />
                <label htmlFor="life">Resistencia: {formData.life}</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    name="life"
                    id="life"
                    onChange={handleChange}
                />
                <label htmlFor="born">Fecha de construcción: </label>
                <input
                    type="date"
                    min="1936-01-01"
                    max="1999-12-31"
                    name="born"
                    id="born"
                    value={formData.born}
                    onChange={handleChange}
                />
                <button type="submit">Aceptar</button>
            </form>
        </aside>
    );
    return template;
}
