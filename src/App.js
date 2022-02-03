import './App.css';
import React, { useState, useEffect } from 'react';
import { padding, chunkString, rotateRight, stringToBinary, binaryToString } from './classes/utils'

import MessageBlock from "./components/MessageBlock";
import MessageSchedule from "./components/MessageSchedule";
import { sha256 } from "./classes/sha"
import Hs from "./components/Hs";
import Constants from "./components/Constants";

import MessageScheduleCalculation from "./components/MessageScheduleCalculation";
import CompressionCalculation from "./components/CompressionCalculation";
import ButtonBack from "./components/ButtonBack";
import ButtonBackFast from "./components/ButtonBackFast";
import ButtonInit from "./components/ButtonBackInit";
import ButtonClock from "./components/ButtonClock";
import ButtonClockFast from "./components/ButtonClockFast";
import ButtonClockFinish from "./components/ButtonClockFinish";
import ButtonAutoClock from "./components/ButtonAutoClock";
import BeforeLetters from "./components/BeforeLetters";

function App() {
  const [result, setResult] = useState('');
  const [base, setBase] = useState('bin');
  const [inputBase, setInputBase] = useState('text');
  const [paddedInput, setPaddedInput] = useState('0');
  const [wView, setWView] = useState(new Array(64).fill('0'.padStart(32, '0')));
  const [letters, setLetters] = useState([]);
  const [lettersBefore, setLettersBefore] = useState([]);
  const [hs, setHs] = useState([]);
  const [hsBefore, setHsBefore] = useState([]);
  const [clock, setClock] = useState(0);
  const [input, setInput] = useState('');
  const [inputPlaceholder, setInputPlaceholderInput] = useState('Input...');
  const [chunksCount, setChunksCount] = useState(1);
  const [flash, setFlash] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [fakeStep, setFakeStep] = useState(0);

  const k = [
    1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
    -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
    1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
    -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
    -1866530822, -1538233109, -1090935817, -965641998];

  useEffect(() => {
    if(clock !== lastClock() && autoplay) {
      const interval = setInterval(() => {
        onClock()
      }, 50);
      return () => clearInterval(interval);
    }

    setAutoplay(false)
  }, [clock, fakeStep]);

  useEffect(() => {
    setPaddedInput(padding('', inputBase))
  }, []);

  function onAutoClock() {
    setAutoplay(!autoplay);
    onClock();
  }

  function onClock() {
    if(fakeStep === 0 || true) {
      if (clock < lastClock()) setClock(clock + 1);
      let result = shaStepped(input, firstLoop(clock), secondLoop(clock), chunksLoop(clock));

      setWView(result.w);
      setResult(result.hash);
      setHs(result.hs);
      setHsBefore(result.hsBefore);
      setLetters(result.letters);
      setLettersBefore(result.lettersBefore);

      setFakeStep(fakeStep + 1)
    }else {
      setFakeStep(0);
    }

    setFlash(true);
    setTimeout(() => {
      setFlash(false)
    }, 200)
  }

  function onInputChange(value) {
    if(inputBase ===  'bin' && !['0', '1', ''].includes(value.substr(-1))) return;
    if(clock > lastClock()) setClock(lastClock());

    setInput(value);
    setPaddedInput(padding(value, inputBase));

    if(clock === 0) value = '';
    let result = shaStepped(value, firstLoop(clock), secondLoop(clock), chunksLoop(clock));

    setWView(result.w);
    setResult(result.hash);
    setHs(result.hs);
    setHsBefore(result.hsBefore);
    setLetters(result.letters);
    setLettersBefore(result.lettersBefore);
  }

  function onClockFast() {
    if(clock + 10 > lastClock()) return;
    setClock(clock + 10);
    let result = shaStepped(input, firstLoop(clock + 9), secondLoop(clock + 9), chunksLoop(clock));

    setWView(result.w);
    setResult(result.hash);
    setLetters(result.letters);
    setLettersBefore(result.lettersBefore);
    setHs(result.hs);
    setHsBefore(result.hsBefore);
  }

  function onClockBackFast() {
    if(clock < 10) return;

    if(clock < lastClock()) setClock(clock - 10);
    let result = shaStepped(input, firstLoop(clock - 11), secondLoop(clock - 11), chunksLoop(clock));

    setWView(result.w);
    setResult(result.hash);
    setLetters(result.letters);
    setLettersBefore(result.lettersBefore);
    setHs(result.hs);
    setHsBefore(result.hsBefore);
  }

  function onClockBack() {
    if(clock === 0) return;
    if(clock <= lastClock()) setClock(clock - 1);
    let value = input;
    if(clock === 1) value = '';
    let result = shaStepped(value, firstLoop(clock - 2), secondLoop(clock - 2), chunksLoop(clock));

    setWView(result.w);
    setResult(result.hash);
    setLetters(result.letters);
    setLettersBefore(result.lettersBefore);
    setHs(result.hs);
    setHsBefore(result.hsBefore);
  }

  function firstLoop(clock) {
    let step = clock%115;

    if(step + 16 < 64) return 15 + step;

    return 63
  }

  function secondLoop(clock) {
    let step = clock%115;
    if(step >= 49 && step < 113) return step - 49;
    if(step >= 113) return 63;
    return 0
  }

  function chunksLoop(clock) {
    return Math.floor(clock/115) + 1;
  }

  function onInputBaseChange(value) {
    setInputBase(value);

    if(value === 'bin') {
      setInput(stringToBinary(input));
      setInputPlaceholderInput('10101...');
    }

    if(value === 'text') {
      setInput(binaryToString(input));
      if(binaryToString(input) === '\x00') setInput('')
      setInputPlaceholderInput('Input...');
    }
  }

  function onClockFinish() {
    setClock(lastClock());
    let result = shaStepped(input, firstLoop(113), secondLoop(113), chunksLoop(clock));

    setWView(result.w);
    setResult(result.hash);
    setLetters(result.letters);
    setLettersBefore(result.lettersBefore);
    setHs(result.hs);
    setHsBefore(result.hsBefore);
  }

  function onClockInit() {
    setClock(0);
    let result = shaStepped('s', firstLoop(0), secondLoop(0), chunksLoop(clock));

    setWView(result.w);
    setResult(result.hash);
    setLetters(result.letters);
    setLettersBefore(result.lettersBefore);
    setHs(result.hs);
    setHsBefore(result.hsBefore);
  }

  function lastClock() {
    if(chunksCount === 1) return 113;
    return 114*chunksCount;
  }

  function shaStepped(message, firstLoop, secondLoop, chunksLoop) {
    let h0 = 0x6a09e667; let h1 = 0xbb67ae85; let h2 = 0x3c6ef372; let h3 = 0xa54ff53a; let h4 = 0x510e527f; let h5 = 0x9b05688c; let h6 = 0x1f83d9ab; let h7 = 0x5be0cd19;
    let s0, s1, S1, S0, a, b, c, d, e, f, g, h, ch, temp1, temp2, maj = 0;
    let w = [];
    let hsBefore = [];
    let lettersBefore = [];
    let input = padding(message, inputBase);
    let chunks = chunkString(input);

    setChunksCount(chunks.length);

    for(let n = 0; n < chunksLoop; n++) {
      let chunk = chunks[n];

      w = new Array(64).fill('0'.padStart(32, '0'));

      chunkString(chunk, 32).forEach((messageWord, i) => {
        w[i] = parseInt(messageWord, 2)
      });

      for(let i = 16; i <= firstLoop; i++) { //63
        s0 = (rotateRight(w[i-15], 7) ^ rotateRight(w[i-15], 18) ^ (w[i-15] >>> 3)) >>> 0;
        s1 = (rotateRight(w[i-2], 17) ^ rotateRight(w[i-2], 19) ^ (w[i-2] >>> 10)) >>> 0;
        w[i] = (w[i-16] + s0 + w[i-7] + s1)%(2**32)
      }

      a = h0; b = h1; c = h2; d = h3; e = h4; f = h5; g = h6; h = h7;

      for(let i = 0; i <= secondLoop; i++) { // 63
        S1 = (rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25)) >>> 0;
        ch = (e & f) ^ ((~e) & g) >>> 0;
        temp1 = (h + S1 + ch + k[i] + w[i])%(2**32) >>> 0;
        S0 = (rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22)) >>> 0;
        maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
        temp2 = (S0 + maj)%(2**32) >>> 0;

        lettersBefore = [a, b, c, d, e, f, g, h];

        h = g >>> 0;
        g = f >>> 0;
        f = e >>> 0;
        e = (d + temp1)%(2**32);
        d = c >>> 0;
        c = b >>> 0;
        b = a >>> 0;
        a = (temp1 + temp2)%(2**32);
      }

      hsBefore = [h0, h1, h2, h3, h4, h5, h6, h7];

      h0 = (h0 + a)%(2**32);
      h1 = (h1 + b)%(2**32);
      h2 = (h2 + c)%(2**32);
      h3 = (h3 + d)%(2**32);
      h4 = (h4 + e)%(2**32);
      h5 = (h5 + f)%(2**32);
      h6 = (h6 + g)%(2**32);
      h7 = (h7 + h)%(2**32);
    }

    let hash = h0.toString(16).padStart(8, '0') + h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0') + h3.toString(16).padStart(8, '0') + h4.toString(16).padStart(8, '0') + h5.toString(16).padStart(8, '0') + h6.toString(16).padStart(8, '0') + h7.toString(16).padStart(8, '0')
    return { w, s0, s1, S1, ch, temp1, S0, maj, temp2, letters: [a, b, c, d, e, f, g, h], hash, chunks, hs: [h0, h1, h2, h3, h4, h5, h6, h7], hsBefore, lettersBefore };
  }
  return (
    <div className="App font-mono text-xs text-indigo-300 px-2 leading-3 bg-gray-900 h-screen transition">
      <div className="flex w-full">
        <div className="w-full">
          <div className="hidden">
            <div>12037465</div>
            <div>665782</div>
          </div>
          <div className="flex">
            <select value={inputBase} onChange={e => onInputBaseChange(e.target.value)} className="bg-gray-700 my-2 py-2 px-3 rounded mr-2 cursor-pointer hover:bg-gray-600 transition">
              <option value="text">Text</option>
              <option value="bin">Bin</option>
            </select>
            <input type="text" className="bg-gray-700 my-2 w-full py-2 px-3 mr-2 rounded" value={input} onChange={e => onInputChange(e.target.value)} placeholder={inputPlaceholder}/>
            <select value={base} onChange={e => setBase(e.target.value)} className="bg-gray-700 my-2 py-2 px-3 rounded mr-2 cursor-pointer hover:bg-gray-600 transition hidden">
              <option value="hex">Hex</option>
              <option value="bin">Bin</option>
            </select>
          </div>
        </div>
        <div className="w-full mt-2">
          <ButtonInit onClockInit={onClockInit} clock={clock} />
          <ButtonBackFast onClockBackFast={onClockBackFast} clock={clock} />
          <ButtonBack onClockBack={onClockBack} clock={clock} />
          <ButtonClock onClock={onClock} clock={clock} lastClock={lastClock} />
          <ButtonAutoClock onAutoClock={onAutoClock} clock={clock} lastClock={lastClock} autoplay={autoplay} />
          <ButtonClockFast onClockFast={onClockFast} clock={clock} lastClock={lastClock} />
          <ButtonClockFinish onClockFinish={onClockFinish} clock={clock} lastClock={lastClock} />
        </div>
      </div>

      <div className="flex">
        <div className="col pr-1">
            <MessageBlock data={paddedInput} base={base} clock={clock%115} chunksLoop={chunksLoop(clock)}/>
        </div>
        <div className="col pr-">
            <MessageSchedule data={wView} base={base} labels={'w'} clock={clock%115}/>
        </div>
        <div className="col pr-4">
          <div className="pr-4">
            <div>
              <Hs hs={hsBefore} base={base} clock={clock%115} />
              <MessageScheduleCalculation letters={letters} clock={clock%115} wView={wView} base={base} k={k}/>
              <CompressionCalculation letters={lettersBefore} clock={clock%115} wView={wView} base={base} k={k} flash={flash} lastClock={lastClock} hsBefore={hsBefore} hs={hs} masterClock={clock} />
            </div>
            <div className="flex mt-12">
              <div className="mx-2 hidden">
                <h2 className='font-bold my-1 text-indigo-200'>Sha256</h2>
                <div>{result}</div>
                <div>{sha256(input)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <BeforeLetters letters={lettersBefore} base={base} clock={clock%115} labels={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ]} />
          <Constants k={k} clock={clock%115}/>
        </div>
      </div>
    </div>
  );
}

export default App;
