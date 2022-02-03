export function stringToBinary(string) {
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(string);
  let result = [];

  byteArray.forEach((value) => {
     result.push(decimalToBinary(value).padStart(8, '0'));
  });

  return result.join('')
}

export function binaryToString(binary) {
  let decimal = chunkString(binary, 8).map(value => binaryToDecimal(value));
  let valueArray = new Uint8Array(decimal);
  const decoder = new TextDecoder('utf-8');

  return decoder.decode(valueArray)
}

export function decimalToBinary(decimal) {
  return Number(decimal).toString(2)
}

export function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}

export function appendOneBit(input) {
  return input + 1;
}

export function isMultipleOf512(input) {
  return input%512 === 0;
}

export function calculateK(L) {
  let K = 0;
  while (!isMultipleOf512(L + 1 + K + 64)) {
    K++
  }
  return K
}

export function return64Bit(number) {
  return number.padStart(64, '0')
}

export function padding(input, base = 'text') {
  if(base === 'text') input = stringToBinary(input);
  let L = input.length;
  let K = calculateK(L);
  let L64 = return64Bit(decimalToBinary(L))

  return appendOneBit(input) + L64.padStart(K + 64, '0')
}

export function chunkString(str, length = 512) {
  return str.match(new RegExp('.{1,' + length + '}', 'g')) || [];
}

export function rotateRight(value, r) { // https://github.com/dfrankland/bitwise-rotation/blob/master/src/index.js
  const bitWidth = 32;
  const rotation = r & (bitWidth - 1)
  const bitMask = (2 ** bitWidth) - 1
  return (
    (value >>> rotation) |
    ((value << (bitWidth - rotation)) & bitMask)
  ); // Change from signed to unsigned
}