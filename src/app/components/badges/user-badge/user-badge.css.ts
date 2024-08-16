import { globalStyle, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { SizeKeys } from '~/app/styles/typography';

export const toolTip = style({
  display: 'none',
  position: 'absolute',
  right: 0,
  backgroundColor: 'var(--dark-background-color)',
  color: 'var(--white-common-color)',
  fontSize: 'var(--xxsmall-font-size)',
  borderRadius: 'var(--small-border-radius)',
  minWidth: 150,
  padding: 4,
});

export const root = style({});

globalStyle(`root:hover & > ${toolTip}`, {
  display: 'block',
});

export type WrapperStyleProps = {
  size?: SizeKeys;
};

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--light-link-color)',
    background: 'var(--600-grey-color)',
    borderRadius: '50%',
    fontSize: 'var(--normal-font-size)',
    fontWeight: 'var(--bold-font-weight)',
  },
  variants: {
    size: {
      xxsmall: {
        height: 15,
        width: 15,
        fontSize: 'var(--xxsmall-font-size)',
      },
      xsmall: {
        height: 20,
        width: 20,
        fontSize: 'var(--xxsmall-font-size)',
      },
      small: {
        height: 25,
        width: 25,
        fontSize: 'var(--xsmall-font-size)',
      },
      normal: {
        height: 30,
        width: 30,
      },
      medium: {
        height: 35,
        width: 35,
      },
      large: {
        height: 40,
        width: 40,
      },
      xlarge: {
        height: 45,
        width: 45,
      },
      xxlarge: {
        height: 50,
        width: 50,
      },
    },
  },
});

export type WrapperStyleVariants = RecipeVariants<typeof wrapper>;
