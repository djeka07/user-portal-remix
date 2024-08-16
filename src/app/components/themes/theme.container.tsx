import { useColorMode } from '~/app/models/hooks';
import Theme from './theme';
import { SizeKeys } from '@djeka07/ui/src/styles/typography';

type ThemeContainerProps = {
  className?: string;
  size?: SizeKeys;
};

const ThemeContainer = ({ className, size = 'small' }: ThemeContainerProps) => {
  const [{ mode }, { toggleMode }] = useColorMode();
  return <Theme size={size} className={className} theme={mode} toggleTheme={toggleMode} />;
};

export default ThemeContainer;
