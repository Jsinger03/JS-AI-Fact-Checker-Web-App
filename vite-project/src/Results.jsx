import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function Results() {
    const { queryId } = useParams();
    const [queryData, setQueryData] = useState(null);

    useEffect(() => {
      const fetchQueryData = async () => {
          try {
              const response = await fetch(`/api/results/${queryId}`);
              const data = await response.json();
              console.log('Fetched query data:', data); // Log the data
              setQueryData(data);
          } catch (error) {
              console.error('Error fetching query data:', error);
          }
      };
  
      fetchQueryData();
  }, [queryId]);

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
            {queryData.factCheckResult && queryData.factCheckResult.map((fact, index) => (
                <span
                    key={index}
                    style={{ backgroundColor: '#f0f0f0', cursor: 'pointer' }}
                    title={fact.suggestion}
                >
                    {fact.textSegment}
                </span>
            ))}
        </div>
      </div>
    );
}

export default Results;