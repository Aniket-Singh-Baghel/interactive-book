import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Components/Menu';

const Layout = () => {
    return (
        <div>
            <Menu />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
