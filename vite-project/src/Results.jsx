import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './styles/Results.scss';

function Results() {
    const { queryId } = useParams();
    //https://www.w3schools.com/react/react_usestate.asp
    const [queryData, setQueryData] = useState(null);
    //https://www.w3schools.com/react/react_useeffect.asp
    useEffect(() => {
        //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
        const fetchQueryData = async () => {
            try {
                const response = await fetch(`/api/results/${queryId}`);
                const data = await response.json();
                console.log('Fetched query data:', data);
                setQueryData(data);
            } catch (error) {
                console.error('Error fetching query data:', error);
            }
        };

        fetchQueryData();
    }, [queryId]);

    const renderFactCheckedText = () => {
        if (!queryData || !queryData.factCheckResult) return null;

        let highlightedText = '';
        let currentIndex = 0;

        queryData.factCheckResult.forEach(({ startIndex, endIndex, suggestion }) => {
            highlightedText += queryData.originalText.slice(currentIndex, startIndex);
            const inaccurateSegment = queryData.originalText.slice(startIndex, endIndex);
            highlightedText += `<span class="inaccuracy" title="${suggestion}">${inaccurateSegment}</span>`;
            currentIndex = endIndex;
        });

        highlightedText += queryData.originalText.slice(currentIndex);

        return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };

    if (!queryData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <h1>Results</h1>
            <h2>Summary</h2>
            <p>{queryData.summary}</p>
            <h2>Fact-Checked Text</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                {renderFactCheckedText()}
            </div>
        </div>
    );
}

export default Results;