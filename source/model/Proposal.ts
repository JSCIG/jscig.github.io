import { observable, reaction } from 'mobx';

import { service } from './service';
import { Member } from './Member';

export interface Proposal
  extends Pick<Member, 'name' | 'url'>,
    Partial<
      Record<
        | 'id'
        | `${'created' | 'pushed' | 'meeting'}_at`
        | 'owner'
        | 'repo'
        | 'link'
        | 'tests'
        | 'rationale',
        string
      > &
        Record<
          | `${'stargazers' | 'watchers' | 'forks' | 'open_issues' | 'subscribers'}_count`
          | 'edition',
          number
        >
    >,
    Record<'authors' | 'champions' | 'tags', string[]> {
  stage: number;
  'has-specification': boolean;
  notes?: Record<'date' | 'url', string>[];
}

export type ProposalSortKey =
  | 'stage'
  | 'name'
  | `${'stargazers' | 'open_issues'}_count`
  | 'meeting_at';

export class ProposalModel {
  @observable
  accessor loading = false;

  @observable
  accessor list: Proposal[] = [];

  @observable
  accessor sortKey: ProposalSortKey;

  @observable
  accessor finishedList: Proposal[] = [];

  constructor() {
    reaction(
      () => this.sortKey,
      key => this.sortBy(key),
    );
  }

  async getList() {
    this.loading = true;

    const { body } = await service.get<Proposal[]>(
      'dataset/proposals.min.json',
    );
    const [finished, processing] = body
      .map(({ tags, authors, champions, ...rest }) => ({
        tags,
        authors,
        champions: tags.includes('co-champion') ? authors : champions,
        ...rest,
      }))
      .reduce(
        ([finished, processing], proposal) => {
          if (proposal.stage === 4) finished.push(proposal);
          else processing.push(proposal);

          return [finished, processing];
        },
        [[], []] as Proposal[][],
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
      },
    ));
  }
}
