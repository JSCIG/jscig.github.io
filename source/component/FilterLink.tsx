import { createCell } from 'web-cell';

import { BadgeProps, Badge } from 'boot-cell/source/Reminder/Badge';

export interface FilterLinkProps extends BadgeProps {
  type?: 'anchor' | 'badge';
  path: string;
  filter: string;
  value: any;
}

export function FilterLink({
  type = 'anchor',
  filter,
  value,
  defaultSlot,
  ...rest
}: FilterLinkProps) {
  const Link = type === 'anchor' ? 'a' : Badge;

  return (
    <Link {...rest} href={`proposals?${filter}=${value}`}>
      {defaultSlot[0] ? defaultSlot : value}
    </Link>
  );
}
