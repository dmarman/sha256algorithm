import Temp1 from "../components/Temp1";
import Majority from "../components/Majority";
import Temp2 from "../components/Temp2";
import UpdateLetters from "../components/UpdateLetters";
import Choice from "../components/Choice";
import SigmaUpper from "./SigmaUpper";

function CompressionCalculation({ letters, clock, wView, base, k, lastClock, hsBefore, hs, masterClock, result }) {
  let execute = masterClock === lastClock();

  function active(clock) {
    return '';
    return clock === lastClock() && 'hidden';
  }

  return (
    <div className={ `duration-500 ${ active(clock) }` }>
      {clock < 50 && clock >= 0 ? null :
        <div className="mt-5 flex">
          <div className="mr-1 mt-[7px]">
            <br/><br/><br/><br/>
            <div>&nbsp;&nbsp;┌─</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;▼</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;│</div>
            <div>┌─┼─</div>
            <div>│ │</div>
            <div>▼ │</div>
            <div>│ └─</div>
            <div>└───</div>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/><br/>
            <div className="mt-[0px]">┌───</div>
            <div>│&nbsp;&nbsp;</div>
            <div>│&nbsp;&nbsp;</div>
            <div>│&nbsp;&nbsp;</div>
            <div>▼&nbsp;&nbsp;</div>
            <div>│&nbsp;&nbsp;</div>
            <div>│ ┌─</div>
            <div>│ ▼</div>
            <div>│ └─</div>
            <div>└───</div>
            <br/><br/><br/><br/>
            <div className="mt-[2px]">&nbsp;&nbsp;┌─</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;▼</div>
            <div>&nbsp;&nbsp;│</div>
            <div>┌─┼─</div>
            <div>│ │</div>
            <div>▼ │</div>
            <div>│ └─</div>
            <div>│</div>
            <div>│</div>
            { execute && <div><div>│</div><div>│</div><div>│</div><div>│</div><div>│</div><div>│</div><div className="mt-[3px]">│</div></div> }
            <div>└───</div>
          </div>
          <div>
            <SigmaUpper letterValue={letters[4]} letter={'e'} base={base} clock={clock} clockShift={15} rotations={[6, 11, 25]} sigmaIndex={1} color={'green'} backgroundColor={'green'} />
            <Choice letters={letters} base={base} />
            <Temp1 letters={letters} w={wView} base={base} k={k} clock={clock} />
            <SigmaUpper letterValue={letters[0]} letter={'a'} base={base} clock={clock} clockShift={15} rotations={[2, 13, 22]} sigmaIndex={0} color={'fuchsia'} backgroundColor={'#512565'} />
            <Majority letters={letters} base={base} />
            <Temp2 w={wView} letters={letters} base={base} />

            <UpdateLetters w={wView} letters={letters} base={base} clock={clock} k={k} hsBefore={hsBefore} hs={hs} lastClock={lastClock} masterClock={masterClock} result={result}/>
          </div>
        </div>
      }
    </div>
  );
}

export default CompressionCalculation;
