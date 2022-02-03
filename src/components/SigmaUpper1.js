import { decimalToBinary } from '../classes/utils'
import { rotateRight } from '../classes/utils'

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function SigmaUpper1({ e, base }) {
  let input = e;
  let rotate6 = rotateRight(input, 6) >>> 0;
  let rotate11 = rotateRight(input, 11) >>> 0;
  let rotate25 = rotateRight(input, 25) >>> 0;
  let xor = (rotate6 ^ rotate11 ^ rotate25) >>> 0;

  return (
    <div className="mb-3">
      <div className="flex">
        <div className="mr-3 w-32">
          <div className="mb-1 text-green-500 mr-1">e</div>
          <div>right rotate 6</div>
          <div>right rotate 11</div>
          <div className="mb-1">right rotate 25</div>
          <div>Σ1:</div>
        </div>
        { base === 'hex' &&
          <div>
            <div className="border-b">
              { displayHex(input) }
            </div>
            <div>
              { displayHex(rotate6) }
            </div>
            <div>
              { displayHex(rotate11) }
            </div>
            <div className="border-b">
              { displayHex(rotate25) }
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
              { decimalToBinary(rotate6).padStart(32, '0') }
            </div>
            <div>
              { decimalToBinary(rotate11).padStart(32, '0') } XOR
            </div>
            <div className="border-b mb-1">
              { decimalToBinary(rotate25).padStart(32, '0') } XOR
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

export default SigmaUpper1;
