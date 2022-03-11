const FinishedMatch = (props) => {
  const date = new Date(props.matchData.date);
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
          <h2>{date.toDateString()}</h2>
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
};

export default FinishedMatch;
