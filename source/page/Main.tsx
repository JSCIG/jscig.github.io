import { component, observer } from 'web-cell';
import {
  Jumbotron,
  Button,
  Image,
  SpinnerBox,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Badge,
} from 'boot-cell';

import organizations from '../data/members-china.json';
import { member, proposal, Member, Proposal } from '../model';

const thisYear = new Date().getFullYear();

@component({ tagName: 'main-page' })
@observer
export class MainPage extends HTMLElement {
  connectedCallback() {
    if (member.list.length < 1) member.getList();
    if (proposal.finishedList.length < 1) proposal.getList();
  }

  renderMember = ({
    avatar_url,
    username,
    url,
    name,
    company,
    location,
    bio,
  }: Member) => (
    <div key={username} className="col-12 col-sm-6 col-md-3 my-3">
      <Card className="h-100">
        <CardImg variant="top" src={avatar_url} loading="lazy" />
        <CardBody>
          <CardTitle>
            <a
              className="text-decoration-none stretched-link"
              title={username}
              target="_blank"
              href={url}
            >
              {name}
            </a>
          </CardTitle>
          <dl>
            <dt>组织</dt>
            <dd>{company}</dd>
            <dt>地区</dt>
            <dd>{location}</dd>
            <dt>自述</dt>
            <dd>{bio}</dd>
          </dl>
        </CardBody>
      </Card>
    </div>
  );

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
        <Card className="h-100">
          <CardHeader className="d-flex justify-content-around">
            <Badge
              bg="primary"
              target="_blank"
              href={`https://tc39.es/ecma${standard}/`}
            >
              ECMA-{standard}
            </Badge>
            {standard === '262' && edition <= thisYear && (
              <Badge
                bg="success"
                target="_blank"
                href={`https://www.ecma-international.org/ecma-262/${
                  edition - 2009
                }.0/`}
              >
                ES {edition}
              </Badge>
            )}
          </CardHeader>
          <CardBody>
            <CardTitle>
              {link ? (
                <a target="_blank" href={link}>
                  {name}
                </a>
              ) : (
                name
              )}
            </CardTitle>

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
          </CardBody>
        </Card>
      </div>
    );
  };

  render() {
    return (
      <>
        <Jumbotron
          className="my-5 p-5 text-center"
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

          <Button
            className="me-3"
            size="lg"
            variant="success"
            href="#proposals"
          >
            查阅提案
          </Button>
          <Button
            size="lg"
            variant="primary"
            target="_blank"
            href="https://github.com/JSCIG/es-discuss/discussions"
          >
            参与讨论
          </Button>
        </Jumbotron>

        <h2 className="my-5 text-center">TC39 中国会员</h2>

        <section className="row align-items-center">
          {organizations.map(({ link, logo, name }) => (
            <a
              className="d-flex col-12 col-sm-4 col-md-3 my-3 flex-column justify-content-between align-items-center text-decoration-none"
              target="_blank"
              href={link}
            >
              <Image
                className="w-100 object-fit-contain"
                style={{ height: '5rem' }}
                title={name}
                src={logo}
              />
            </a>
          ))}
          <footer className="col-12 text-center">
            <Button size="sm" variant="outline-primary" href="#members">
              查看详情
            </Button>
          </footer>
        </section>

        <h2 className="my-5 text-center">JSCIG 成员</h2>

        <SpinnerBox className="row" cover={member.downloading > 0}>
          {member.list.map(this.renderMember)}
        </SpinnerBox>

        <h2 className="my-5 text-center">TC39 既成提案</h2>

        <SpinnerBox className="row" cover={proposal.downloading > 0}>
          {proposal.finishedList.map(this.renderProposal)}
        </SpinnerBox>
      </>
    );
  }
}
