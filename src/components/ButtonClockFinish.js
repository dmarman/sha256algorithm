function ButtonClockFinish({ clock, onClockFinish, lastClock }) {
  let bg = 'hover:bg-gray-600';
  if(clock === lastClock()) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onClockFinish} className={`px-3 py-2 rounded ${bg} bg-gray-700 text-white mx-1 transition`} title="Go to last step">
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-skip-forward"
           width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none"
           strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 5v14l12 -7z"/>
        <line x1="20" y1="5" x2="20" y2="19"/>
      </svg>
    </button>
  );
}

export default ButtonClockFinish;
