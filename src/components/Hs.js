import { decimalToBinary } from '../classes/utils'
import ReactTooltip from 'react-tooltip';

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function Hs({ hs, base, clock }) {

  if(clock !== 50) return '';

  return (
    <div className="ml-8">
      <h2 className="font-bold my-1 text-indigo-200">Initial hash value</h2>
      <div className="flex">
        <div>
          <ReactTooltip />
          {base === 'bin' && hs.map((word, key) =>
            <div className="flex" data-tip={ displayHex(word) }>
              <span className="mr-2 font-bold text-green-600">h{key}</span>
              <div key={(key).toString()} className={'px-1'}>
                { decimalToBinary(word).padStart(32, '0').match(new RegExp('.{1,' + 32 + '}', 'g')).join(' ') }
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={clock === 50 ? 'opacity-100' : 'opacity-0'}>
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
                <div>├ Init working</div>
                <div>│ variables</div>
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

export default Hs;
