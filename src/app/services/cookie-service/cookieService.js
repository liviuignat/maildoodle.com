class CookieService {
  setCookie(options) {
    const { expires, name, value } = options;

    const d = new Date();
    d.setTime(d.getTime() + expires);
    const expiresString = 'expires=' + d.toUTCString();
    window.document.cookie = name + '=' + value + '; ' + expiresString;
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
}

export const cookieService = new CookieService();
