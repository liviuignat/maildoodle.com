class CookieService {
  setCookie(options) {
    const { name, value, expires, path } = options;

    const d = new Date();
    const pathString = 'path=' + (path || '/');
    d.setTime(d.getTime() + expires);
    const expiresString = 'expires=' + d.toUTCString();

    const cookieString = `${name}=${value}; ${expiresString}; ${pathString}; `;

    window.document.cookie = cookieString;
  }

  getCookie(cname) {
    const name = cname + '=';
    const ca = window.document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  deleteCookie(cookieName) {
    const cookie = this.getCookie(cookieName);

    if (cookie) {
      this.setCookie({
        name: cookieName,
        value: '',
        expires: new Date(0)
      });
    }
  }
}

export const cookieService = new CookieService();
