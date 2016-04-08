export function tryParse({value, defaultValue, options}) {
  try {
    return JSON.parse(value, options);
  } catch (err) {
    return defaultValue || {};
  }
}
