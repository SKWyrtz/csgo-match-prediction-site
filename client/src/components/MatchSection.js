import Match from './Match';

const MatchSection = (props) => {
  return (
    <div className='w-auto mx-40'>
      {renderMatches(props.matches)}
    </div>
  );
};

function renderMatches (matchesData) {
  return matchesData.map(match => {
    return <Match matchData={match} key={match.link} />;
  });
}

export default MatchSection;
