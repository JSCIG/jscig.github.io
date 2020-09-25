import { HTTPClient } from 'koajax';

export const service = new HTTPClient({
  baseURI: 'https://jscig.github.io/',
  responseType: 'json'
});
