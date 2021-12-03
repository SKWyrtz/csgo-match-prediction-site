import React from 'react';
import Match from './Match.js';
import axios from 'axios';

function App () {
  const [isLoaded, setIsLoading] = React.useState(true);
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios('/api');
      setMatches(response.data.matches);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  let content;
  if (isLoaded) {
    content = <div>Loading...</div>;
  } else {
    content = renderMatches(matches);
  }

  return (
    <div className='container bg-gray-100'>
      {content}
    </div>
  );
}

function renderMatches (matchesData) {
  return matchesData.map(match => {
    return <Match matchData={match} key={match.link} />;
  });
}

export default App;
