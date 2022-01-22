import React, { useEffect, useState } from 'react';

const Match = (props) => {
  const [team1IsPredicted, setTeam1Prediction] = useState(false);
  const [team2IsPredicted, setTeam2Prediction] = useState(false);

  function predictMatch (e) {
    const target = e.currentTarget;
    const name = target.children[0].textContent;
    console.log(name);
    if (name === props.matchData.team1) {
      if (team1IsPredicted) {
        setTeam1Prediction(false);
      } else {
        setTeam1Prediction(true);
        setTeam2Prediction(false);
      }
    } else {
      if (team2IsPredicted) {
        setTeam2Prediction(false);
      } else {
        setTeam2Prediction(true);
        setTeam1Prediction(false);
      }
    }
  }

  const date = new Date(props.matchData.date);
  if (props.matchData.team1Score !== '') { // Finished match
    return (
      <div className='m-2 flex p-2 justify-evenly bg-gray-800'>
        <div className='w-1/12 flex justify-center items-center'><h2 className='text-xl font-bold'>{props.matchData.team1Score}</h2></div>
        <div className='w-3/12 flex-col justify-center items-center'>
          <h2 className='text-center'>{props.matchData.team1}</h2>
          <img className='w-10 mx-auto' src={props.matchData.team1Logo} alt={props.matchData.team1 + ' logo'} />
        </div>
        <a className='w-4/12 text-center' href={props.matchData.link_id} target='_blank' rel='noreferrer'>
          <div className='text-center hover:text-gray-300'>
            <h2 className='text-primary'>VERSUS</h2>
            <h2 className>{date.toDateString()}</h2>
            <h2 className=''>{props.matchData.event}</h2>
          </div>
        </a>
        <div className='w-3/12 flex-col justify-center items-center'>
          <h2 className='text-center'>{props.matchData.team2}</h2>
          <img className='w-10 mx-auto' src={props.matchData.team2Logo} alt={props.matchData.team2 + ' logo'} />
        </div>
        <div className='w-1/12 flex justify-center items-center'><h2 className='text-xl font-bold'>{props.matchData.team2Score}</h2></div>
      </div>
    );
  } else if (props.matchData.matchInfoEmpty === '') { // Upcoming match
    return (
      <div className='m-2 flex justify-evenly bg-gray-600'>
        <div className='w-1/12'><p /></div>
        <div className={`w-3/12 flex-col justify-center items-center ${team1IsPredicted ? 'bg-red-800' : ''}`} onClick={predictMatch}>
          <h2 className='text-center'>{props.matchData.team1}</h2>
          <img className='w-10 mx-auto' src={props.matchData.team1Logo} alt={props.matchData.team1 + ' logo'} />
        </div>
        <a className='w-4/12 text-center' href={props.matchData.link_id} target='_blank' rel='noreferrer'>
          <div className='text-center hover:text-gray-300'>
            <h2 className='text-primary'>VERSUS</h2>
            <h2 className>{date.toDateString()}</h2>
            <h2 className=''>{props.matchData.event}</h2>
          </div>
        </a>
        <div className={`w-3/12 flex-col justify-center items-center ${team2IsPredicted ? 'bg-red-800' : ''}`} onClick={predictMatch}>
          <h2 className='text-center'>{props.matchData.team2}</h2>
          <img className='w-10 mx-auto' src={props.matchData.team2Logo} alt={props.matchData.team2 + ' logo'} />
        </div>
        <div className='w-1/12'><p /></div>
      </div>
    );
  } else { // Upcoming match, but teams are not decided yet
    return (
      <div className='m-2 flex justify-evenly bg-gray-600'>
        <div className='w-1/3 flex-col justify-center items-center' />
        <a className='w-1/3 text-center' href={props.matchData.link_id} target='_blank' rel='noreferrer'>
          <div className='text-center hover:text-gray-300'>
            <h1>{props.matchData.matchInfoEmpty}</h1>
            <h2 className>{date.toDateString()}</h2>
          </div>
        </a>
        <div className='w-1/3 flex-col justify-center items-center' />
      </div>
    );
  }
};

export default Match;
