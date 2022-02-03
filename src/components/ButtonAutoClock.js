function ButtonAutoClock({ clock, onAutoClock, lastClock, autoplay }) {
  let bg = 'hover:bg-gray-600';
  if(clock === lastClock()) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onAutoClock} className={`px-3 py-2 rounded ${bg} bg-gray-700 text-white mx-1 transition`} title="Auto run">
      <div className="flex items-center justify-between">
        { autoplay ?
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-pause" width="16"
               height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round"
               strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="6" y="5" width="4" height="14" rx="1"/>
            <rect x="14" y="5" width="4" height="14" rx="1"/>
          </svg> :
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2.66667V13.3333L14.6667 8.00001L6 2.66667Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 2.67V13.34" stroke="white" strokeWidth="1.33" strokeLinecap="round"/>
          </svg>
        }
      </div>
    </button>
  );
}

export default ButtonAutoClock;
