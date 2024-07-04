import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CurrencyConversionNew = () => {
    const [originalCurrency, setOriginalCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [originalAmount, setOriginalAmount] = useState('');
    const [exchange, setExchange] = useState('');
    const [exchanges, setExchanges] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableExchanges = async () => {
            try {
                const response = await axios.get('/api/available_exchanges');
                setExchanges(response.data);
            } catch (error) {
                console.error('Error fetching conversions:', error);
            }
        };

        fetchAvailableExchanges();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            // Post the form data to the Rails API
            const response = await axios.post('/api/currency_conversions', {
                currency_conversion: {
                    original_currency: originalCurrency,
                    target_currency: targetCurrency,
                    original_amount: originalAmount,
                },
                exchange: exchange
            });

            // Get the ID of the newly created conversion
            const { id } = response.data;

            // Redirect to the show page for the newly created conversion
            navigate(`/currency_conversions/${id}`);
        } catch (error) {
            console.error('Error creating conversion:', error);
            setError(error.response?.data || 'An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Currency Conversion</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="original_currency" className="form-label">From Currency</label>
                    <input
                        type="text"
                        id="original_currency"
                        className="form-control"
                        placeholder="Enter original currency code"
                        value={originalCurrency}
                        onChange={(e) => setOriginalCurrency(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="target_currency" className="form-label">To Currency</label>
                    <input
                        type="text"
                        id="target_currency"
                        className="form-control"
                        placeholder="Enter target currency code"
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="original_amount" className="form-label">Amount</label>
                    <input
                        type="number"
                        id="original_amount"
                        className="form-control"
                        step="0.01"
                        min="0"
                        placeholder="Enter amount"
                        value={originalAmount}
                        onChange={(e) => setOriginalAmount(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exchange" className="form-label">Exchange</label>
                    <select
                        id="exchange"
                        className="form-control"
                        value={exchange}
                        onChange={(e) => setExchange(e.target.value)}
                    >
                        <option value="">Select an exchange</option>
                        {exchanges.map((exchange, index) => (
                            <option key={index} value={exchange}>
                                {exchange}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Convert</button>
            </form>
        </div>
    );
};

export default CurrencyConversionNew;
