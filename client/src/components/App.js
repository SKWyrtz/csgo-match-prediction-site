import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Header from './Header.js';
import Checkbox from './Checkbox.js';
import MatchSection from './MatchSection.js';
const ENDPOINT = 'http://localhost:5000/'; // Hardcoded

function App () {
  const [isLoading, setIsLoading] = React.useState(true);
  const [matches, setMatches] = React.useState([]);
  const [predictions, setPredictions] = React.useState([]);
  // const socket = useRef(null);

  // Is run when components is mounted
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const matchRes = await axios('/matchesData');
      setMatches(matchRes.data.matches);
      const predictionRes = await axios('/predictionData');
      console.log(predictionRes);
      // console.log(predictionRes.data.predictionsFormatted['https://www.hltv.org/matches/2357023/iem-cologne-2022-play-in-upper-bracket-quarter-final-3-iem-cologne-2022-play-in']);
      setPredictions(predictionRes.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  let content;
  if (isLoading) {
    content = <div className='w-max h-screen flex justify-center content-center text-center'><h1 className='text-7xl font-bold'>Loading...</h1></div>;
  } else {
    content = <MatchSection matches={matches} predictions={predictions} />;
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
