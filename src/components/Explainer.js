import { paddingExplained, ordinal } from '../classes/utils';

function Explainer({ clock, input, inputBase, chunksCount, lastClock, masterClock }) {
  let messageBlock = paddingExplained(input, inputBase);

  return (
    <div className="mt-4 pr-2 leading-4 text-gray-400">
      { clock === 0 &&
        <div>
          { inputBase === 'text' && <p className="pb-2">1. Encode the input to binary using UTF-8 and append a single '1' to it.</p> }
          { inputBase === 'bin' && <p className="pb-2">1. Append a single '1' to the input.</p> }
          <p className="pb-2">2. Prepend that binary to the <i>message block</i>.</p>
          <p className="pb-2">3. Append the original message length (<span className='text-green-500'>{ messageBlock.LBinary }</span>, { messageBlock.L } in decimal) at the end of the <i>message block</i> as a <span className='text-green-500'>64-bit big-endian integer.</span></p>
          <p className="pb-2">4. Add { messageBlock.K } zeros between the encoded message and the length integer so that the <i>message block</i> is a multiple of 512.
            In this case { messageBlock.L } + 1 + { messageBlock.K } + 64 = { messageBlock.result.length }</p>
          <div className="pt-8">
            <div>How-to:</div>

            <div className="flex ml-1 mt-2 items-center">
              <div className="mr-2">
                <div className="border opacity-50 rounded px-2 py-1">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2.66667V13.3333L16.6667 8.00001L8 2.66667Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 2.67V13.34" stroke="white" strokeWidth="1.33" strokeLinecap="round"/>
                    <path d="M2 2.67V13.34" stroke="white" strokeWidth="1.33" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div>Advance 1 step.</div>
            </div>

            <div className="flex ml-1 mt-2 items-center">
              <div className="mr-2">
                <div className="border opacity-50 rounded px-2 py-1">
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 13.3333L10 2.66666L1.33333 7.99999L10 13.3333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 13.33L13 2.66" stroke="white" strokeWidth="1.33" strokeLinecap="round"/>
                    <path d="M16 13.33V2.66" stroke="white" strokeWidth="1.33" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div>Go back 1 step.</div>
            </div>

            <div className="flex ml-1 mt-2 items-center">
              <div className="mr-2">
                <div className="border opacity-50 rounded px-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-play" width="16"
                       height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round"
                       strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 4v16l13 -8z"/>
                  </svg>
                </div>
              </div>
              <div>Run automatically step by step.</div>
            </div>

            <div className="flex ml-1 mt-2 items-center">
              <div className="mr-2 flex">
                <div className="border opacity-50 rounded px-2 py-1 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-track-prev"
                       width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none"
                       strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M21 5v14l-8 -7z"/>
                    <path d="M10 5v14l-8 -7z"/>
                  </svg>
                </div>
                <div className="border opacity-50 rounded px-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-track-next"
                       width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none"
                       strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 5v14l8 -7z"/>
                    <path d="M14 5v14l8 -7z"/>
                  </svg>
                </div>
              </div>
              <div>Advance / go back 10 steps.</div>
            </div>

            <div className="flex ml-1 mt-2 items-center">
              <div className="mr-2">
                <div className="flex">
                  <div className="border opacity-50 rounded px-2 py-1 mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-skip-back" width="16"
                         height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round"
                         strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M20 5v14l-12 -7z"/>
                      <line x1="4" y1="5" x2="4" y2="19"/>
                    </svg>
                  </div>
                  <div className="border opacity-50 rounded px-2 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-skip-forward"
                         width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none"
                         strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 5v14l12 -7z"/>
                      <line x1="20" y1="5" x2="20" y2="19"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div>Step 0 / Last step.</div>
            </div>

          </div>
        </div>
      }
      { clock === 1 &&
        <div>
          <p className="pb-2">1. Break the <i>message block</i> into 512-bit chunks. In our case { chunksCount } chunk{ chunksCount > 1 && 's' }.</p>
          <p className="pb-2">2. Create a 64-entry <i>message schedule</i> array <b className="text-green-500">w[0..63]</b> of 32-bit words.</p>
          <p className="pb-2">3. Copy { ordinal(chunksCount) } chunk into 1st 16 words <b className="text-green-500">w[0..15]</b> of the <i>message schedule</i> array.</p>
        </div>
      }
      { (clock >= 2 && clock <= 49) &&
      <div>
        <p className="pb-2">1. Calculate:</p>
        <p className="pb-2">
          <b className="text-white">w{ clock + 14 }</b> = <b className="text-blue-500">w{ clock - 2 }</b> + σ0 + <b className="text-yellow-500">w{ clock + 7 }</b> + σ1
        </p>

        <p className="pb-2">where</p>
        <div className="pb-2">
          <div className="flex">
            <div className="mr-2">σ0 =</div>
            <div>(<b className="text-red-500">w{ clock - 1 }</b> rightrotate  7) xor <br/>(<b className="text-red-500">w{ clock - 1 }</b> rightrotate 18) xor <br/>(<b className="text-red-500">w{ clock - 1 }</b> rightshift  3)</div>
          </div>
        </div>
        <p className="pb-2">and</p>
        <div className="pb-2">
          <div className="flex">
            <div className="mr-2">σ1 =</div>
            <div>(<b className="text-green-500">w{ clock + 12 }</b> rightrotate  17) xor <br/>(<b className="text-green-500">w{ clock + 12 }</b> rightrotate 19) xor <br/>(<b className="text-green-500">w{ clock + 12 }</b> rightshift 10)</div>
          </div>
        </div>
      </div>
      }
      { clock === 50 &&
      <div>
        { masterClock === 50 &&
          <div>
            <p className="pb-2">1. <i>Initialize hash value</i> <b className="text-green-500">h0</b> to <b className="text-green-500">h7</b>: first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19).</p>
            <p className="pb-2">2. Initialize array of <i>K constants</i>: first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311</p>
          </div>
        }
        <p className="pb-2">3. Initialize <i>working variables</i> to <i>initial hash value</i>:</p>
        <div className="text-center pb-2">
          <p><span className="text-pink-500">  a</span> = <span className="text-green-500">h0</span></p>
          <p><span className="text-lime-500">  b</span> = <span className="text-green-500">h1</span></p>
          <p><span className="text-orange-500">c</span> = <span className="text-green-500">h2</span></p>
          <p><span className=""> d</span> = <span className="text-green-500">h3</span></p>
          <p><span className="text-green-500"> e</span> = <span className="text-green-500">h4</span></p>
          <p><span className="text-red-500">   f</span> = <span className="text-green-500">h5</span></p>
          <p><span className="text-indigo-500">g</span> = <span className="text-green-500">h6</span></p>
          <p><span className="text-purple-500">h</span> = <span className="text-green-500">h7</span></p>
        </div>
        <p className="pb-2">4. <i>Update working variables</i> as:</p>
        <div className="pb-2 w-32 mx-auto">
          <p><span className="">h</span> = <span className="text-indigo-500">g</span></p>
          <p><span className="">g</span> = <span className="text-red-500">f</span></p>
          <p><span className="">f</span> = <span className="text-green-500">e</span></p>
          <p><span className="">e</span> = <span className="">d + Temp1</span></p>
          <p><span className="">d</span> = <span className="text-orange-500">c</span></p>
          <p><span className="">c</span> = <span className="text-lime-500">b</span></p>
          <p><span className="">b</span> = <span className="text-fuchsia-500">a</span></p>
          <p><span className="">a</span> = <span className="">Temp1 + Temp2</span></p>
        </div>
        <div className="pb-2">
          <p className="pb-2">Where</p>
          <p className="pb-2">Temp1 = <span className="text-purple-500">h</span> + Σ1 + Choice + <span className="text-red-500">k{ clock - 50}</span> + <span className="text-yellow-500">w{ clock - 50}</span></p>
          <p className="pb-2">Temp2 = Σ0 + Majority</p>
          <div className="pb-2">
            <div className="flex">
              <div className="mr-2">Σ1 =</div>
              <div>(<span className="text-green-500">e</span> rightrotate  6) xor <br/>(<span className="text-green-500">e</span> rightrotate 11) xor <br/>(<span className="text-green-500">e</span> rightrotate  25)</div>
            </div>
          </div>
          <p className="pb-4">Choice = (<span className="text-green-500">e</span> and  <span className="text-red-500">f</span>) xor ((not <span className="text-green-500">e</span>) and <span className="text-indigo-500">g</span>)</p>
          <div className="pb-2">
            <div className="flex">
              <div className="mr-2">Σ0 =</div>
              <div>(<span className="text-fuchsia-500">a</span> rightrotate  2) xor <br/>(<span className="text-fuchsia-500">a</span> rightrotate 13) xor <br/>(<span className="text-fuchsia-500">a</span> rightrotate  22)</div>
            </div>
          </div>
          <div className="pb-2">
            <div className="flex">
              <div className="w-[110px]">Majority =</div>
              <div>(<span className="text-fuchsia-500">a</span> and <span className="text-lime-500">b</span>) xor (<span className="text-fuchsia-500">a</span> and <span className="text-orange-500">c</span>) xor (<span className="text-lime-500">b</span> and <span className="text-orange-500">c</span>)</div>
            </div>
          </div>
        </div>
      </div>
      }
      { clock > 50 && masterClock < lastClock &&
      <div>
        <p className="pb-2">1. <i>Update working variables</i> as:</p>
        <div className="pb-2 w-32 mx-auto">
          <p><span className="">h</span> = <span className="text-indigo-500">g</span></p>
          <p><span className="">g</span> = <span className="text-red-500">f</span></p>
          <p><span className="">f</span> = <span className="text-green-500">e</span></p>
          <p><span className="">e</span> = <span className="">d + Temp1</span></p>
          <p><span className="">d</span> = <span className="text-orange-500">c</span></p>
          <p><span className="">c</span> = <span className="text-lime-500">b</span></p>
          <p><span className="">b</span> = <span className="text-fuchsia-500">a</span></p>
          <p><span className="">a</span> = <span className="">Temp1 + Temp2</span></p>
        </div>
        <div className="pb-2">
          <p className="pb-2">Where</p>
          <p className="pb-2">Temp1 = <span className="text-purple-500">h</span> + Σ1 + Choice + <span className="text-red-500">k{ clock - 50}</span> + <span className="text-yellow-500">w{ clock - 50}</span></p>
          <p className="pb-2">Temp2 = Σ0 + Majority</p>
          <div className="pb-2">
            <div className="flex">
              <div className="mr-2">Σ1 =</div>
              <div>(<span className="text-green-500">e</span> rightrotate  6) xor <br/>(<span className="text-green-500">e</span> rightrotate 11) xor <br/>(<span className="text-green-500">e</span> rightrotate  25)</div>
            </div>
          </div>
          <p className="pb-4">Choice = (<span className="text-green-500">e</span> and  <span className="text-red-500">f</span>) xor ((not <span className="text-green-500">e</span>) and <span className="text-indigo-500">g</span>)</p>
          <div className="pb-2">
            <div className="flex">
              <div className="mr-2">Σ0 =</div>
              <div>(<span className="text-fuchsia-500">a</span> rightrotate  2) xor <br/>(<span className="text-fuchsia-500">a</span> rightrotate 13) xor <br/>(<span className="text-fuchsia-500">a</span> rightrotate  22)</div>
            </div>
          </div>
          <div className="pb-2">
            <div className="flex">
              <div className="w-[110px]">Majority =</div>
              <div>(<span className="text-fuchsia-500">a</span> and <span className="text-lime-500">b</span>) xor (<span className="text-fuchsia-500">a</span> and <span className="text-orange-500">c</span>) xor (<span className="text-lime-500">b</span> and <span className="text-orange-500">c</span>)</div>
            </div>
          </div>
        </div>

        { clock%113 !== 0 &&
          <div>
            <div>
              <div><span className="text-green-500">e</span> ───►┌───────┐</div>
              <div><span className="text-red-500">f</span> ───►│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div><span className="text-indigo-500">g</span> ───►│ Temp1 │</div>
              <div><span className="text-purple-500">h</span> ───►│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div><span className="text-red-500">k{ clock - 50 > 9 ? clock - 50 : '0' + (clock - 50).toString() }</span> ─►│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div><span className="text-yellow-500">w{ clock - 50 > 9 ? clock - 50 : '0' + (clock - 50).toString() }</span> ─►└───────┘</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ ─────► Updated a</div>
              <div><span className="text-fuchsia-500">a</span> ───►┌───────┐</div>
              <div><span className="text-lime-500">b</span> ───►│ Temp2 │</div>
              <div><span className="text-orange-500">c</span> ───►└───────┘</div>
            </div>
            <div className="mt-4">
              <div><span className="text-green-500">e</span> ───►┌───────┐</div>
              <div><span className="text-red-500">f</span> ───►│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div><span className="text-indigo-500">g</span> ───►│ Temp1 │</div>
              <div><span className="text-purple-500">h</span> ───►│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div><span className="text-red-500">k{ clock - 50 > 9 ? clock - 50 : '0' + (clock - 50).toString() }</span> ─►│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div><span className="text-yellow-500">w{ clock - 50 > 9 ? clock - 50 : '0' + (clock - 50).toString() }</span> ─►└───────┘</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ ─────► Updated e</div>
              <div><span className="text-purple-500">d</span> ───►────┘</div>
            </div>
          </div>
        }


        { clock%113 === 0 &&
          <div>
            <p className="pb-2">2. Add the <i>working variables</i> to the current <i>hash value</i>:</p>
            <div className="pb-2 w-32 mx-auto">
              <p><span className="">h0</span> = h0 + <span className="text-fuchsia-500">a</span></p>
              <p><span className="">h1</span> = h1 + <span className="text-lime-500">b</span></p>
              <p><span className="">h2</span> = h2 + <span className="text-orange-500">c</span></p>
              <p><span className="">h3</span> = h3 + <span className="">d</span></p>
              <p><span className="">h4</span> = h4 + <span className="text-green-500">e</span></p>
              <p><span className="">h5</span> = h5 + <span className="text-red-500">f</span></p>
              <p><span className="">h6</span> = h6 + <span className="text-indigo-500">g</span></p>
              <p><span className="">h7</span> = h7 + <span className="text-purple-500">h</span></p>
            </div>
          </div>
        }

      </div>
      }

      { masterClock === lastClock &&
      <div>
        <p className="pb-2">1. <i>Update working variables</i> as:</p>
        <div className="pb-2 w-32 mx-auto">
          <p><span className="">h</span> = <span className="text-indigo-500">g</span></p>
          <p><span className="">g</span> = <span className="text-red-500">f</span></p>
          <p><span className="">f</span> = <span className="text-green-500">e</span></p>
          <p><span className="">e</span> = <span className="">d + Temp1</span></p>
          <p><span className="">d</span> = <span className="text-orange-500">c</span></p>
          <p><span className="">c</span> = <span className="text-lime-500">b</span></p>
          <p><span className="">b</span> = <span className="text-fuchsia-500">a</span></p>
          <p><span className="">a</span> = <span className="">Temp1 + Temp2</span></p>
        </div>
        <div className="pb-2">
          <p className="pb-2">Where</p>
          <p className="pb-2">Temp1 = <span className="text-purple-500">h</span> + Σ1 + Choice + <span className="text-red-500">k{ clock - 50}</span> + <span className="text-yellow-500">w{ clock - 50}</span></p>
          <p className="pb-2">Temp2 = Σ0 + Majority</p>
          <div className="pb-2">
            <div className="flex">
              <div className="mr-2">Σ1 =</div>
              <div>(<span className="text-green-500">e</span> rightrotate  6) xor <br/>(<span className="text-green-500">e</span> rightrotate 11) xor <br/>(<span className="text-green-500">e</span> rightrotate  25)</div>
            </div>
          </div>
          <p className="pb-4">Choice = (<span className="text-green-500">e</span> and  <span className="text-red-500">f</span>) xor ((not <span className="text-green-500">e</span>) and <span className="text-indigo-500">g</span>)</p>
          <div className="pb-2">
            <div className="flex">
              <div className="mr-2">Σ0 =</div>
              <div>(<span className="text-fuchsia-500">a</span> rightrotate  2) xor <br/>(<span className="text-fuchsia-500">a</span> rightrotate 13) xor <br/>(<span className="text-fuchsia-500">a</span> rightrotate  22)</div>
            </div>
          </div>
          <div className="pb-2">
            <div className="flex">
              <div className="w-[110px]">Majority =</div>
              <div>(<span className="text-fuchsia-500">a</span> and <span className="text-lime-500">b</span>) xor (<span className="text-fuchsia-500">a</span> and <span className="text-orange-500">c</span>) xor (<span className="text-lime-500">b</span> and <span className="text-orange-500">c</span>)</div>
            </div>
          </div>
        </div>
        <p className="pb-2">2. Add the <i>working variables</i> to the current <i>hash value</i>:</p>
        <div className="pb-2 w-32 mx-auto">
          <p><span className="">h0</span> = h0 + <span className="text-fuchsia-500">a</span></p>
          <p><span className="">h1</span> = h1 + <span className="text-lime-500">b</span></p>
          <p><span className="">h2</span> = h2 + <span className="text-orange-500">c</span></p>
          <p><span className="">h3</span> = h3 + <span className="">d</span></p>
          <p><span className="">h4</span> = h4 + <span className="text-green-500">e</span></p>
          <p><span className="">h5</span> = h5 + <span className="text-red-500">f</span></p>
          <p><span className="">h6</span> = h6 + <span className="text-indigo-500">g</span></p>
          <p><span className="">h7</span> = h7 + <span className="text-purple-500">h</span></p>
        </div>
        <p className="pb-2">3. Append <i>hash values</i> to get final digest:</p>
        <p>Sha256 = h0 h1 h2 h3 h4 h5 h6 h7</p>
      </div>
      }
    </div>
  );
}

export default Explainer;
