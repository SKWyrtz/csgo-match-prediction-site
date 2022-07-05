import React from 'react';
import FinishedMatch from './MatchComponents/FinishedMatch';
import UpcomingMatch from './MatchComponents/UpcomingMatch';
import UndecidedUpcomingMatch from './MatchComponents/UndecidedUpcomingMatch';

const MatchSection = (props) => {
  return (
    <div className='w-auto mx-40'>
      {renderMatches(props.matches, props.predictions)}
      <div className=''>
        <input className='' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
        <label className='' htmlFor='flexSwitchCheckDefault'>Default switch checkbox input</label>
      </div>
    </div>
  );
};

function renderMatches (matchesData, predictionData) {
  return matchesData.map(match => {
    const prediction = predictionData.predictionsFormatted[match.link_id];
    if (match.team1Score !== '') {
      return <FinishedMatch matchData={match} predictionData={prediction} key={match.link_id} />;
    } else if (match.matchInfoEmpty === '') { // Upcoming match
      return <UpcomingMatch matchData={match} predictionData={prediction} key={match.link_id} />;
    } else {
      return <UndecidedUpcomingMatch matchData={match} key={match.link_id} />;
    }
  });
}

export default MatchSection;
