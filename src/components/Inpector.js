import { decimalToBinary } from '../classes/utils'

function Inspector({ data, base, labels = [], pointer }) {

  function focusClass(key, pointer) {
    //console.log(key)
    //if(pointer < 2) return 'border-transparent';
    if(pointer === key)      return 'rounded border border-white';
    if(pointer - 15 === key) return 'rounded border border-red-500';
    if(pointer - 2 === key)  return 'rounded border border-green-500';

    return 'border-transparent'
  }
  return (
    <div className="hello">
      {base === 'bin' && data.map((word, key) =>
        <div className="flex">
          {Array.isArray(labels) ?
            <span className="mr-2 font-bold text-green-600">{labels && labels[key]}</span> :
            <span className="mr-2 font-bold text-green-600 w-5">
              <span>{labels}</span>
              <span style={{fontSize: '8px'}}>{key}</span>
            </span>
          }
          <div key={(key).toString()} className={'px-1 '}>
            {
              decimalToBinary(word).padStart(32, '0').match(new RegExp('.{1,' + 32 + '}', 'g')).join(' ')
            }
          </div>
        </div>
      )}

      {base === 'hex' && data.map((word, key) =>
        <div className="flex">
          {Array.isArray(labels) ?
            <span className="mr-2 font-bold text-green-600">{labels && labels[key]}</span> :
            <span className="mr-2 font-bold text-green-600 w-5">
              <span>{labels}</span>
              <span style={{fontSize: '8px'}}>{key}</span>
            </span>
          }

          <div key={(key).toString()} className={'border px-1 ' + focusClass(key, pointer)}>
            {
              Number(word).toString(16).padStart(8, '0').match(new RegExp('.{1,' + 2 + '}', 'g')).join(' ')
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Inspector;
