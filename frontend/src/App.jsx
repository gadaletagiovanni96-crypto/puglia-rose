import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Quando andiamo su /login, mostra il componente Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Se l'utente va sulla root (/), per ora lo rimandiamo al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;