import { useState } from 'react';
import axios from '../api/axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/auth/login', { email, password });
            console.log('Login effettuato:', response.data);
            alert(`Benvenuto! Ruolo: ${response.data.user.role}`);
        } catch (err) {
            console.error(err);
            setError('Email o password non validi. Riprova.');
        }
    };

    return (
        <div className="login-container">
            <h2>Accedi a EventHub</h2>
            
            {error && <p className="login-error">{error}</p>}
            
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        className="login-input"
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                
                <div>
                    <label>Password:</label>
                    <input 
                        className="login-input"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                
                <button className="login-button" type="submit">
                    Entra
                </button>
            </form>
        </div>
    );
};

export default Login;