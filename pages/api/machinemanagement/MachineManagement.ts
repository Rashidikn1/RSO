
import React, { useState, useEffect } from 'react';

const MachineManagement = () => {
    const [machines, setMachines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch machine data from the backend API
        // Replace '/api/machines' with your actual API endpoint
        fetch('/api/machines')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMachines(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading machine data...</p>;
    }

    if (error) {
        return <p>Error loading machines: {error}</p>;
    }

    return (
        <div className="machine-management">
            <h2>Machine Management</h2>
            {machines.length > 0 ? (
                <ul>
                    {machines.map((machine, index) => (
                        <li key={index}>
                            {/* Render machine details here */}
                            {/* Example: Machine Name, Status, Next Maintenance Date */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No machine data available.</p>
            )}
        </div>
    );
};

export default MachineManagement;
