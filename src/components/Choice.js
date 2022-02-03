import { decimalToBinary } from '../classes/utils'

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function Choice({ letters, base }) {
  let e = letters[4];
  let f = letters[5];
  let g = letters[6];
  let choice = ((e & f) ^ ((~e) & g)) >>> 0;

  return (
    <div className="mb-3">
      <div className="flex">
        <div className="mr-3 w-32">
          <div className="mb-1 text-green-500 mr-1">e</div>
          <div className="text-red-500">f</div>
          <div className="mb-1 text-indigo-500">g</div>
          <div>Choice:</div>
        </div>
        { base === 'hex' &&
          <div>
            <div className="border-b">
              { displayHex(e) }
            </div>
            <div>
              { displayHex(f) }
            </div>
            <div className="border-b">
              { displayHex(g) }
            </div>
            <div>
              { displayHex(choice) }
            </div>
          </div>
        }
        { base === 'bin' &&
          <div className="mr-3">
            <div className="border-b mb-1 text-green-500">
              { decimalToBinary(e).padStart(32, '0') }
            </div>
            <div className="text-red-500">
              { decimalToBinary(f).padStart(32, '0') }
            </div>
            <div className="border-b text-indigo-500 mb-1">
              { decimalToBinary(g).padStart(32, '0') }
            </div>
            <div>
              { decimalToBinary(choice).padStart(32, '0') }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Choice;
