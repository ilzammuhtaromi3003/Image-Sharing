//src\components\Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Navbar = ({ userId }) => {
    return (
        <div className="container">
            <nav className="navbar bg-body-tertiary my-3">
                <div className="container-fluid">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    {userId && (
                        <Link to={`/profile/${userId}`} className="btn btn-primary profile-link">
                            <FaUser className="icon" /> Profile
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
