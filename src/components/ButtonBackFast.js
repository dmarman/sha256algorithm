function ButtonBackFast({ clock, onClockBackFast }) {
  let bg = 'hover:bg-gray-600';
  if(clock - 10 < 2) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onClockBackFast} className={`px-3 py-2 rounded ${bg} bg-gray-700 mx-1 transition`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-skip-back" width="16"
           height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round"
           strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 5v14l-12 -7z"/>
        <line x1="4" y1="5" x2="4" y2="19"/>
      </svg>
    </button>
  );
}

export default ButtonBackFast;
