function ButtonBack({ clock, onClockBack }) {
  let bg = 'hover:bg-gray-600';
  if(clock === 0) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onClockBack} className={`px-3 py-2 rounded ${bg} bg-gray-700 mx-1 transition`} title="One step back">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 13.3333V2.66668L4.66666 8.00001L13.3333 13.3333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default ButtonBack;
