import './Home.css';

const Home = ({user, setPaginaCorrente}) => {

    const cambiaPagina = ()=>{+
        console.log(user);
        if(!user){
            setPaginaCorrente('login');
        } else{setPaginaCorrente('dashboard');}
    };
    
    return (
        <div className="home-container">
            <h2 className="home-title">
                L'eleganza del rosato, nel cuore della Puglia
            </h2>
            <p className="home-subtitle">
                Scopri le migliori cantine, partecipa alle degustazioni e vivi una serata indimenticabile.
            </p>
            <button 
                    onClick={cambiaPagina}
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
};

export default Home;