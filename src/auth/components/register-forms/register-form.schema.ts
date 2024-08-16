import zod from 'zod';

const registerFormSchema = zod
  .object({
    email: zod
      .string({ message: 'form:login:input:email:error:empty' })
      .email('form:login:input:email:error:not-valid'),
    firstName: zod.string({ message: 'form:register:input:first-name:error:empty' }),
    lastName: zod.string({ message: 'form:register:input:last-name:error:empty' }),
    password: zod.string({ message: 'form:login:input:password:error:empty' }).min(8),
    confirmPassword: zod.string({ message: 'form:register:input:confirm-password:error:empty' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'form:register:input:confirm-password:error:no-match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = zod.infer<typeof registerFormSchema>;
export default registerFormSchema;
