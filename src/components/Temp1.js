import { decimalToBinary } from '../classes/utils'
import { rotateRight } from '../classes/utils'

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function Temp1({ w, letters, base, clock, k }) {
  let e = letters[4];
  let h = letters[7];
  let rotate6 = rotateRight(e, 6) >>> 0;
  let rotate11 = rotateRight(e, 11) >>> 0;
  let rotate25 = rotateRight(e, 25) >>> 0;
  let sigmaUpper1 = (rotate6 ^ rotate11 ^ rotate25) >>> 0;

  let f = letters[5];
  let g = letters[6];
  let choice = ((e & f) ^ ((~e) & g)) >>> 0;

  let kIndex = clock - 50;

  let temp1 = (h + sigmaUpper1 + choice + k[kIndex] + w[kIndex])%(2**32);

  return (
    <div className="mb-3">
      <div className="flex">
        <div className="mr-3 w-32">
          <div className="text-purple-500">h</div>
          <div>Σ1</div>
          <div>Choice</div>
          <div className="text-red-500">k{kIndex}</div>
          <div className="text-yellow-500">w{kIndex}</div>
          <div className="text-white">Temp1:</div>
        </div>
        { base === 'hex' &&
          <div>
            <div>
              { displayHex(h) }
            </div>
            <div>
              { displayHex(sigmaUpper1) }
            </div>
            <div>
              { displayHex(choice) }
            </div>
            <div className="text-red-500">
              { displayHex(k[kIndex] >>> 0) }
            </div>
            <div className="text-yellow-500">
              { displayHex(w[kIndex]) }
            </div>
            <div>
              { displayHex(temp1) }
            </div>
          </div>
        }
        { base === 'bin' &&
          <div className="mr-3">
            <div className="text-purple-500">
              { decimalToBinary(h).padStart(32, '0') }
            </div>
            <div>
              { decimalToBinary(sigmaUpper1).padStart(32, '0') } +
            </div>
            <div>
              { decimalToBinary(choice).padStart(32, '0') } +
            </div>
            <div className="text-red-500">
              { decimalToBinary(k[kIndex] >>> 0).padStart(32, '0') } +
            </div>
            <div className="text-yellow-500 border-b mb-1">
              { decimalToBinary(w[kIndex]).padStart(32, '0') } +
            </div>
            <div className="text-white">
              { decimalToBinary(temp1).padStart(32, '0') }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Temp1;
