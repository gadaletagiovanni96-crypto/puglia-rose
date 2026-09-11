import './Layout.css';

// Riceviamo le props passate da App.jsx
const Layout = ({ children, user, setPaginaCorrente, gestisciLogOut }) => {
    return (
        <div className="layout-wrapper">
            
            <header className="layout-header">
                <h1 className="layout-title">Puglia Rosé Festival</h1>
                <nav className="layout-nav">
                    
                    <span 
                        className="layout-link" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => setPaginaCorrente('home')}
                    >
                        Home
                    </span>
                    
                    {/* Rendering condizionale per il menu */}
                    {user ? (
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <span 
                                className='layout-link' 
                                style={{ cursor: 'pointer'}} 
                                onClick={() => setPaginaCorrente('dashboard')}
                            >
                                Dashboard ({user.role})
                            </span>
                            <span 
                                className='layout-link' 
                                style={{ cursor: 'pointer' }} 
                                onClick={gestisciLogOut}
                            >
                                Esci
                            </span>
                        </div>
                    ) : (
                        <span 
                            className="layout-link" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => setPaginaCorrente('login')}
                        >
                            Accedi
                        </span>
                    )}


                    
                </nav>
            </header>

            <main className="layout-main">
                {children} 
            </main>

            <footer className="layout-footer">
                <p>© 2026 Puglia Rosé Festival. Tutti i diritti riservati.</p>
            </footer>
            
        </div>
    );
};

export default Layout;