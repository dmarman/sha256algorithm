import { decimalToBinary } from '../classes/utils'
import { rotateRight } from '../classes/utils'
import ReactTooltip from 'react-tooltip';
import {sha256} from "../classes/sha";

function displayHex(value) {
  return Number(value >>> 0).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ');
}

function UpdateLetters({ w, letters, base, clock, k, hsBefore, hs, masterClock, lastClock, result }) {
  let execute = clock%113 === 0;

  let a = letters[0];
  let b = letters[1];
  let c = letters[2];
  let d = letters[3];
  let e = letters[4];
  let f = letters[5];
  let g = letters[6];
  let h = letters[7];

  let rotate2 = rotateRight(a, 2) >>> 0;
  let rotate13 = rotateRight(a, 13) >>> 0;
  let rotate22 = rotateRight(a, 22) >>> 0;
  let sigmaUpper0 = (rotate2 ^ rotate13 ^ rotate22) >>> 0;
  let maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
  let temp2 = (sigmaUpper0 + maj)%(2**32);

  let rotate6 = rotateRight(e, 6) >>> 0;
  let rotate11 = rotateRight(e, 11) >>> 0;
  let rotate25 = rotateRight(e, 25) >>> 0;
  let sigmaUpper1 = (rotate6 ^ rotate11 ^ rotate25) >>> 0;

  let choice = ((e & f) ^ ((~e) & g)) >>> 0;

  let kIndex = clock - 51;
  let temp1 = (h + sigmaUpper1 + choice + k[kIndex+1] + w[kIndex+1])%(2**32);

  return (
    <div className="mb-3">
      <ReactTooltip />
      <div className="flex">
        <div className="w-32 mr-3">
          <div>Temp1</div>
          <div className="border-b border-transparent">Temp2</div>
          <div className="mb-2">Temp1 + Temp2 =</div>
          <div>d</div>
          <div className="border-b border-transparent">Temp1</div>
          <div>d + Temp1 =</div>
        </div>

        <div>
          <div>{ decimalToBinary(temp1).padStart(32, '0') }</div>
          <div className="border-b">{ decimalToBinary(temp2).padStart(32, '0') } +</div>
          <div className="mb-2">{ decimalToBinary(((temp1 + temp2) >>> 0)%(2**32)).padStart(32, '0') }</div>
          <div>{ decimalToBinary(d).padStart(32, '0') }</div>
          <div className="border-b">{ decimalToBinary(temp1).padStart(32, '0') } +</div>
          <div className="mb-2">{ decimalToBinary(((d + temp1) >>> 0)%(2**32)).padStart(32, '0') }</div>
        </div>
      </div>

      <h2 className="font-bold my-1 text-indigo-200">
        { execute && <div>Update hash values</div> || <div>Update working variables</div> }
      </h2>
      <div className="flex">
        <div className="flex">
          <div className="mr-3 w-8">
            <div>a =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h0 </div><div>h0 = </div></div>}
            <div>b =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h1 </div><div>h1 = </div></div>}
            <div>c =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h2 </div><div>h2 = </div></div>}
            <div>d =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h3 </div><div>h3 = </div></div>}
            <div>e =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h4 </div><div>h4 = </div></div>}
            <div>f =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h5 </div><div>h5 = </div></div>}
            <div>g =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h6 </div><div>h6 = </div></div>}
            <div>h =</div>
            { execute && <div className="mb-1"><div className="border-b border-transparent">h7 </div><div>h7 = </div></div>}
          </div>
          <div className="mr-3">
            <div data-tip={displayHex((temp1 + temp2)%(2**32))}>{ decimalToBinary(((temp1 + temp2) >>> 0)%(2**32)).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[0]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[0]).padStart(32, '0') }</div>
              </div>
            }

            <div data-tip={displayHex(a)} className="text-fuchsia-500">{ decimalToBinary(a).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[1]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[1]).padStart(32, '0') }</div>
              </div>
            }

            <div className="text-lime-500">{ decimalToBinary(b).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[2]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[2]).padStart(32, '0') }</div>
              </div>
            }

            <div className="text-orange-500">{ decimalToBinary(c).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[3]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[3]).padStart(32, '0') }</div>
              </div>
            }

            <div>{ decimalToBinary(((d + temp1) >>> 0)%(2**32)).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[4]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[4]).padStart(32, '0') }</div>
              </div>
            }

            <div className="text-green-500">{ decimalToBinary(e).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[5]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[5]).padStart(32, '0') }</div>
              </div>
            }

            <div className="text-red-500">{ decimalToBinary(f).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[6]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[6]).padStart(32, '0') }</div>
              </div>
            }

            <div className="text-indigo-500">{ decimalToBinary(g).padStart(32, '0') }</div>
            { execute &&
              <div>
                <div className="border-b">{ decimalToBinary(hsBefore[7]).padStart(32, '0') }</div>
                <div className="mb-1">{ decimalToBinary(hs[7]).padStart(32, '0') }</div>
              </div>
            }

          </div>
          <div className="mr-3 w-">
            <div>= Temp1 + Temp2</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[0]) }</span></div></div>}
            <div>&nbsp;</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[1]) }</span></div></div>}
            <div>&nbsp;</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[2]) }</span></div></div>}
            <div>&nbsp;</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[3]) }</span></div></div>}
            <div>= d + Temp1</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[4]) }</span></div></div>}
            <div>&nbsp;</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[5]) }</span></div></div>}
            <div>&nbsp;</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[6]) }</span></div></div>}
            <div>&nbsp;</div>
            { execute && <div className="mb-1"><div>+</div><div>─► <span className="text-white border px-1 rounded">{ displayHex(hs[7]) }</span></div></div>}
          </div>
        </div>
      </div>
      { execute && lastClock() === masterClock &&
        <div className="mt-4 mb-8">
          <h2 className='font-bold my-1 text-indigo-200'>Sha256</h2>
          <div>{ result }</div>
        </div>
      }
    </div>
  );
}

export default UpdateLetters;
