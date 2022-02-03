import { decimalToBinary } from '../classes/utils'
import { rotateRight } from '../classes/utils'

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function Temp2({ w, letters, base}) {
  let a = letters[0];
  let b = letters[1];
  let c = letters[2];

  let rotate2 = rotateRight(a, 2) >>> 0;
  let rotate13 = rotateRight(a, 13) >>> 0;
  let rotate22 = rotateRight(a, 22) >>> 0;
  let sigmaUpper0 = (rotate2 ^ rotate13 ^ rotate22) >>> 0;
  let maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
  let temp2 = (sigmaUpper0 + maj)%(2**32);

  return (
    <div className="mb-3">
      <div className="flex">
        <div className="mr-3 w-32">
          <div>Majority</div>
          <div>Σ0</div>
          <div className="text-white">Temp2:</div>
        </div>
        { base === 'hex' &&
          <div>
            <div>
              { displayHex(maj) }
            </div>
            <div>
              { displayHex(sigmaUpper0) }
            </div>
            <div>
              { displayHex(temp2) }
            </div>
          </div>
        }
        { base === 'bin' &&
          <div className="mr-3">
            <div>
              { decimalToBinary(maj).padStart(32, '0') } +
            </div>
            <div>
              { decimalToBinary(sigmaUpper0).padStart(32, '0') } +
            </div>
            <div className="text-white">
              { decimalToBinary(temp2).padStart(32, '0') }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Temp2;
