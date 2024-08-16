import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import media from '../../../../../app/styles/media.css';

export const userItem = recipe({
  base: {
    padding: '10px 10px 10px 15px',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: 'var(--small-border-radius)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    [media.base]: {
      [media.small.up]: {
        padding: '10px 10px 10px 25px',
        justifyContent: 'initial',
        '::before': {
          height: '12px',
          width: '12px',
          left: '5px',
        },
      },
    },
    '::before': {
      content: '',
      position: 'absolute',
      height: 10,
      width: 10,
      borderRadius: 10,
      left: 8,
    },
    selectors: {
      '&&&': {
        color: 'var(--main-link-color)',
      },
    },
  },
  variants: {
    selected: { true: { backgroundColor: 'rgba(0,0,0, 0.2)' } },
    online: {
      true: {
        '::before': {
          backgroundColor: 'var(--main-success-color)',
        },
      },
      false: {
        '::before': {
          backgroundColor: 'var(--main-error-color)',
        },
      },
    },
  },

  defaultVariants: {
    selected: undefined,
    online: false,
  },
});

export const users = style({
  flexGrow: 1,
  overflowY: 'auto',
});

export const name = style({
  maxWidth: 'none',
  overflow: 'initial',
  display: 'none',
  [media.base]: {
    [media.small.up]: {
      display: 'block',
    },
  },
});

export const numberOfUsers = style({
  textAlign: 'center',
  color: 'white',
  marginTop: 10,
  paddingTop: 10,
  borderTop: `1px solid 'var(--400-grey-color)',`,
  fontSize: 'var(--small-font-size)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 4,
  paddingRight: 4,
});

export const icon = style({
  selectors: {
    '&&': {
      [media.base]: {
        [media.small.down]: {
          position: 'absolute',
          top: 0,
          right: 4,
          backgroundColor: 'var(--300-grey-color)',
          borderRadius: '50%',
          padding: 3,
          fill: 'var(--600-grey-color)',
        },
      },
    },
  },
});
