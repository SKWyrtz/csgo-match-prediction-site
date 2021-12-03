const Match = (props) => {
  return (
    <div className='m-2 flex justify-evenly bg-red-400'>
      <div className='w-2/5 flex-col justify-center items-center'>
        <h1 className='text-center'>{props.matchData.team1}</h1>
        <img className='w-10 mx-auto' src={props.matchData.team1Logo} />
      </div>
      <h1 className='w-1/5 text-center'>VERSUS</h1>
      <div className='w-2/5 flex-col justify-center items-center'>
        <h1 className='text-center'>{props.matchData.team2}</h1>
        <img className='w-10 mx-auto' src={props.matchData.team2Logo} />
      </div>
    </div>
  );
};
export default Match;

// {props.matchData[0].date}
