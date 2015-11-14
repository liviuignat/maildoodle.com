export function getItem(path: string) {
  return JSON.parse(window.localStorage.getItem(path));
}

export function setItem(path, value) {
  window.localStorage.setItem(path, JSON.stringify(value));
}

export function removeItem(path) {
  window.localStorage.removeItem(path);
}

export function clear() {
  window.localStorage.clear();
}
