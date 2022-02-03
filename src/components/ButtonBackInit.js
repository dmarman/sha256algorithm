function ButtonInit({ clock, onClockInit }) {
  let bg = 'hover:bg-gray-600';
  if(clock === 0) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onClockInit} className={`px-3 py-2 rounded ${bg} bg-gray-700 mx-1 transition`} title="Step 0">
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-track-prev"
           width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none"
           strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M21 5v14l-8 -7z"/>
        <path d="M10 5v14l-8 -7z"/>
      </svg>
    </button>
  );
}

export default ButtonInit;
