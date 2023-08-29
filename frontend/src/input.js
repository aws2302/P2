import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const Input = () => {
    return (
        <div className='page'>
            <div className='iconContainer'>
                <PersonIcon fontSize="large" />
            </div>

            <div className="inputContainer">
                <h1> <span>Shorty</span> - URL Shortner</h1>
                <h3>Shorty ist der URL Shortner der Gruppe 3 aus dem Techstarter Kurs</h3>
                <div>
                    <input type="text" placeholder="Welche URL willst du kürzen?" />
                    <button>Senden</button>
                </div>    
            </div>
        </div>
    )
}

export default Input;
