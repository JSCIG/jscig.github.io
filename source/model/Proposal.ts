import { observable, reaction } from 'mobx';

import { service } from './service';

export interface Proposal {
  stage: number;
  name: string;
  link?: string;
  authors?: string[];
  champions?: string[];
  meeting?: string;
  tests?: string;
  meeting_at?: string;
  created_at?: string;
  pushed_at?: string;
  tags: string[];
  edition?: number;
  repo?: string;
  owner?: string;
  forks_count?: number;
  open_issues_count?: number;
  stargazers_count?: number;
  subscribers_count?: number;
  watchers_count?: number;
}

export type ProposalSortKey =
  | 'stage'
  | 'name'
  | 'stargazers_count'
  | 'open_issues_count'
  | 'meeting_at';

export class ProposalModel {
  @observable
  loading = false;

  @observable
  list: Proposal[] = [];

  @observable
  sortKey: ProposalSortKey;

  @observable
  finishedList: Proposal[] = [];

  constructor() {
    reaction(
      () => this.sortKey,
      key => this.sortBy(key)
    );
  }

  async getList() {
    this.loading = true;

    const { body } = await service.get<Proposal[]>(
      'dataset/proposals.min.json'
    );
    const [finished, processing] = body
      .map(({ tags, authors, champions, ...rest }) => ({
        tags,
        authors,
        champions: tags.includes('co-champion') ? authors : champions,
        ...rest
      }))
      .reduce(
        ([finished, processing], proposal) => {
          if (proposal.stage === 4) finished.push(proposal);
          else processing.push(proposal);

          return [finished, processing];
        },
        [[], []] as Proposal[][]
      );

    this.loading = false;

    return (this.finishedList = finished), (this.list = processing);
  }

  sortBy(key: ProposalSortKey) {
    return (this.list = this.list.sort(
      ({ [key]: A = '' }, { [key]: B = '' }) => {
        switch (typeof B) {
          case 'number':
            return B - (A as number);
          case 'string':
            return B.localeCompare(A as string);
          default:
            return key.endsWith('_at') ? +new Date(B) - +new Date(A) : 0;
        }
      }
    ));
  }
}
