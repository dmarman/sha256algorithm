function ButtonClock({ clock, onClock, lastClock }) {
  let bg = 'hover:bg-red-600';
  if(clock === lastClock()) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onClock} className={`px-3 py-2 rounded ${bg} bg-red-700 text-white mx-1 transition`} title="One step">
      <div className="flex items-center justify-between w-11">
        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 2.66667V13.3333L9.66667 8.00001L1 2.66667Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="15" cy="8" r="2.335" stroke="white" strokeWidth="1.33"/>
        </svg>
        <span>{clock}</span>
      </div>
    </button>
  );
}

export default ButtonClock;
