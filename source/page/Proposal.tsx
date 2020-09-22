import { createCell, Fragment } from 'web-cell';
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

function renderNames(list: string[]) {
  return list[1] ? (
    <ul className="d-inline-block text-left">
      {list.map(author => (
        <li>{author}</li>
      ))}
    </ul>
  ) : (
    list[0]
  );
}

export function ProposalPage() {
  return (
    <>
      <h1 className="text-center py-3">ECMAScript 标准提案</h1>

      <p className="text-center text-muted">
        活跃提案共计 <strong>{proposals.length}</strong> 个
      </p>

      <Table center striped hover>
        <TableRow type="head">
          <th>进程</th>
          <th>名称</th>
          <th>作者</th>
          <th>责编</th>
        </TableRow>
        {proposals.map(({ stage, link, name, authors, champions }, index) => (
          <TableRow>
            <td>
              <Badge color={StageMap[stage]}>Stage {stage}</Badge>
            </td>
            <td>
              <a target="_blank" href={link}>
                {name}
              </a>
            </td>
            <td>{renderNames(authors)}</td>
            <td>{renderNames(champions)}</td>
          </TableRow>
        ))}
      </Table>
    </>
  );
}
