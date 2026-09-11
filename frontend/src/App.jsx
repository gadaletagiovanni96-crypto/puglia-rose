import { useState, useEffect } from 'react';
import axios from './api/axios';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  
  const [paginaCorrente, setPaginaCorrente] = useState('home');
  
  const [user, setUser] = useState(null);

  //parte in automatico al caricamento
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('/auth/me');
        setUser(response.data.user); // Se c'è il cookie, salviamo l'utente
      } catch (error) {
        setUser(null); // Altrimenti utente vuoto
      }
    };
    checkUser();
  }, []); // Le parentesi vuote indicano di farlo solo all'avvio

  const gestisciLogOut = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      setPaginaCorrente('home');
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
  }

  const renderizzaPagina = () => {
    if (paginaCorrente === 'home') {
      return <Home user={user} setPaginaCorrente={setPaginaCorrente} />;
    }
    if (paginaCorrente === 'login') {
      // Passiamo a Login le funzioni per aggiornare lo stato di App
      return <Login setUser={setUser} setPaginaCorrente={setPaginaCorrente} />;
    }
    if (paginaCorrente === 'dashboard') {
      return <Dashboard user={user}/>
    }
  };

  return (
    // Passiamo a Layout lo stato dell'utente e la funzione per cambiare pagina + quella per effetturare il logout
    <Layout user={user} setPaginaCorrente={setPaginaCorrente} gestisciLogOut={gestisciLogOut}>
      {renderizzaPagina()}
    </Layout>
  );
}

export default App;