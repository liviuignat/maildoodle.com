export default class ExecuteOnce {
  execute(callback, timeout) {
    return new Promise((resolve) => {
      if (!callback) {
        throw new Error('Parameter callback is required');
      }

      this.tryDisableTimeout();

      this.setTimeout = setTimeout(() => {
        resolve(callback());
      }, timeout);
    });
  }

  tryDisableTimeout() {
    if (this.setTimeout) {
      clearTimeout(this.setTimeout);
      this.setTimeout = null;
    }
  }
}
