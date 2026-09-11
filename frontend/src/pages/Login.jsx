import { useState } from 'react';
import axios from '../api/axios';
import './Login.css';

// Accettiamo le props dal genitore (App.jsx)
const Login = ({ setUser, setPaginaCorrente }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/auth/login', { email, password });
            
            //quando il LogIn ha successo
            // 1) Aggiorniamo l'utente globale in App.jsx
            setUser(response.data.user);
            
            // 2) Rimandiamo l'utente alla dashboard
            setPaginaCorrente('dashboard');
            
        } catch (err) {
            console.error(err);
            setError('Email o password non validi. Riprova.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Accedi a Puglia Rosè</h2>
                
                {error && <p className="login-error">{error}</p>}
                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input 
                            className="login-input"
                            type="email" 
                            placeholder="mariorossi@email.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            className="login-input"
                            type="password" 
                            placeholder="••••••••"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <button className="login-button" type="submit">
                        LogIn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;