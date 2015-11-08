class CookieService {
  setCookie(options) {
    const { name, value, expires, path } = options;

    const dt = new Date();
    const pathString = 'path=' + (path || '/');
    dt.setTime(dt.getTime() + expires);
    const expiresString = 'expires=' + dt.toUTCString();

    const cookieString = `${name}=${value}; ${expiresString}; ${pathString}; `;

    window.document.cookie = cookieString;
  }

  getCookie(cname) {
    const name = cname + '=';
    const ca = window.document.cookie.split(';');
    for (let ind = 0; ind < ca.length; ind++) {
      let cs = ca[ind];
      while (cs.charAt(0) === ' ') {
        cs = cs.substring(1);
      }

      if (cs.indexOf(name) === 0) {
        return cs.substring(name.length, cs.length);
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
