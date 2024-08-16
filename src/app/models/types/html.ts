type LowerCaseFormMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type UpperCaseFormMethod = Uppercase<LowerCaseFormMethod>;

export type HTMLFormMethod = LowerCaseFormMethod | UpperCaseFormMethod;
