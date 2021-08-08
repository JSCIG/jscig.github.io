import { observable } from 'mobx';

import { service } from './service';

export interface Member {
  name: string;
  username: string;
  url: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  company?: string;
}

export class MemberModel {
  @observable
  loading = false;

  @observable
  list: Member[] = [];

  async getList() {
    this.loading = true;

    const { body } = await service.get<Member[]>(
      'https://jscig.github.io/dataset/members-jscig.json',
    );
    this.loading = false;

    return (this.list = body);
  }
}
