import { decimalToBinary, ordinal } from '../classes/utils'

function MessageSchedule({ data, base, labels = [], clock, currentChunk }) {
  let firstLoopStartsAtClock = 14;
  let secondLoopStartsAtClock = 50;

  function focusColor(key, clock) {
    if(clock      + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return 'text-white';
    if(clock - 15 + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return 'text-red-500';
    if(clock - 2  + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return 'text-green-500';
    if(clock - 16 + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return 'text-blue-500';
    if(clock - 7  + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return 'text-yellow-500';
    if(clock - secondLoopStartsAtClock === key)  return 'text-yellow-500';

    if(clock === 1) return 'opacity-1';
    return 'opacity-75';
  }

  function diluteOnClockOne(key, clock) {
    if(clock === 1 && key > 15) return 'opacity-50';

    return '';
  }

  function arrowDirection(key, clock) {
    if(clock      + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return '◄';
    if(clock - 15 + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return '►';
    if(clock - 2  + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return '►';
    if(clock - 16 + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return '►';
    if(clock - 7  + firstLoopStartsAtClock === key && clock < 50 && clock > 1) return '►';

    if(clock - secondLoopStartsAtClock === key)  return '►';

    return '\u00A0\u00A0'
  }

  return (
    <div className={`duration-500 ${clock < 1 && 'opacity-25'} mt-2 sm:mt-0`}>
      <h2 className="font-bold my-1 text-indigo-200">Message schedule <span className="font-medium text-gray-400">- { ordinal(currentChunk) } chunk</span></h2>
      { data.map((word, key) =>
        <div className={`flex ${ focusColor(key, clock) }`} key={key}>
          {Array.isArray(labels) ?
            <span className="mr-2 font-bold text-green-600">{labels && labels[key]}</span> :
            <span className="mr-2 font-bold text-green-600 w-5">{labels}{key}</span>
          }
          <div key={(key).toString()} className={`px-1 ${ focusColor(key, clock) } ${ diluteOnClockOne(key, clock) }`}>
            {
              decimalToBinary(word).padStart(32, '0').match(new RegExp('.{1,' + 32 + '}', 'g')).join(' ')
            }
            <span className={`pl-1`}>{ arrowDirection(key, clock) }</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageSchedule;
