import React, { useEffect, useState } from 'react';

const FinishedMatch = (props) => {
  const [team1PredictedRight, setTeam1PredictedRight] = useState(false);
  const [team2PredictedRight, setTeam2PredictedRight] = useState(false);
  const [team1PredictedWrong, setTeam1PredictedWrong] = useState(false);
  const [team2PredictedWrong, setTeam2PredictedWrong] = useState(false);
  const team1Score = props.matchData.team1Score;
  const team2Score = props.matchData.team2Score;

  React.useEffect(() => {
    console.log(`Team1: ${props.matchData.team1} vs Team2: ${props.matchData.team2}`);
    console.log(props.predictionData);
    if (props.predictionData !== undefined) {
      if (props.predictionData === '1') {
        if (team1Score > team2Score) {
          setTeam1PredictedRight(true);
        } else {
          setTeam1PredictedWrong(true);
        }
      }
      if (props.predictionData === '2') {
        if (team1Score < team2Score) {
          setTeam2PredictedRight(true);
        } else {
          setTeam2PredictedWrong(true);
        }
      }
    }
  }, []);

  const date = new Date(props.matchData.date);
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return (
    <div className='m-2 flex p-2 justify-evenly bg-gray-800'>
      <div className='w-1/12 flex justify-center items-center'><h2 className='text-xl font-bold'>{props.matchData.team1Score}</h2></div>
      <div className={`w-3/12 flex-col justify-center items-center ${team1PredictedRight ? 'bg-green-600 bg-opacity-75' : ''} ${team1PredictedWrong ? 'bg-red-600 bg-opacity-75' : ''}`}>
        <h2 className='text-center'>{props.matchData.team1}</h2>
        <img className='w-10 mx-auto' src={props.matchData.team1Logo} alt={props.matchData.team1 + ' logo'} />
      </div>
      <a className='w-4/12 text-center' href={props.matchData.link_id} target='_blank' rel='noreferrer'>
        <div className='text-center hover:text-gray-300'>
          <h2 className='text-primary'>VERSUS</h2>
          <h2>{date.toLocaleDateString(undefined, dateOptions)}</h2>
          <h2>{date.toLocaleTimeString()}</h2>
          <h2 className=''>{props.matchData.event}</h2>
        </div>
      </a>
      <div className={`w-3/12 flex-col justify-center items-center ${team2PredictedRight ? 'bg-green-600 bg-opacity-75' : ''} ${team2PredictedWrong ? 'bg-red-600 bg-opacity-75' : ''}`}>
        <h2 className='text-center'>{props.matchData.team2}</h2>
        <img className='w-10 mx-auto' src={props.matchData.team2Logo} alt={props.matchData.team2 + ' logo'} />
      </div>
      <div className='w-1/12 flex justify-center items-center'><h2 className='text-xl font-bold'>{props.matchData.team2Score}</h2></div>
    </div>
  );
};

export default FinishedMatch;
