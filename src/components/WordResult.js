import { decimalToBinary } from '../classes/utils'
import { rotateRight } from '../classes/utils'

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function WordResult({ w, firstLoop, base }) {
  let w16 = w[firstLoop - 17];
  let w7 = w[firstLoop - 8];

  let rotate7 = rotateRight(w[firstLoop - 16], 7) >>> 0;
  let rotate18 = rotateRight(w[firstLoop - 16], 18) >>> 0;
  let shift3 = w[firstLoop - 16] >>> 3;
  let s0 = (rotate7 ^ rotate18 ^ shift3) >>> 0;

  let rotate17 = rotateRight(w[firstLoop - 3], 17) >>> 0;
  let rotate19 = rotateRight(w[firstLoop - 3], 19) >>> 0;
  let shift10 = w[firstLoop - 3] >>> 10;
  let s1 = (rotate17 ^ rotate19 ^ shift10) >>> 0;

  let sum = (w16 + s0 + w7 + s1)%(2**32);
  return (
    <div className="mt-6">
      { base === 'hex' &&
        <div>
          <div className="border-b">
            { displayHex(w16) }
          </div>
          <div>
            { displayHex(s0) }
          </div>
          <div>
            { displayHex(w7) }
          </div>
          <div className="border-b">
            { displayHex(s1) }
          </div>
          <div>
            { displayHex(sum) }
          </div>
        </div>
      }

      { base === 'bin' &&
        <div className="flex">
          <div className="mr-3 w-32">
            <div className="text-blue-500 mr-1">
              <span>W</span>
              <span style={{fontSize: '8px'}}>{firstLoop - 17}</span>
            </div>
            <div>
              σ0
            </div>
            <div className="text-yellow-500 mr-1">
              <span>W</span>
              <span style={{fontSize: '8px'}}>{firstLoop - 8}</span>
            </div>


            <div className="border-b border-transparent mb-1">
              σ1
            </div>
            <div className="text-white">
              <span>W</span>
              <span style={{fontSize: '8px'}}>{firstLoop - 1}</span>
            </div>
          </div>
          <div className="mr-3">
            <div className="text-blue-500">
              { decimalToBinary(w16).padStart(32, '0') }
            </div>
            <div>
              { decimalToBinary(s0).padStart(32, '0') } +
            </div>
            <div className="text-yellow-500">
              { decimalToBinary(w7).padStart(32, '0') } +
            </div>
            <div className="border-b mb-1">
              { decimalToBinary(s1).padStart(32, '0') } +
            </div>
            <div className="text-white">
              { decimalToBinary(sum).padStart(32, '0') }
            </div>
          </div>
        </div>
      }


    </div>
  );
}

export default WordResult;
