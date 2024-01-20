import { FC } from 'web-cell';
import { PageProps } from 'cell-router';
import { Card, CardBody, CardFooter, CardImg, CardTitle } from 'boot-cell';
import { formatDate } from 'web-utility';

import organizations from '../data/members-china.json';

export const OrganizationPage: FC<PageProps> = props => (
  <main {...props}>
    <h1 className="my-5 text-center">Ecma国际 中国会员单位</h1>

    <ul className="list-unstyled row g-3">
      {organizations.map(
        ({ logo, link, name, gaRep, gaAlt, membership, startDate }) => (
          <li key={name} className="col-12 col-sm-6 col-md-3 d-flex">
            <Card className="shadow-sm flex-fill w-100">
              <CardImg
                className="object-fit-contain"
                fluid
                style={{ height: '5rem', padding: '0.5rem' }}
                src={logo}
              />
              <CardBody>
                <CardTitle>
                  <a
                    className="text-decoration-none stretched-link"
                    target="_blank"
                    href={link}
                  >
                    {name}
                  </a>
                </CardTitle>
              </CardBody>
              <CardFooter className="small">
                <div>
                  自{formatDate(startDate, 'YYYY年M月')}成为{membership}会员
                </div>
                <div>
                  会员大会代表：{gaRep}
                  {gaAlt && `、${gaAlt}`}
                </div>
              </CardFooter>
            </Card>
          </li>
        ),
      )}
    </ul>
  </main>
);
