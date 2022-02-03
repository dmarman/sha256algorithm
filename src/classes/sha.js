// https://qvault.io/cryptography/how-sha-2-works-step-by-step-sha-256/
// https://en.wikipedia.org/wiki/SHA-2


function stringToBinary(string) {
  string = string.toString()
  return string.split('').map(function (char) {
    return char.charCodeAt(0).toString(2).padStart(8, '0')
  }).join('')
}

function decimalToBinary(decimal) {
  return Number(decimal).toString(2)
}

function appendOneBit(input) {
  return input + 1;
}

function isMultipleOf512(input) {
  return input%512 === 0 ? true : false;
}

function calculateK(L) {
  let K = 0
  while (!isMultipleOf512(L + 1 + K + 64)) {
    K++
  }
  return K
}

function return64Bit(number) {
  return number.padStart(64, '0')
}

function padding(input) {
  input = stringToBinary(input)
  let L = input.length;
  let K = calculateK(L);
  let L64 = return64Bit(decimalToBinary(L))

  return appendOneBit(input) + L64.padStart(K + 64, '0')
}

function chunkString(str, length = 512) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'))
}

function rotateRight(value, r) { // https://github.com/dfrankland/bitwise-rotation/blob/master/src/index.js
  const bitWidth = 32;
  const rotation = r & (bitWidth - 1)
  const bitMask = (2 ** bitWidth) - 1
  return (
    (value >>> rotation) |
    ((value << (bitWidth - rotation)) & bitMask)
  ); // Change from signed to unsigned
}

export function sha256(message) {
  let k = new Array
  (
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
    -1866530822, -1538233109, -1090935817, -965641998
  );

  let h0 = 0x6a09e667
  let h1 = 0xbb67ae85
  let h2 = 0x3c6ef372
  let h3 = 0xa54ff53a
  let h4 = 0x510e527f
  let h5 = 0x9b05688c
  let h6 = 0x1f83d9ab
  let h7 = 0x5be0cd19

  chunkString(padding(message)).forEach((chunk) => { // break message into 512-bit chunks
    let w = new Array(64).fill('0'.padStart(32, '0')); // create a 64-entry message schedule array w[0..63] of 32-bit words
    //let w = new Uint32Array(64);

    chunkString(chunk, 32).forEach((messageWord, i) => {
      w[i] = parseInt(messageWord, 2)
    })

    for(let i = 16; i <= 63; i++) {
      let s0 = (rotateRight(w[i-15], 7) ^ rotateRight(w[i-15], 18) ^ (w[i-15] >>> 3)) >>> 0;
      let s1 = (rotateRight(w[i-2], 17) ^ rotateRight(w[i-2], 19) ^ (w[i-2] >>> 10)) >>> 0;
      w[i] = (w[i-16] + s0 + w[i-7] + s1)%(2**32)
    }

    // let ab = w.map(x => decimalToBinary(x))
    let a = h0
    let b = h1
    let c = h2
    let d = h3
    let e = h4
    let f = h5
    let g = h6
    let h = h7

    for(let i = 0; i <= 63; i++) { //63
      let S1 = (rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25)) >>> 0
      let ch = (e & f) ^ ((~e) & g) >>> 0;
      let temp1 = (h + S1 + ch + k[i] + w[i])%(2**32)
      let S0 = (rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22)) >>> 0
      let maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0
      let temp2 = (S0 + maj)%(2**32)

      h = g
      g = f
      f = e
      e = (d + temp1)%(2**32)
      d = c
      c = b
      b = a
      a = (temp1 + temp2)%(2**32)
    }

    h0 = (h0 + a)%(2**32)
    h1 = (h1 + b)%(2**32)
    h2 = (h2 + c)%(2**32)
    h3 = (h3 + d)%(2**32)
    h4 = (h4 + e)%(2**32)
    h5 = (h5 + f)%(2**32)
    h6 = (h6 + g)%(2**32)
    h7 = (h7 + h)%(2**32)
  })

  return h0.toString(16).padStart(8, '0')
    + h1.toString(16).padStart(8, '0')
    + h2.toString(16).padStart(8, '0')
    + h3.toString(16).padStart(8, '0')
    + h4.toString(16).padStart(8, '0')
    + h5.toString(16).padStart(8, '0')
    + h6.toString(16).padStart(8, '0')
    + h7.toString(16).padStart(8, '0')
}
