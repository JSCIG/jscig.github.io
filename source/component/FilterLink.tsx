import { FC } from 'web-cell';
import { Badge, BadgeProps } from 'boot-cell';

export interface FilterLinkProps extends BadgeProps {
  type?: 'anchor' | 'badge';
  path: string;
  filter: string;
  value: any;
}

export const FilterLink: FC<FilterLinkProps> = ({
  type = 'anchor',
  filter,
  value,
  children,
  ...rest
}) => {
  const Link = type === 'anchor' ? 'a' : Badge;

  return (
    <Link {...rest} href={`#proposals?${filter}=${value}`}>
      {children}
    </Link>
  );
};
