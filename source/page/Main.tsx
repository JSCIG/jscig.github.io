import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Jumbotron } from 'boot-cell/source/Content/Jumbotron';
import { Button } from 'boot-cell/source/Form/Button';
import { Image } from 'boot-cell/source/Media/Image';
import { SpinnerBox } from 'boot-cell/source/Prompt/Spinner';
import { Card, CardHeader } from 'boot-cell/source/Content/Card';
import { Badge } from 'boot-cell/source/Reminder/Badge';

import organizations from '../data/members-china.json';
import { member, proposal, Member, Proposal } from '../model';

const thisYear = new Date().getFullYear();

@observer
@component({
  tagName: 'main-page',
  renderTarget: 'children',
})
export class MainPage extends mixin() {
  connectedCallback() {
    if (member.list.length < 1) member.getList();
    if (proposal.finishedList.length < 1) proposal.getList();

    super.connectedCallback();
  }

  renderMember({
    avatar_url,
    username,
    url,
    name,
    company,
    location,
    bio,
  }: Member) {
    return (
      <div className="col-12 col-sm-6 col-md-3 my-3">
        <Card
          image={avatar_url}
          title={
            <a
              className="stretched-link"
              title={username}
              target="_blank"
              href={url}
            >
              {name}
            </a>
          }
        >
          <dl>
            <dt>组织</dt>
            <dd>{company}</dd>
            <dt>地区</dt>
            <dd>{location}</dd>
            <dt>自述</dt>
            <dd>{bio}</dd>
          </dl>
        </Card>
      </div>
    );
  }

  renderProposal = ({
    link,
    name,
    tags,
    edition,
    authors,
    champions,
  }: Proposal) => {
    const standard = tags[0].split('-')[1];

    return (
      <div className="col-12 col-sm-6 col-md-3 my-3">
        <Card
          className="h-100"
          title={
            link ? (
              <a target="_blank" href={link}>
                {name}
              </a>
            ) : (
              name
            )
          }
        >
          <CardHeader className="d-flex justify-content-around">
            <Badge
              color="primary"
              target="_blank"
              href={`https://tc39.es/ecma${standard}/`}
            >
              ECMA-{standard}
            </Badge>
            {standard === '262' && edition <= thisYear ? (
              <Badge
                color="success"
                target="_blank"
                href={`https://www.ecma-international.org/ecma-262/${
                  edition - 2009
                }.0/`}
              >
                ES {edition}
              </Badge>
            ) : null}
          </CardHeader>
          {(authors || champions) && (
            <dl>
              {authors && (
                <>
                  <dt>作者</dt>
                  <dd>{authors.join(', ')}</dd>
                </>
              )}
              {champions && (
                <>
                  <dt>责编</dt>
                  <dd>{champions.join(', ')}</dd>
                </>
              )}
            </dl>
          )}
        </Card>
      </div>
    );
  };

  render() {
    return (
      <>
        <Jumbotron
          className="my-5 text-center"
          title={
            <span className="text-nowrap">
              JavaScript&nbsp;
              <wbr />
              中文兴趣组
            </span>
          }
          description="致力于提供一个加强中国 JavaScript 社区对 JavaScript 语言标准（ECMAScript）工作的参与的平台"
        >
          <p className="mb-4">
            JSCIG 主要侧重于确定中国 JavaScript 开发者的需求、帮助 Ecma
            的中国成员熟悉 TC39 标准流程、讨论可能提交给 TC39
            的提案、标准的测试、实现以及和 JavaScript
            相关的标准化机会，同时协助中国 JavaScript 社区对 JavaScript
            语言的发展进行参与和贡献。
          </p>

          <Button className="mr-3" size="lg" color="success" href="proposals">
            查阅提案
          </Button>
          <Button
            size="lg"
            color="primary"
            target="_blank"
            href="https://github.com/JSCIG/es-discuss/discussions"
          >
            参与讨论
          </Button>
        </Jumbotron>

        <h2 className="my-5 text-center">TC39 中国会员</h2>

        <section className="row">
          {organizations.map(({ link, logo, name }) => (
            <a
              className="d-flex col-12 col-sm-4 col-md-3 my-3 flex-column justify-content-between align-items-center text-decoration-none"
              target="_blank"
              href={link}
            >
              <Image fluid title={name} src={logo} />
            </a>
          ))}
          <footer className="col-12 text-center">
            <Button size="sm" outline color="primary" href="members">
              查看详情
            </Button>
          </footer>
        </section>

        <h2 className="my-5 text-center">JSCIG 成员</h2>

        <SpinnerBox className="row" cover={member.loading}>
          {member.list.map(this.renderMember)}
        </SpinnerBox>

        <h2 className="my-5 text-center">TC39 既成提案</h2>

        <SpinnerBox className="row" cover={proposal.loading}>
          {proposal.finishedList.map(this.renderProposal)}
        </SpinnerBox>
      </>
    );
  }
}
