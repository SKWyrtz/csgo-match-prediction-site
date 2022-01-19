import React from 'react';
import axios from 'axios';
import Match from './Match.js';
import Header from './Header.js';

function App () {
  const [isLoaded, setIsLoading] = React.useState(true);
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios('/api');
      // console.log(response.data.matches);
      setMatches(response.data.matches);
      setIsLoading(false);
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
    <div>
      <Header />
      <div>
        <main className='container mx-auto bg-gray-700'>
          <div className='w-auto mx-40'>
            {content}
          </div>
        </main>
      </div>
    </div>
  );
}

function renderMatches (matchesData) {
  console.log(matchesData.length);
  return matchesData.map(match => {
    return <Match matchData={match} key={match.link} />;
  });
}

export default App;
