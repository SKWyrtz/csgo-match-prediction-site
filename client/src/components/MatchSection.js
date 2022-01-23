import FinishedMatch from './MatchComponents/FinishedMatch';
import UpcomingMatch from './MatchComponents/UpcomingMatch';
import UndecidedUpcomingMatch from './MatchComponents/UndecidedUpcomingMatch';

const MatchSection = (props) => {
  return (
    <div className='w-auto mx-40'>
      {renderMatches(props.matches)}
    </div>
  );
};

function renderMatches (matchesData) {
  return matchesData.map(match => {
    if (match.team1Score !== '') {
      return <FinishedMatch matchData={match} key={match.link} />;
    } else if (match.matchInfoEmpty === '') { // Upcoming match
      return <UpcomingMatch matchData={match} key={match.link} />;
    } else {
      return <UndecidedUpcomingMatch matchData={match} key={match.link} />;
    }
  });
}

export default MatchSection;
