import { HTTPClient } from 'koajax';
import { Octokit } from '@octokit/rest';

export const service = new HTTPClient({
  baseURI: 'https://jscig.github.io/',
  responseType: 'json'
});
export const github = new Octokit();
