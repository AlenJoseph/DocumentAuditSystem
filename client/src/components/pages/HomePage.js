import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <Link to = "/login">login</Link><div></div>
        <Link to = "/adminlogin">Admin login</Link>
    </div>
);

export default HomePage;
