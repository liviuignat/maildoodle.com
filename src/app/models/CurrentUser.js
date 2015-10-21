import { md5 } from 'blueimp-md5';

export class CurrentUser {
  constructor(options) {
    const opt = options || { };

    this.email = opt.email || '';
    this.emailVerified = opt.emailVerified || '';
    this.updatedAt = opt.updatedAt || '';
    this.firstName = opt.firstName || '';
    this.lastName = opt.lastName || '';
  }

  getEmail() {
    return this.email;
  }

  getUserPhoto() {
    const emailMd5 = md5(this.getEmail());
    return `http://www.gravatar.com/avatar/${emailMd5}.jpg?s=200`;
  }

  getDisplayName() {
    let displayName = this.getEmail();

    if (this.firstName && this.lastName) {
      displayName = `${this.firstName} ${this.lastName}`;
    } else if (this.firstName) {
      displayName = this.firstName;
    } else if (this.lastName) {
      displayName = this.lastName;
    }

    return displayName;
  }
}
