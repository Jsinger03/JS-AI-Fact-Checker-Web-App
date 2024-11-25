import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import HistoryTable from './HistoryTable';

function History() {
    //https://www.w3schools.com/react/react_usestate.asp
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

    const handleSearch = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const filterText = document.getElementById('filterText').value;
        const response = await fetch(`/api/search/${userId}?filterText=${filterText}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setQueries(data);
    };

    return (
        <>
        <Navbar />
        <div>
            <h1>History</h1>
            <p>This is your history page.</p>
            <form method="get" action="/search">
                <input type="text" id="filterText" placeholder="Search your history" />
                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
            <HistoryTable queries={queries} />
        </div>
        </>
    );
}

export default History;