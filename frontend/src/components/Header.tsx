import { Link } from 'react-router-dom';
import { iRouterItem } from '../app/App';

export function Header({ menuOptions }: { menuOptions: Array<iRouterItem> }) {
    const template = (
        <header>
            <hgroup>
                <h1>Robots</h1>
                <h2>(war robots)</h2>
            </hgroup>
            <nav>
                <ul>
                    {menuOptions.map((item) =>
                        item.label !== 'Detalles' ? (
                            <li key={item.label}>
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                        ) : (
                            ''
                        )
                    )}
                </ul>
            </nav>
        </header>
    );
    return template;
}

