import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Robot } from '../models/robot';
import { updateRobotAction } from '../reducers/robots/robot.action.creators';
import { RobotHttpStore } from '../services/robot.http.store';
import { iStore } from '../store/store';

export function Edit({ id }: { id: string }) {
    const apiRobots = new RobotHttpStore();
    const dispatcher = useDispatch();
    const products = useSelector((store: iStore) => store.robots);
    const detailsProduct = products.find((item) => item._id === id);
    const navigate = useNavigate();
    const initialFormState = {
        name: detailsProduct?.name,
        image: detailsProduct?.image,
        speed: detailsProduct?.speed,
        life: detailsProduct?.life,
        born: detailsProduct?.born,
    };
    const [formData, setFormData] = useState(initialFormState);
    const initialEditableFormState = {
        name: false,
        image: false,
        speed: false,
        life: false,
        born: false,
    };
    const [editableForm, setEditableForm] = useState(initialEditableFormState);
    function handleEdit(ev: SyntheticEvent) {
        const eventTarget = ev.target as HTMLFormElement;
        const newEditableForm = {
            ...editableForm,
            [eventTarget.name]: true,
        };
        setEditableForm(newEditableForm);
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
            formData.image as string,
            formData.speed as number,
            formData.life as number,
            formData.born as string
        );
        apiRobots.updateRobot(id, newRobot).then((resp) => {
            dispatcher(updateRobotAction(resp));
            setFormData(initialFormState);
            navigate('../');
        });
    }
    function back() {
        navigate(-1);
    }
    const template = (
        <>
            {detailsProduct ? (
                <>
                    <h3>Editar robot</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre: </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={editableForm.name ? false : true}
                        />
                        <button
                            data-testid="editBtn"
                            type="button"
                            name="name"
                            onClick={handleEdit}
                        >
                            ✍
                        </button>
                        <label htmlFor="image">URL de la imagen: </label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={formData.image}
                            onChange={handleChange}
                            disabled={editableForm.image ? false : true}
                        />
                        <button
                            data-testid="editBtn"
                            type="button"
                            name="image"
                            onClick={handleEdit}
                        >
                            ✍
                        </button>
                        <label htmlFor="speed">
                            Velocidad: {formData.speed}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            name="speed"
                            id="speed"
                            onChange={handleChange}
                            disabled={editableForm.speed ? false : true}
                        />
                        <button
                            data-testid="editBtn"
                            type="button"
                            name="speed"
                            onClick={handleEdit}
                        >
                            ✍
                        </button>
                        <label htmlFor="life">
                            Resistencia: {formData.life}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            name="life"
                            id="life"
                            onChange={handleChange}
                            disabled={editableForm.life ? false : true}
                        />
                        <button
                            data-testid="editBtn"
                            type="button"
                            name="life"
                            onClick={handleEdit}
                        >
                            ✍
                        </button>
                        <label htmlFor="born">Fecha de construcción: </label>
                        <input
                            type="date"
                            min="1936-01-01"
                            max="1999-12-31"
                            name="born"
                            id="born"
                            value={formData.born}
                            onChange={handleChange}
                            disabled={editableForm.born ? false : true}
                        />
                        <button
                            data-testid="editBtn"
                            type="button"
                            name="born"
                            onClick={handleEdit}
                        >
                            ✍
                        </button>
                        <button type="button" onClick={back}>
                            Cancelar
                        </button>
                        <button type="submit">Aceptar</button>
                    </form>
                </>
            ) : (
                'El producto con esa ID no está disponible actualmente'
            )}
        </>
    );
    return template;
}
