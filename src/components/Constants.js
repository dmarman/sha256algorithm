import { decimalToBinary } from '../classes/utils'

function Constants({ k, base, clock }) {
  let secondLoopStartsAtClock = 50;

  function focusColor(key, clock) {
    if(clock - secondLoopStartsAtClock === key)  return 'text-red-500';

    return 'opacity-75';
  }

  return (
    <div>
      { clock > 49 &&
        <div>
          <h2 className="font-bold my-1 text-indigo-200">K constants</h2>
          {k.map((constant, key) =>
            <div className={'flex ' + focusColor(key, clock)} key={constant}>
              <span className="mr-2 font-bold text-green-600 w-5">k{key}</span>
              <div className={`px-1 ${ focusColor(key, clock) }`}>
                { decimalToBinary((constant >>> 0)).padStart(32, '0') }
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default Constants;
