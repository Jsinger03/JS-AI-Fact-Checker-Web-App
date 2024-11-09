import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import HistoryTable from './HistoryTable';

function History() {
    const [queries, setQueries] = useState([]);
    //https://www.w3schools.com/react/react_useeffect.asp - reference for useEffect
    useEffect(() => {
        //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
        const fetchQueries = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            try {
                const response = await fetch(`/api/history/${userId}`);
                const data = await response.json();
                setQueries(data);
            } catch (error) {
                console.error('Error fetching queries:', error);
            }
        };

        fetchQueries();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>History</h1>
            <p>This is your history page.</p>
            <HistoryTable queries={queries} />
        </div>
    );
}

export default History;