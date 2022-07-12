import React from 'react';
import Checkbox from './Checkbox';
import FinishedMatch from './MatchComponents/FinishedMatch';
import UpcomingMatch from './MatchComponents/UpcomingMatch';
import UndecidedUpcomingMatch from './MatchComponents/UndecidedUpcomingMatch';

const MatchSection = (props) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className='w-auto mx-40'>
      <div>
      <Checkbox
        label="Only show top tier"
        value={checked}
        onChange={handleChange}
      />
      <p>Is "My Value" checked? {checked.toString()}</p>
    </div>
      {renderMatches(props.matches, props.predictions, checked)}
      <div className=''>
        <input className='' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
        <label className='' htmlFor='flexSwitchCheckDefault'>Default switch checkbox input</label>
      </div>
    </div>
  );
};

function renderMatches (matchesData, predictionData, checked) {
  return matchesData.map(match => {
    const prediction = predictionData.predictionsFormatted[match.link_id];
    if (checked) {
      if (match.isTopTier === 0) return;
    }
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
