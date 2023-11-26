import React, { useState } from 'react';

const PatientForm = () => {
    const [patientData, setPatientData] = useState({
        name: '',
        age: '',
        urgencyLevel: '',
        preferredTime: '',
        weight: '',
        treatmentRegion: '',
        // Add more fields as necessary
    });

    const handleChange = (e) => {
        setPatientData({ ...patientData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Here you would typically send the data to your backend API
        // Eto toje pomenyay Raul
        try {
            const response = await fetch('http://localhost:3001/add-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('Patient added successfully');
                // Reset the form or handle success case
                setPatientData({
                    name: '',
                    age: '',
                    urgencyLevel: '',
                    preferredTime: '',
                    weight: '',
                    treatmentRegion: '',
                    // Reset other fields as necessary
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
                        <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={patientData.name} 
                    onChange={handleChange} 
                />
            </div>

            <div>
                <label>Age:</label>
                <input 
                    type="number" 
                    name="age" 
                    value={patientData.age} 
                    onChange={handleChange} 
                />
            </div>

            <div>
                <label>Urgency Level:</label>
                <select 
                    name="urgencyLevel" 
                    value={patientData.urgencyLevel} 
                    onChange={handleChange}>
                    <option value="">Select Urgency Level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="emergency">Emergency</option>
                </select>
            </div>

            <div>
                <label>Preferred Time:</label>
                <input 
                    type="datetime-local" 
                    name="preferredTime" 
                    value={patientData.preferredTime} 
                    onChange={handleChange} 
                />
            </div>

            <div>
                <label>Weight (kg):</label>
                <input 
                    type="number" 
                    name="weight" 
                    value={patientData.weight} 
                    onChange={handleChange} 
                />
            </div>

            <div>
                <label>Treatment Region:</label>
                <select 
                    name="treatmentRegion" 
                    value={patientData.treatmentRegion} 
                    onChange={handleChange}>
                    <option value="">Select Treatment Region</option>
                    <option value="craniospinal">Craniospinal</option>
                    <option value="breast">Breast</option>
                    <option value="breastSpecial">Breast Special</option>
                    <option value="headNeck">Head & Neck</option>
                    <option value="abdomen">Abdomen</option>
                    <option value="pelvis">Pelvis</option>
                    <option value="crane">Crane</option>
                    <option value="lung">Lung</option>
                    <option value="lungSpecial">Lung Special</option>
                    <option value="wholeBrain">Whole Brain</option>
                </select>
            </div>
            {/* Add more input fields as needed */}

            <button type="submit">Submit</button>
        </form>
    );
};

export default PatientForm;
