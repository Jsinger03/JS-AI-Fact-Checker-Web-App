import HistoryTable from './HistoryTable';
import React from 'react';
import Navbar from './Navbar';
function History(){
    return <div>
        <Navbar />
        <h1>History</h1>
        <p>This is your history page.</p>
        <HistoryTable />
    </div>
}

export default History;