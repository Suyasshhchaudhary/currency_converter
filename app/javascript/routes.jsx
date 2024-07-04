import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyConversionIndex from './components/CurrencyConversionIndex';
import CurrencyConversionNew from './components/CurrencyConversionNew';
import CurrencyConversionShow from './components/CurrencyConversionShow';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<CurrencyConversionIndex />} />
            <Route path="/currency_conversions/new" element={<CurrencyConversionNew />} />
            <Route path="/currency_conversions/:id" element={<CurrencyConversionShow />} />
        </Routes>
    </Router>
);

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        const root = createRoot(rootElement);  // Create a root.
        root.render(<App />);  // Render the app.
    }
});
