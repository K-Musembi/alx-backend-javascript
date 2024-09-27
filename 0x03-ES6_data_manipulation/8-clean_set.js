export default function cleanSet(set, startString) {
  if (typeof startString === 'string' && startString.length !== 0) {
    const str = [];
    for (const value of set) {
      if (value.startsWith(startString)) {
        str.push(value.slice(startString.length));
      }
    }

    return str.join('-');
  }

  return '';
}
