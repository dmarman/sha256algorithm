import { decimalToBinary } from '../classes/utils'
import ReactTooltip from 'react-tooltip';

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function BeforeLetters({ letters, base, labels = [], clock }) {

  function focusClass(key, clock) {
    if(clock <= 49) return;
    if(7 === key) return 'text-purple-500';
    if(6 === key) return 'text-indigo-500';
    if(5 === key) return 'text-red-500';
    if(4 === key) return 'text-green-500';

    if(2 === key) return 'text-orange-500';
    if(1 === key) return 'text-lime-500';
    if(0 === key) return 'text-fuchsia-500';

    return 'border-transparent'
  }

  if(clock < 50) return '';

  return (
    <div>
      <ReactTooltip />
      <h2 className="font-bold my-1 text-indigo-200">Working Variables</h2>
      <div className="flex">
        <div>
          {base === 'bin' && letters.map((word, key) =>
            <div className="flex" data-tip={ displayHex(word) }>
              <span className="mr-2 font-bold text-green-600">{labels && labels[key]}</span>
              <div key={(key).toString()} className={'px-1 ' + focusClass(key, clock)}>
                { decimalToBinary(word).padStart(32, '0').match(new RegExp('.{1,' + 32 + '}', 'g')).join(' ') }
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={clock === 50 ? 'opacity-100 hidden' : 'opacity-0 hidden'}>
            <div className="flex">
              <div>
                <div className="text-fuchsia-500">= a</div>
                <div className="text-lime-500">= b</div>
                <div className="text-orange-500">= c</div>
                <div className="text--500">= d</div>
                <div className="text-green-500">= e</div>
                <div className="text-red-500">= f</div>
                <div className="text-indigo-500">= g</div>
                <div className="text-purple-500">= h</div>
              </div>
              <div className="ml-1">
                <div>┐</div>
                <div>│</div>
                <div>│</div>
                <div>├ Initialize</div>
                <div>│ working variables</div>
                <div>│</div>
                <div>│</div>
                <div>┘</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeLetters;
