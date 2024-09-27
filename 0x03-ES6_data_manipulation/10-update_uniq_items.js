export default function updateUniqueItems(fruits) {
  if (!(fruits instanceof Map)) {
    throw new Error('Cannot process');
  }

  for (const [item, quantity] of fruits) {
    if (quantity === 1) {
      fruits.set(item, 100);
    }
  }
  return fruits;
}
