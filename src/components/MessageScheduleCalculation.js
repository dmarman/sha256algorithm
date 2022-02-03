import Sigma from "../components/Sigma";
import WordResult from "../components/WordResult";

function MessageScheduleCalculation({ letters, clock, wView, base, k }) {

  function active(clock) {
    return clock < 2 && 'opacity-25';
  }

  return (
    <div className={ `duration-500 ${ active(clock) }` }>
      {clock < 50 && clock >= 0 ?
        <div className="mt-5 flex">
          <div className="mr-1">
            <br/><br/><br/><br/><br/>
            <div>&nbsp;&nbsp;┌─</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;▼</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;│</div>
            <div>&nbsp;&nbsp;│</div>
            <div>┌─┼─</div>
            <div>│ │</div>
            <div>│ │</div>
            <div>▼ │</div>
            <div>│ └─</div>
            <div>│</div>
            <div>└───</div>
          </div>
          <div>
            <Sigma sigmaIndex={0} w={wView} clock={clock + 15} base={base} rotations={[7, 18]} shift={3} clockShift={16} color={'red'} backgroundColor={'#6f272b'} />
            <Sigma sigmaIndex={1} w={wView} clock={clock + 15} base={base} rotations={[17, 19]} shift={10} clockShift={3} color={'green'} backgroundColor={'#18663f'} />
            <WordResult w={wView} firstLoop={clock + 15} base={base} />
          </div>
        </div> : null
      }
    </div>
  );
}

export default MessageScheduleCalculation;
