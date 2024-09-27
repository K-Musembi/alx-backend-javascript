export default function hasValuesFromArray(set, array) {
  const filtered = array.filter((element) => set.has(element));

  if (array.length === filtered.length) {
    return true;
  }

  return false;
}
