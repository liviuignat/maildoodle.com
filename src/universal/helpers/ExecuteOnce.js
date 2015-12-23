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
      console.log(this.setTimeout);
    });
  }

  tryDisableTimeout() {
    console.log(this.setTimeout);
    if (this.setTimeout) {
      clearTimeout(this.setTimeout);
      this.setTimeout = null;
    }
  }
}
