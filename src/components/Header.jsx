// src/components/Header.js

import React from 'react';
import { logout } from '../services/api';

const Header = () => {
    const handleLogout = async () => {
        await logout();
        // Handle post-logout actions, such as redirecting to a login page
    };

    return (
        <header>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
};

export default Header;
