import { HTTPClient } from 'koajax';

export const service = new HTTPClient({
  baseURI: 'https://tc39.es/',
  responseType: 'json'
});
