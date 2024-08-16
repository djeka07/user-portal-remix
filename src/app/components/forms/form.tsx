import { Form as RemixForm } from '@remix-run/react';
import { BaseSyntheticEvent, ReactNode } from 'react';
import { HTMLFormMethod } from '~/app/models/types/html';

type FormProps = {
  action?: string;
  method?: HTMLFormMethod;
  children: ReactNode | ReactNode[];
  className?: string;
  handleSubmit?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
};

const Form = ({ action, method = 'POST', children, className, handleSubmit }: FormProps) => {
  return (
    <RemixForm noValidate className={className} action={action} method={method} onSubmit={handleSubmit}>
      {children}
    </RemixForm>
  );
};

export default Form;
