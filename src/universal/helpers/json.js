export function tryParse({value, defaultValue, options}) {
  try {
    return JSON.parse.call(value, options);
  } catch (err) {
    return defaultValue || {};
  }
}
