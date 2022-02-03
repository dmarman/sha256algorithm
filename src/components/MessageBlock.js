import { decimalToBinary, chunkString } from '../classes/utils'

function MessageBlock({ data, base, clock, chunksLoop }) {
  if(base === 'hex') data = chunkString(data, 32).map(value => parseInt(value, 2).toString(16).padStart(8, '0'));
  if(base === 'bin') data = chunkString(data, 32).map(value => parseInt(value, 2));

  return (
    <div className={`duration-500 ${clock > 1 && 'opacity-25'}`}>
      <h2 className={'font-bold my-1 text-indigo-200'}>Message block</h2>
      {base === 'bin' && data.map((word, key) =>
        <div key={(key).toString()}>
          {
            decimalToBinary(word).padStart(32, '0').match(new RegExp('.{1,' + 8 + '}', 'g')).join(' ')
          }
            <span className={(clock === 1 && key < chunksLoop*16 && key >= (chunksLoop - 1)*16) ? 'ml-1' : 'ml-1 opacity-0'}>►</span>
        </div>
      )}
    </div>
  );
}

export default MessageBlock;
