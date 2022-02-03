import { decimalToBinary } from '../classes/utils'

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function Majority({ letters, base }) {
  let a = letters[0];
  let b = letters[1];
  let c = letters[2];
  let maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;

  return (
    <div className="mb-4">
      <div className="flex">
        <div className="mr-3 w-32">
          <div className="text-fuchsia-500">a</div>
          <div className="text-lime-500">b</div>
          <div className="mb-1 text-orange-500">c</div>
          <div>Majority:</div>
        </div>
        { base === 'hex' &&
          <div>
            <div className="border-b">
              { displayHex(a) }
            </div>
            <div>
              { displayHex(b) }
            </div>
            <div className="border-b">
              { displayHex(c) }
            </div>
            <div>
              { displayHex(maj) }
            </div>
          </div>
        }
        { base === 'bin' &&
          <div className="mr-3">
            <div className="text-fuchsia-500">
              { decimalToBinary(a).padStart(32, '0') }
            </div>
            <div className="text-lime-500">
              { decimalToBinary(b).padStart(32, '0') }
            </div>
            <div className="border-b mb-1 text-orange-500">
              { decimalToBinary(c).padStart(32, '0') }
            </div>
            <div>
              { decimalToBinary(maj).padStart(32, '0') }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Majority;
