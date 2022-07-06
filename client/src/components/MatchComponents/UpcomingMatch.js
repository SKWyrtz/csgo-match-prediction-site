import React, { useEffect, useState } from 'react';
import socket from '../../socket';

const UpcomingMatch = (props) => {
  const [team1IsPredicted, setTeam1Prediction] = useState(false);
  const [team2IsPredicted, setTeam2Prediction] = useState(false);

  React.useEffect(() => {
    if (props.predictionData !== undefined) {
      console.log(props.predictionData);
      if (props.predictionData === '1') {
        setTeam1Prediction(true);
      } else {
        setTeam2Prediction(true);
      }
    }
  }, []);

  function predictMatch (e) {
    const target = e.currentTarget;
    const name = target.children[0].textContent;
    let predictedTeam;
    if (name === props.matchData.team1) {
      predictedTeam = 1;
      if (team1IsPredicted) {
        setTeam1Prediction(false);
      } else {
        setTeam1Prediction(true);
        setTeam2Prediction(false);
      }
    } else {
      predictedTeam = 2;
      if (team2IsPredicted) {
        setTeam2Prediction(false);
      } else {
        setTeam2Prediction(true);
        setTeam1Prediction(false);
      }
    }
    const parent = target.parentElement;
    const linkID = parent.children[2].getAttribute('href');

    const socketData = {
      predictedTeam: predictedTeam,
      linkID: linkID
    };
    socket.emit('prediction', socketData, (response) => {
      console.log(response.status);
    });
  }
  const date = new Date(props.matchData.date);
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return (
    <div className='m-2 flex justify-evenly bg-gray-600'>
      <div className='w-1/12'><p /></div>
      <div className={`w-3/12 flex-col justify-center items-center ${team1IsPredicted ? 'bg-yellow-600 bg-opacity-75' : ''}`} onClick={predictMatch}>
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
      <div className={`w-3/12 flex-col justify-center items-center ${team2IsPredicted ? 'bg-yellow-600 bg-opacity-75' : ''}`} onClick={predictMatch}>
        <h2 className='text-center'>{props.matchData.team2}</h2>
        <img className='w-10 mx-auto' src={props.matchData.team2Logo} alt={props.matchData.team2 + ' logo'} />
      </div>
      <div className='w-1/12'><p /></div>
    </div>
  );
};

export default UpcomingMatch;
