import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './styles/Results.scss';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
function Results() {
    const { queryId } = useParams();
    //https://www.w3schools.com/react/react_usestate.asp
    const [queryData, setQueryData] = useState(null);
    const navigate = useNavigate();
    //https://www.w3schools.com/react/react_useeffect.asp
    useEffect(() => {
        //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
        const fetchQueryData = async () => {
            try {
                const response = await fetch(`/api/results/${queryId}`);
                const data = await response.json();
                console.log('Fetched query data:', data);
                const storedUserId = localStorage.getItem('userId');
                if (!storedUserId || data.user._id !== storedUserId) {
                    navigate('/'); // Redirect if userId does not match
                } else {
                    setQueryData(data);
                }
            } catch (error) {
                console.error('Error fetching query data:', error);
            }
        };

        fetchQueryData();
    }, [queryId, navigate]);

    const renderFactCheckedText = () => {
        if (!queryData || !queryData.factCheckResult) return null;

        let highlightedText = '';
        queryData.factCheckResult.forEach(({ textSegment, suggestion, accurate }) => {
            const sanitizedSegment = DOMPurify.sanitize(textSegment, { ALLOWED_TAGS: [] });// Disallow all HTML tags
            if (!accurate) {
                highlightedText += `<span class="inaccuracy" title="${suggestion}">${sanitizedSegment}</span> `;
            } else {
                highlightedText += sanitizedSegment + ' ';
            }
        });
        const sanitizedHTML = DOMPurify.sanitize(highlightedText);
        return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
        // return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
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
            <div className="checked-text">
                {renderFactCheckedText()}
            </div>
        </div>
    );
}

export default Results;