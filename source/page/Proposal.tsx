import { createCell } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { formatDate } from 'web-utility/source/date';
import classNames from 'classnames';

import { PageProps } from 'cell-router/source';
import { Status } from 'boot-cell/source/utility/constant';
import { Table, TableRow } from 'boot-cell/source/Content/Table';

import { FilterLink } from '../component/FilterLink';
import style from './Proposal.less';
import { proposal } from '../model';

const StageMap = [
  Status.secondary,
  Status.danger,
  Status.warning,
  Status.primary,
  Status.success
];

function renderNames(filter: 'author' | 'champion', list: string[]) {
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

export interface ProposalPageProps extends PageProps {
  stage?: number;
  author?: string;
  champion?: string;
  published_at?: string;
}

export const ProposalPage = observer(
  ({ stage, author, champion, published_at }: ProposalPageProps) => {
    const { list } = proposal;
    const data =
      stage != null
        ? list.filter(item => item.stage === stage)
        : author
        ? list.filter(({ authors }) => authors.includes(author))
        : champion
        ? list.filter(({ champions }) => champions.includes(champion))
        : published_at
        ? list.filter(item => item.published_at == published_at)
        : list;

    return (
      <main className={style.box}>
        <h1 className="text-center py-3">ECMAScript 标准提案</h1>

        <p className="text-center text-muted">
          {stage != null ? `处于 Stage ${stage} 的` : null}
          {author && `${author} 提交的`}
          {champion && `${champion} 推动的`}
          {published_at && `定案于 ${published_at} 的`}
          活跃提案共计 <strong>{data.length}</strong> 个
        </p>
        <Table center striped hover>
          <TableRow type="head" className="text-nowrap">
            <th
              className={classNames(
                'user-select-none',
                proposal.sortKey === 'stage' && 'bg-info'
              )}
              onClick={() => (proposal.sortKey = 'stage')}
            >
              进程
            </th>
            <th
              className={classNames(
                'user-select-none',
                proposal.sortKey === 'name' && 'bg-info'
              )}
              onClick={() => (proposal.sortKey = 'name')}
            >
              名称
            </th>
            <th>作者</th>
            <th>责编</th>
            <th
              className={classNames(
                'user-select-none',
                proposal.sortKey === 'star_count' && 'bg-info'
              )}
              onClick={() => (proposal.sortKey = 'star_count')}
              title="星标数"
            >
              ⭐
            </th>
            <th
              className={classNames(
                'user-select-none',
                proposal.sortKey === 'issue_count' && 'bg-info'
              )}
              onClick={() => (proposal.sortKey = 'issue_count')}
              title="尚在讨论的问题数"
            >
              📃
            </th>
            <th
              className={classNames(
                'user-select-none',
                proposal.sortKey === 'updated_at' && 'bg-info'
              )}
              onClick={() => (proposal.sortKey = 'updated_at')}
            >
              最近更新
            </th>
            <th
              className={classNames(
                'user-select-none',
                proposal.sortKey === 'published_at' && 'bg-info'
              )}
              onClick={() => (proposal.sortKey = 'published_at')}
            >
              定案时间
            </th>
          </TableRow>
          {data.map(
            ({
              stage,
              link,
              name,
              authors,
              champions,
              star_count,
              issue_count,
              meeting_link,
              updated_at,
              published_at
            }) => {
              const updated = formatDate(updated_at, 'YYYY 年 M 月');

              return (
                <TableRow>
                  <td>
                    <FilterLink
                      className="stretched-link"
                      type="badge"
                      color={StageMap[stage]}
                      path="proposals"
                      filter="stage"
                      value={stage}
                    >
                      Stage {stage}
                    </FilterLink>
                  </td>
                  <td>
                    <a className="stretched-link" target="_blank" href={link}>
                      {name}
                    </a>
                  </td>
                  <td>{renderNames('author', authors)}</td>
                  <td>{renderNames('champion', champions)}</td>
                  <td>
                    {star_count != null ? (
                      <a
                        className="stretched-link"
                        target="_blank"
                        href={link + '/stargazers'}
                      >
                        {star_count}
                      </a>
                    ) : null}
                  </td>
                  <td>
                    {issue_count != null ? (
                      <a
                        className="stretched-link"
                        target="_blank"
                        href={link + '/issues'}
                      >
                        {issue_count}
                      </a>
                    ) : null}
                  </td>
                  <td className="text-nowrap">
                    {meeting_link ? (
                      <a
                        className="stretched-link"
                        target="_blank"
                        href={meeting_link}
                      >
                        {updated}
                      </a>
                    ) : (
                      updated
                    )}
                  </td>
                  <td>
                    {published_at && (
                      <FilterLink
                        className="stretched-link"
                        path="proposals"
                        filter="published_at"
                        value={published_at}
                      />
                    )}
                  </td>
                </TableRow>
              );
            }
          )}
        </Table>
      </main>
    );
  }
);
