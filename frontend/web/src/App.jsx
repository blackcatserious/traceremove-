import React from 'react';

const personas = [
  { role: 'Consumer', description: 'Access balances, initiate payments, and manage payout accounts.' },
  { role: 'Merchant', description: 'Track settlements, reconcile payouts, and review chargebacks.' },
  { role: 'Admin', description: 'Monitor compliance alerts and manage platform risk controls.' }
];

export default function App() {
  return (
    <main style={{ fontFamily: 'sans-serif', margin: '2rem auto', maxWidth: '960px' }}>
      <header>
        <h1>Digital Asset Platform Portal</h1>
        <p>Unified dashboard for digital asset wallet management and fiat ramps.</p>
      </header>
      <section>
        <h2>Personas</h2>
        <ul>
          {personas.map((persona) => (
            <li key={persona.role} style={{ marginBottom: '1rem' }}>
              <strong>{persona.role}</strong>
              <p>{persona.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>API Endpoints</h2>
        <p>The backend exposes REST and GraphQL APIs. Refer to the developer portal for environment-specific URLs.</p>
      </section>
    </main>
  );
}
