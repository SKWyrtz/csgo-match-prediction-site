const UndecidedUpcomingMatch = (props) => {
  const date = new Date(props.matchData.date);
  return (
    <div className='m-2 flex justify-evenly bg-gray-600'>
      <div className='w-1/3 flex-col justify-center items-center' />
      <a className='w-1/3 text-center' href={props.matchData.link_id} target='_blank' rel='noreferrer'>
        <div className='text-center hover:text-gray-300'>
          <h1>{props.matchData.matchInfoEmpty}</h1>
          <h2>{date.toDateString()}</h2>
        </div>
      </a>
      <div className='w-1/3 flex-col justify-center items-center' />
    </div>
  );
};

export default UndecidedUpcomingMatch;
