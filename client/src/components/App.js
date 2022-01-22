import React from 'react';
import axios from 'axios';
import Header from './Header.js';
import MatchSection from './MatchSection.js';

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
    content = <div className='w-max h-screen flex justify-center content-center text-center'><h1 className='text-7xl font-bold'>Loading...</h1></div>;
  } else {
    content = <MatchSection matches={matches} />;
  }

  return (
    <div>
      <Header />
      <div>
        <main className='container mx-auto bg-gray-700'>
          {content}
        </main>
      </div>
    </div>
  );
}

export default App;
