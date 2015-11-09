import { Parse } from 'node-parse-api';
import config from './../config';

let parseObj;

if (process.env.NODE_ENV === 'integration-tests') {
  parseObj = new Parse({
    app_id: 'BS7AMCXlkT0j6AGeGWJtjpMeWSDxuFqMG0fCeRYs',
    js_key: 'WJo2j7T2r47JoZMGndtrA2VSxhaM0KFsO9gDOYuM',
    api_key: 'Rsg7HjbqKJWjuaH29H4Civj0P9KAZx4u68vtbbFM'
  });
} else {
  parseObj = new Parse(config.parse.options);
}

export const parse = parseObj;

