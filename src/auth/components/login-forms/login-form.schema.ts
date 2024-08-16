import zod from 'zod';

export const loginSchema = zod.object({
  redirectTo: zod.string().optional(),
  email: zod.string({ message: 'form:login:input:email:error:empty' }).email('form:login:input:email:error:not-valid'),
  password: zod.string({ message: 'form:login:input:password:error:empty' }).min(1),
});

export type LoginFormData = zod.infer<typeof loginSchema>;
