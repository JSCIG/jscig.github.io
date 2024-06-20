import { observable } from 'mobx';
import { BaseModel, toggle } from 'mobx-restful';

import { service } from './service';

export type Member = Record<
  'name' | 'username' | 'url' | 'avatar_url',
  string
> &
  Partial<Record<'bio' | 'location' | 'company', string>>;

export class MemberModel extends BaseModel {
  @observable
  accessor list: Member[] = [];

  @toggle('downloading')
  async getList() {
    const { body } = await service.get<Member[]>(
      'https://jscig.github.io/dataset/members-jscig.json',
    );
    return (this.list = body);
  }
}
