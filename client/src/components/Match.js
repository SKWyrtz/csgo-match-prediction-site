const Match = (props) => {
  const date = new Date(props.matchData.date);

  let content;

  if (props.matchData.matchInfoEmpty === '') {
    return (
    <div className='m-2 flex justify-evenly bg-red-400'>
      <div className='w-1/3 flex-col justify-center items-center'>
        <h2 className='text-center'>{props.matchData.team1}</h2>
        <img className='w-10 mx-auto' src={props.matchData.team1Logo} alt={props.matchData.team1 + " logo"} />
      </div>
      <div className='w-1/3 text-center'>
        <h2 className=''>VERSUS</h2>
        <h2 className>{date.toDateString()}</h2>
        <h2 className=''>{props.matchData.event}</h2>
        <a className='text-blue' href={props.matchData.link}>HLTV Link</a>
      </div>
      <div className='w-1/3 flex-col justify-center items-center'>
        <h2 className='text-center'>{props.matchData.team2}</h2>
        <img className='w-10 mx-auto' src={props.matchData.team2Logo} alt={props.matchData.team2 + " logo"} />
      </div>
    </div>
    )
  } else {
    return (
      <div className='m-2 flex justify-evenly bg-red-400'>
      <div className='w-1/3 flex-col justify-center items-center'>
      </div>
      <div className='w-1/3 text-center'>
        <h1>{props.matchData.matchInfoEmpty}</h1>
        <h2 className>{date.toDateString()}</h2>
        <a className='text-blue' href={props.matchData.link}>HLTV Link</a>
      </div>
      <div className='w-1/3 flex-col justify-center items-center'>
      </div>
      </div>
    );  
  }
  
  //console.log(title)
};
export default Match;

// {props.matchData[0].date}
