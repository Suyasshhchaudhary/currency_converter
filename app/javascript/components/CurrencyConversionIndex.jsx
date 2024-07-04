import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CurrencyConversionIndex = () => {
    const [conversions, setConversions] = useState([]);
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/currency_conversions/${id}`);
    };

    useEffect(() => {
        const fetchConversions = async () => {
            try {
                const response = await axios.get('/api/currency_conversions');
                setConversions(response.data);
            } catch (error) {
                console.error('Error fetching conversions:', error);
            }
        };

        fetchConversions();
    }, []);

    return (
        <div>
            <h1>Currency Conversions</h1>
            <Link to="/currency_conversions/new" className="btn btn-primary">New Conversion</Link>
            <table className="table mt-3">
                <thead>
                <tr>
                    <th>Original Currency</th>
                    <th>Target Currency</th>
                    <th>Original Amount</th>
                    <th>Converted Amount</th>
                    <th>Exchange Rate</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {conversions.map(conversion => (
                    <tr key={conversion.id} onClick={() => handleRowClick(conversion.id)} style={{ cursor: 'pointer' }}>
                        <td>{conversion.original_currency}</td>
                        <td>{conversion.target_currency}</td>
                        <td>{conversion.original_amount}</td>
                        <td>{conversion.converted_amount}</td>
                        <td>{conversion.exchange_rate}</td>
                        <td>{new Date(conversion.created_at).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrencyConversionIndex;
