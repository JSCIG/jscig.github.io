import { createCell, Fragment } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import { formatDate } from 'web-utility/source/date';

import { PageProps } from 'cell-router/source';
import { Status } from 'boot-cell/source/utility/constant';
import { Table, TableRow } from 'boot-cell/source/Content/Table';
import { Badge } from 'boot-cell/source/Reminder/Badge';

import proposals from '../data/index.json';

const StageMap = [
  Status.secondary,
  Status.danger,
  Status.warning,
  Status.primary,
  Status.success
];

interface FilterLinkProps extends HTMLHyperLinkProps {
  filter: 'author' | 'champion' | 'published_at';
  value: string;
}

function FilterLink({ filter, value, defaultSlot, ...rest }: FilterLinkProps) {
  return (
    <a {...rest} href={`proposals?${filter}=${value}`}>
      {value}
    </a>
  );
}

function renderNames(filter: 'author' | 'champion', list: string[]) {
  return list[1] ? (
    <ul className="d-inline-block m-0 text-left">
      {list.map(author => (
        <li>
          <FilterLink filter={filter} value={author} />
        </li>
      ))}
    </ul>
  ) : (
    <FilterLink filter={filter} value={list[0]} />
  );
}

export interface ProposalPageProps extends PageProps {
  author?: string;
  champion?: string;
  published_at?: string;
}

export function ProposalPage({
  author,
  champion,
  published_at
}: ProposalPageProps) {
  const list = author
    ? proposals.filter(({ authors }) => authors.includes(author))
    : champion
    ? proposals.filter(({ champions }) => champions.includes(champion))
    : published_at
    ? proposals.filter(item => item.published_at == published_at)
    : proposals;

  return (
    <>
      <h1 className="text-center py-3">ECMAScript 标准提案</h1>

      <p className="text-center text-muted">
        {author && `${author} 提交的`}
        {champion && `${champion} 推动的`}
        {published_at && `定案于 ${published_at} 的`}
        活跃提案共计 <strong>{list.length}</strong> 个
      </p>
      <Table center striped hover>
        <TableRow type="head" className="text-nowrap">
          <th>进程</th>
          <th>名称</th>
          <th>作者</th>
          <th>责编</th>
          <th>最近更新</th>
          <th>定案时间</th>
        </TableRow>
        {list.map(
          ({
            stage,
            link,
            name,
            authors,
            champions,
            meeting_link,
            updated_at,
            published_at
          }) => {
            const updated = formatDate(updated_at, 'YYYY 年 M 月');

            return (
              <TableRow>
                <td>
                  <Badge color={StageMap[stage]}>Stage {stage}</Badge>
                </td>
                <td>
                  <a target="_blank" href={link}>
                    {name}
                  </a>
                </td>
                <td>{renderNames('author', authors)}</td>
                <td>{renderNames('champion', champions)}</td>
                <td className="text-nowrap">
                  {meeting_link ? (
                    <a target="_blank" href={meeting_link}>
                      {updated}
                    </a>
                  ) : (
                    updated
                  )}
                </td>
                <td>
                  <FilterLink filter="published_at" value={published_at} />
                </td>
              </TableRow>
            );
          }
        )}
      </Table>
    </>
  );
}
