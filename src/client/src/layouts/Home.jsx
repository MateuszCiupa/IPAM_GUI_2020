import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div>
        <Link to="/login">Won't redirect to login page</Link>
    </div>
);