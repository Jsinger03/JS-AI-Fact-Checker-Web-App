import React from 'react';
import { Link } from 'react-router-dom';

function HistoryTable({ queries }) {
    const truncateText = (text, maxLength = 30) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Query</th>
                        <th>Summary</th>
                        <th>Accuracy Score</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map((query, index) => (
                        <tr key={query._id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/results/${query._id}`}>
                                    {truncateText(query.originalText)}
                                </Link>
                            </td>
                            <td>{truncateText(query.summary)}</td>
                            <td>{query.accuracyScore}</td>
                            <td>{new Date(query.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HistoryTable;