import { Icon } from '@djeka07/ui';
import { icon, root } from './error.css';

type ErrorProps = {
  message: string;
};

const Error = (props: ErrorProps) => (
  <div className={root}>
    <Icon name="AlertCircle" className={icon} />
    {props.message}
  </div>
);

export default Error;
