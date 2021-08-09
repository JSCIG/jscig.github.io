import {
  component,
  mixin,
  watch,
  attribute,
  createCell,
  Fragment
} from 'web-cell';
import { observer } from 'mobx-web-cell';
import { formatDate } from 'web-utility/source/date';
import classNames from 'classnames';

import { PageProps } from 'cell-router/source';
import { Status } from 'boot-cell/source/utility/constant';
import { SpinnerBox } from 'boot-cell/source/Prompt/Spinner';
import { Table, TableRow } from 'boot-cell/source/Content/Table';

import { FilterLink } from '../component/FilterLink';
import style from './Proposal.less';
import { proposal, Proposal } from '../model';

const StageMap = [
  Status.secondary,
  Status.info,
  Status.danger,
  Status.warning,
  Status.primary,
  Status.success
];

export interface ProposalPageProps extends PageProps {
  stage?: number;
  author?: string;
  champion?: string;
}

@observer
@component({
  tagName: 'proposal-page',
  renderTarget: 'children'
})
export class ProposalPage extends mixin<ProposalPageProps>() {
  @attribute
  @watch
  stage?: number;

  @attribute
  @watch
  author?: string;

  @attribute
  @watch
  champion?: string;

  connectedCallback() {
    if (proposal.list.length < 1) proposal.getList();

    super.connectedCallback();
  }

  renderHead() {
    const { sortKey } = proposal;

    return (
      <TableRow type="head" className="text-nowrap">
        <th
          className={classNames(
            'user-select-none',
            sortKey === 'stage' && 'bg-info'
          )}
          onClick={() => (proposal.sortKey = 'stage')}
        >
          进程
        </th>
        <th
          className={classNames(
            'user-select-none',
            sortKey === 'name' && 'bg-info'
          )}
          onClick={() => (proposal.sortKey = 'name')}
        >
          提案名称
        </th>
        <th>作者（Author）</th>
        <th>责编（Champion）</th>
        <th
          className={classNames(
            'user-select-none',
            sortKey === 'stargazers_count' && 'bg-info'
          )}
          onClick={() => (proposal.sortKey = 'stargazers_count')}
          title="星标数"
        >
          ⭐
        </th>
        <th
          className={classNames(
            'user-select-none',
            sortKey === 'open_issues_count' && 'bg-info'
          )}
          onClick={() => (proposal.sortKey = 'open_issues_count')}
          title="尚在讨论的问题数"
        >
          📃
        </th>
        <th>测试</th>
        <th
          className={classNames(
            'user-select-none',
            sortKey === 'meeting_at' && 'bg-info'
          )}
          onClick={() => (proposal.sortKey = 'meeting_at')}
        >
          最近会议记录
        </th>
      </TableRow>
    );
  }

  renderNames(filter: 'author' | 'champion', list: string[]) {
    switch (list.length) {
      case 0:
        return null;
      case 1:
        return (
          <FilterLink
            className="stretched-link"
            path="proposals"
            filter={filter}
            value={list[0]}
          />
        );
      default:
        return (
          <ul className="d-inline-block m-0 text-left">
            {list.map(author => (
              <li>
                <FilterLink path="proposals" filter={filter} value={author} />
              </li>
            ))}
          </ul>
        );
    }
  }

  renderNotes(notes: { date: string, url: string }[]) {
    return notes.map(({ date, url }) => (
      <a href={url}>{formatDate(date, 'YYYY年M月D日')}</a>
    ))
  }

  renderRow = ({
    stage,
    url,
    name,
    authors,
    champions,
    stargazers_count,
    open_issues_count,
    tests,
    notes,
    // pushed_at,
  }: Proposal) => {
    return (
      <TableRow>
        <td>
          <FilterLink
            className="stretched-link"
            type="badge"
            color={StageMap[stage + 1]}
            path="proposals"
            filter="stage"
            value={stage}
          >
            {stage < 0 ? '非活跃' : `阶段${stage}`}
          </FilterLink>
        </td>
        <td>
          {url ? (
            <a className="stretched-link" target="_blank" href={url}>
              {name}
            </a>
          ) : (
            name
          )}
        </td>
        <td>{authors && this.renderNames('author', authors)}</td>
        <td>{champions && this.renderNames('champion', champions)}</td>
        <td>
          {stargazers_count != null ? (
            <a
              className="stretched-link"
              target="_blank"
              href={url + '/stargazers'}
            >
              {stargazers_count}
            </a>
          ) : null}
        </td>
        <td>
          {open_issues_count != null ? (
            <a
              className="stretched-link"
              target="_blank"
              href={url + '/issues'}
            >
              {open_issues_count}
            </a>
          ) : null}
        </td>
        <td>
          {tests && (
            <a
              className="stretched-link text-success"
              target="_blank"
              href={tests}
            >
              √
            </a>
          )}
        </td>
        <td className="text-nowrap">
          {notes && this.renderNotes(notes)}
        </td>
      </TableRow>
    );
  };

  render({ stage, author, champion }: ProposalPageProps) {
    const { list, loading } = proposal;
    const data =
      stage != null
        ? list.filter(item => item.stage === stage)
        : author
          ? list.filter(({ authors }) => authors?.includes(author))
          : champion
            ? list.filter(({ champions }) => champions?.includes(champion))
            : list;

    return (
      <>
        <h1 className="text-center py-3">ECMAScript 标准提案</h1>

        <SpinnerBox className={style.box} cover={loading}>
          <p className="text-center text-muted">
            {stage != null ? `处于 Stage ${stage} 的` : null}
            {author && `${author} 提交的`}
            {champion && `${champion} 推动的`}
            活跃提案共计{' '}
            <strong>
              {data.filter(({ stage }) => stage > -1 && stage < 4).length}
            </strong>{' '}
            个
          </p>
          <Table center striped hover>
            {this.renderHead()}
            {data.map(this.renderRow)}
          </Table>
        </SpinnerBox>
      </>
    );
  }
}
