import { decimalToBinary, chunkString } from '../classes/utils'

function MessageBlock({ data, base, clock, chunksLoop }) {
  data = chunkString(data, 32).map(value => parseInt(value, 2));

  function length(key) {
    if(key > data.length - 3) return 'text-green-500'
  }

  return (
    <div className={`duration-500 ${clock > 1 && 'opacity-25'} ${clock >= 3 && 'hidden'}`}>
      <h2 className={'font-bold my-1 text-indigo-200'}>Message block - {data.length*32} Bits</h2>
      { data.map((word, key) =>
        <div key={(key).toString()} className={length(key)}>
          { decimalToBinary(word).padStart(32, '0').match(new RegExp('.{1,' + 8 + '}', 'g')).join(' ') }
          <span className={(clock === 1 && key < chunksLoop*16 && key >= (chunksLoop - 1)*16) ? 'ml-1' : 'ml-1 opacity-0'}>►</span>
        </div>
      )}
    </div>
  );
}

export default MessageBlock;
