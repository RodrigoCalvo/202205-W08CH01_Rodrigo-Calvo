import { ReactNode } from 'react';
import { iRouterItem } from '../app/App';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({
    children,
    menuOptions,
}: {
    children: ReactNode;
    menuOptions: Array<iRouterItem>;
}) {
    const template = (
        <>
            <Header menuOptions={menuOptions} />
            <main>{children}</main>
            <Footer />
        </>
    );
    return template;
}
