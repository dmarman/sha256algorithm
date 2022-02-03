import { decimalToBinary } from '../classes/utils'
import { rotateRight } from '../classes/utils'

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function SigmaUpper0({ a, base }) {
  let input = a;
  let rotate2 = rotateRight(input, 2) >>> 0;
  let rotate13 = rotateRight(input, 13) >>> 0;
  let rotate22 = rotateRight(input, 22) >>> 0;
  let xor = (rotate2 ^ rotate13 ^ rotate22) >>> 0;

  return (
    <div className="mb-3">
      <div className="flex">
        <div className="mr-3 w-32">
          <div className="mb-1 text-green-500 mr-1">a</div>
          <div>right rotate 2</div>
          <div>right rotate 13</div>
          <div className="mb-1">right rotate 22</div>
          <div>Σ0:</div>
        </div>
        { base === 'hex' &&
          <div>
            <div className="border-b">
              { displayHex(input) }
            </div>
            <div>
              { displayHex(rotate2) }
            </div>
            <div>
              { displayHex(rotate13) }
            </div>
            <div className="border-b">
              { displayHex(rotate22) }
            </div>
            <div>
              { displayHex(xor) }
            </div>
          </div>
        }
        { base === 'bin' &&
          <div className="mr-3">
            <div className="border-b mb-1 text-green-500">
              { decimalToBinary(input).padStart(32, '0') }
            </div>
            <div>
              { decimalToBinary(rotate2).padStart(32, '0') }
            </div>
            <div>
              { decimalToBinary(rotate13).padStart(32, '0') } XOR
            </div>
            <div className="border-b mb-1">
              { decimalToBinary(rotate22).padStart(32, '0') } XOR
            </div>
            <div>
              { decimalToBinary(xor).padStart(32, '0') }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default SigmaUpper0;
