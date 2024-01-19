import { observable } from 'mobx';

import { service } from './service';

export type Member = Record<
  'name' | 'username' | 'url' | 'avatar_url',
  string
> &
  Partial<Record<'bio' | 'location' | 'company', string>>;

export class MemberModel {
  @observable
  accessor loading = false;

  @observable
  accessor list: Member[] = [];

  async getList() {
    this.loading = true;

    const { body } = await service.get<Member[]>(
      'https://jscig.github.io/dataset/members-jscig.json',
    );
    this.loading = false;

    return (this.list = body);
  }
}
