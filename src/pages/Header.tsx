import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <Link to='/home'>Home</Link> | 
            <Link to='/list'>List All</Link> | 
            <Link to='/new'>New</Link> | 
            <Link to='/random'>Random</Link> |

            <a href='/' onClick={() => {localStorage.removeItem('token');localStorage.removeItem('user');}}>LogOff</a>
        </div>
    )
}