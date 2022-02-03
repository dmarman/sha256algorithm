import { decimalToBinary } from '../classes/utils'
import { rotateRight } from '../classes/utils'

function SigmaUpper({ letterValue, letter, base, clock, clockShift, rotations, sigmaIndex, color, backgroundColor }) {
  let input = letterValue;
  let rotate1 = rotateRight(input, rotations[0]) >>> 0;
  let rotate2 = rotateRight(input, rotations[1]) >>> 0;
  let rotate3 = rotateRight(input, rotations[2]) >>> 0;
  let xor = (rotate1 ^ rotate2 ^ rotate3) >>> 0;

  return (
    <div className="mb-3">
      <div className="flex">
        <div className="mr-3 w-32">
          <div className={`text-${color}-500 mr-1 mb-1`}>
            <span>{letter}</span>
          </div>
          <div>right rotate {rotations[0]}</div>
          <div>right rotate {rotations[1]}</div>
          <div>right rotate {rotations[2]}</div>
          <div className="mt-1">Σ{sigmaIndex}:</div>
        </div>
        { base === 'bin' &&
          <div className="mr-3">
            <div className={`mb-1 border-b text-${color}-500`}>
              { decimalToBinary(input).padStart(32, '0') }
            </div>
            <div style={{background: `repeating-linear-gradient(to right, #ffffff00 0 ${rotations[0]}ch, ${backgroundColor} ${rotations[0]}ch 32ch)`}}>
              { decimalToBinary(rotate1).padStart(32, '0') }
            </div>
            <div style={{background: `repeating-linear-gradient(to right, #ffffff00 0 ${rotations[1]}ch, ${backgroundColor} ${rotations[1]}ch 32ch)`}}>
              { decimalToBinary(rotate2).padStart(32, '0') } XOR
            </div>
            <div style={{background: `repeating-linear-gradient(to right, #ffffff00 0 ${rotations[2]}ch, ${backgroundColor} ${rotations[2]}ch 32ch)`}} className="border-b">
              { decimalToBinary(rotate3).padStart(32, '0') } XOR
            </div>
            <div className="mt-1">
              { decimalToBinary(xor).padStart(32, '0') }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default SigmaUpper;
