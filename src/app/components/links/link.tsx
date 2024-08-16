'use client';
import { Link as RouterLink } from '@remix-run/react';
import { MouseEventHandler, ReactNode } from 'react';
import { LinkStyleVariants, link } from './link.css';
import { css } from '@djeka07/utils';

type LinkProps = LinkStyleVariants & {
  href: string;
  className?: string;
  title?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
};

const Link = ({ children, href, className, color = 'main', onClick, size = 'normal', title }: LinkProps) => (
  <RouterLink className={css(link({ color, size }), className)} onClick={onClick} title={title} to={href}>
    {children}
  </RouterLink>
);

export default Link;
