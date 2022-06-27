import { useParams } from 'react-router-dom';
import Details from '../pages/details';
import { Edit } from '../pages/edit';
import { NotFound } from './NotFound';

export function ValidateId({ edit }: { edit: boolean }) {
    const { id } = useParams();

    if (id?.length === 24) {
        if (edit) {
            return <Edit id={id} />;
        } else {
            return <Details id={id} />;
        }
    } else {
        return <NotFound />;
    }
}

export default ValidateId;
