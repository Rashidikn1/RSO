import React, { useState, useEffect } from 'react';

const ScheduleViewer = () => {
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace '/api/schedules' with your actual API endpoint
        fetch('/api/schedules')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSchedules(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading schedules...</p>;
    }

    if (error) {
        return <p>Error loading schedules: {error}</p>;
    }

    return (
        <div className="schedule-viewer">
            <h2>Schedule Viewer</h2>
            {schedules.length > 0 ? (
                <ul>
                    {schedules.map((schedule, index) => (
                        <li key={index}>
                            {/* Render schedule details here */}
                            {/* Example: Patient Name, Time, Treatment Type */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No schedules available.</p>
            )}
        </div>
    );
};

export default ScheduleViewer;
