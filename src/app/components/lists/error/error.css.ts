import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 10,
  backgroundColor: 'var(--light-error-color)',
  color: 'var(--dark-error-color)',
  textAlign: 'center',
  borderRadius: 6,
  padding: 10,
});

export const icon = style({
  width: 40,
  height: 40,
  fill: 'var(--dark-error-color)',
});
