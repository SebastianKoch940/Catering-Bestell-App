
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [eingeloggt, setEingeloggt] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPasswort, setLoginPasswort] = useState('');

  const ADMIN_USERS = [{ email: 'Sebastian Koch', passwort: 'nick2009' }];

  const daten = [
    { name: 'Kita Sonnenschein', bestellungen: { '2023-05-01': { anzahl: 10 }, '2023-05-02': { anzahl: 8 } } },
    { name: 'Schule Regenbogen', bestellungen: { '2023-05-01': { anzahl: 15 }, '2023-05-02': { anzahl: 12 } } },
  ];

  const handleLogin = () => {
    const istAdmin = ADMIN_USERS.find(admin => admin.email === loginEmail && admin.passwort === loginPasswort);
    if (istAdmin) {
      setEingeloggt(true);
    } else {
      alert('Login fehlgeschlagen');
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Wochenbericht - Catering-Bestellungen', 10, 10);
    daten.forEach((e) => {
      const rows = Object.entries(e.bestellungen).map(([date, { anzahl }]) => [date, anzahl]);
      autoTable(doc, { head: [[e.name, 'Anzahl']], body: rows });
    });
    doc.save('Wochenbericht_Catering.pdf');
  };

  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {!eingeloggt ? (
          <div>
            <h1>Catering-Bestell-App</h1>
            <input type="email" placeholder="E-Mail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} /><br />
            <input type="password" placeholder="Passwort" value={loginPasswort} onChange={(e) => setLoginPasswort(e.target.value)} /><br />
            <button onClick={handleLogin}>Anmelden</button>
          </div>
        ) : (
          <div>
            <h1>Adminbereich</h1>
            <button onClick={exportPDF}>PDF Export</button>
            <Routes>
              <Route path="/" element={<h2>Startseite</h2>} />
              <Route path="/admin" element={<h2>Admin Dashboard</h2>} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
