import React from 'react';
function HistoryTable(){
    return <div>History
        <table>
            <thead>
                <tr>
                    <th>Query</th>
                    <th>Summary</th>
                    <th>Accuracy Score</th>
                    <th>Created At</th>
                </tr>
                {/* {{{queries}}} */}
            </thead>
        </table>
    </div>
};

export default HistoryTable;
