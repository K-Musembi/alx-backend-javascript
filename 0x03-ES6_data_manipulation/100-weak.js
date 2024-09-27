export const weakMap = new WeakMap();

export function queryAPI(apiEndpoint) {
  let num = weakMap.get(apiEndpoint) || 0;
  num += 1;
  weakMap.set(apiEndpoint, num);
  if (num >= 5) {
    throw new Error('Endpoint load is high');
  }
}
