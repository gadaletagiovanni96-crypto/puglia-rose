import { useState, useEffect } from 'react';
import './Dashboard.css';
import QRCode from 'react-qr-code';
import axios from '../api/axios';

const Dashboard = ({ user }) => {

    const [biglietti, setBiglietti] = useState([]);
    const [caricamento, setCaricamento] = useState(true);

    const recuperaBiglietti = async () => {
    try {
        // Usiamo una variabile locale "res"
        const res = await axios.get(`/tickets/my-tickets?t=${new Date().getTime()}`);
        
        console.log("Risposta ricevuta con successo:", res.data);

        if (Array.isArray(res.data)) {
            setBiglietti(res.data);
        } else {
            console.warn("I dati ricevuti non sono un array:", res.data);
            setBiglietti([]);
        }
    } catch (error) {
        // Se c'è un errore di Axios, lo stampiamo in modo sicuro qui dentro
        console.error("ERRORE AXIOS COMPLETO:", error);
        
        if (error.response) {
            console.error("Status del server:", error.response.status);
            console.error("Messaggio dal server:", error.response.data);
        }

        setBiglietti([]);
    } finally {
        setCaricamento(false);
    }
};
    
    useEffect(()=>{
        if(user && user.role === 'cliente'){
            recuperaBiglietti();
        }
    }, [user]); //useEffect in questo caso parte ogni volta che user cambia

    const compraBiglietto = async () => {
        try {
            await axios.post('/tickets/buy');
            recuperaBiglietti();
        } catch (error) {
            console.error("Errore durante l'acquisto");
            alert("Errore durante l'acquisto, Riprova!");
        }
    }

    const resoBiglietto = async (idBiglietto) => {
        try {
            await axios.post('/tickets/rimuovi', {ticketId: idBiglietto});
            recuperaBiglietti();
        } catch (error) {
            console.error("Errore durante la rimozione del biglietto");
        }
    }
    
    // Controllo di sicurezza sull'utente
    if (!user) {
        return <p>Accesso negato. Effettua il login.</p>;
    }

    // RENDERING CONDIZIONALE PER RUOLO
    const renderizzaContenutoRuolo = () => {
        if (user.role === 'cliente') {
            return (
                <div style={{ textAlign: 'center' }}>

                    <h3>I Tuoi Biglietti d'Ingresso</h3>
                    
                    {caricamento ? (
                        <p>Caricamento biglietti in corso...</p>
                    ) : biglietti.length === 0 ? (
                        // Caso in cui il DB restituisce un array vuoto
                        <p style={{ color: '#725b5e', margin: '30px 0' }}>
                            Non hai ancora acquistato nessun biglietto.
                        </p>
                    ) : (
                        // Caso in cui ci sono biglietti: facciamo un "map" (un ciclo)
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {biglietti.map((biglietto, index) => (
                                <div key={biglietto._id} style={{ 
                                    background: 'white', 
                                    padding: '20px', 
                                    borderRadius: '8px', 
                                    border: '1px solid #e8dada',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                }}>
                                    <QRCode 
                                        value={biglietto.qrCodeToken} 
                                        size={180} 
                                        fgColor="#4a2e32" 
                                    />
                                    <p style={{ marginTop: '15px', fontSize: '14px', fontWeight: 'bold' }}>
                                        Ingresso #{index + 1}
                                    </p>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
                                        Valido per l'edizione 2026
                                    </p>
                                    <button 
                                        onClick={() => resoBiglietto(biglietto.qrCodeToken)}
                                        style={{
                                            marginTop: '15px',
                                            width: '100%',          
                                            padding: '8px 0',      
                                            backgroundColor: 'transparent',
                                            color: '#b76e79',       
                                            border: '1px solid #b76e79', 
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontFamily: 'Georgia, serif' 
                                        }}>
                                        Reso
                                </button>
                                </div>
                            ))}
                        </div>
                    )}

        
                    <button 
                    onClick={compraBiglietto}
                        style={{
                            backgroundColor: '#b76e79',
                            color: 'white',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontFamily: 'Georgia, serif',
                            margin: '20px'
                        }}
                >
                    Acquista Biglietto (15€)
                </button>

                </div>
            );
        }
        if (user.role === 'organizzatore') {
            return (
                <div>
                    <h3>Pannello di Controllo Evento</h3>
                    <p>Qui potrai vedere le statistiche di vendita, gestire gli stand e monitorare gli accessi in tempo reale.</p>
                </div>
            );
        }
        if (user.role === 'fornitore') {
            return (
                <div>
                    <h3>Gestione Stand</h3>
                    <p>Qui potrai gestire la tua cantina, vedere i token spesi dai clienti per i tuoi vini e chattare con l'organizzazione.</p>
                </div>
            );
        }
        if (user.role === 'scansionatore') {
            return (
                <div>
                    <h3>Controllo Accessi (Terminale)</h3>
                    <p>Attiva la fotocamera per scansionare i QR Code dei clienti all'ingresso del festival.</p>
                </div>
            );
        }
        
        return <p>Ruolo non riconosciuto.</p>;
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Area Personale</h2>
            <div className="dashboard-card">
                {renderizzaContenutoRuolo()}
            </div>
        </div>
    );
};

export default Dashboard;