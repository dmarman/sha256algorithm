function ButtonClockFast({ clock, onClockFast, lastClock }) {
  let bg = 'hover:bg-gray-600';
  if(clock + 10 > lastClock()) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onClockFast} className={`px-3 py-2 rounded ${bg} bg-gray-700 text-white mx-1 transition`} title="Go 10 steps forward">
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-track-next"
           width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none"
           strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 5v14l8 -7z"/>
        <path d="M14 5v14l8 -7z"/>
      </svg>
    </button>
  );
}

export default ButtonClockFast;
