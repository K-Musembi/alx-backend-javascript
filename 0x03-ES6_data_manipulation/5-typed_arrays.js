export default function createInt8TypedArray(length, position, value) {
  const newBuffer = new ArrayBuffer(length);
  const view = new Int8Array(newBuffer);

  if (position < 0 || position >= length) {
    throw new Error('Position outside range');
  }

  view[position] = value;

  return newBuffer;
}
