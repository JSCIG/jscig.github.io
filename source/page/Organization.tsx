import { createCell, Fragment } from 'web-cell';
import { Image } from 'boot-cell/source/Media/Image';
import { Card, CardFooter } from 'boot-cell/source/Content/Card';
import { formatDate } from 'web-utility/source/date';

import organizations from '../data/members-china.json';

export function OrganizationPage() {
  return (
    <>
      <h1 className="my-5 text-center">Ecma国际 中国会员单位</h1>

      <ul className="list-unstyled row">
        {organizations.map(({ logo, link, name, gaRep, gaAlt, membership, startDate }) => (
          <li className="col-12 col-sm-6 col-md-3 px-2 my-2 d-flex">
            <Card
              className="shadow-sm flex-fill"
              image={
                <Image
                  fluid
                  style={{
                    height: '5rem',
                    objectFit: 'contain',
                    padding: '0.5rem',
                  }}
                  src={logo}
                />
              }
              title={
                <a
                  className="text-decoration-none stretched-link"
                  target="_blank"
                  href={link}
                >
                  {name}
                </a>
              }
            >
              <CardFooter className="small">
                <div>自{formatDate(startDate, 'YYYY年M月')}成为{membership}会员</div>
                <div>会员大会代表：{gaRep}{gaAlt && `、${gaAlt}`}</div>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
