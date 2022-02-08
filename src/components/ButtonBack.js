function ButtonBack({ clock, onClockBack }) {
  let bg = 'hover:bg-gray-600';
  if(clock === 0) bg = 'opacity-25 cursor-default';

  return (
    <button onClick={onClockBack} className={`px-3 py-2 rounded ${bg} bg-gray-700 mx-1 transition`} title="Go back 1 step">
      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 13.3333L10 2.66666L1.33333 7.99999L10 13.3333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 13.33L13 2.66" stroke="white" strokeWidth="1.33" strokeLinecap="round"/>
        <path d="M16 13.33V2.66" stroke="white" strokeWidth="1.33" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

export default ButtonBack;
