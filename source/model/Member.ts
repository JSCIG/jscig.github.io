import { observable } from 'mobx';
import { OrgsListMembersResponseData } from '@octokit/types';

import { github } from './service';

export class MemberModel {
  @observable
  loading = false;

  @observable
  list: OrgsListMembersResponseData = [];

  async getList() {
    this.loading = true;

    const { data } = await github.orgs.listMembers({
      org: 'JSCIG',
      per_page: 100
    });
    this.loading = false;

    return (this.list = data);
  }
}
