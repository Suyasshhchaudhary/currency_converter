import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CurrencyConversionShow = () => {
    const { id } = useParams();
    const [conversion, setConversion] = useState(null);

    useEffect(() => {
        axios.get(`/api/currency_conversions/${id}`)
            .then(response => {
                setConversion(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the conversion!", error);
            });
    }, [id]);

    if (!conversion) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Currency Conversion Result</h2>
                    <p className="card-text">
                        <strong>{conversion.original_amount} {conversion.original_currency}</strong> converted to <strong>{conversion.target_currency}</strong> is: <strong>{conversion.converted_amount}</strong> as per <strong>{conversion.exchange_rate}</strong> exchange rate.
                    </p>
                    <div className="mt-3">
                        <Link to="/currency_conversions/new" className="btn btn-primary mr-2">New Conversion</Link>
                        <Link to="/" className="btn btn-secondary">Conversions</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConversionShow;
