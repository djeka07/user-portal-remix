import { useContext } from 'react';
import { ColorModeContext } from '../contexts/color-mode.context';

export default () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('Theme context must be used in a theme provider');
  }

  return context;
};
