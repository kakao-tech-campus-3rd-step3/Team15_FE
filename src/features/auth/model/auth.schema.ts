import { z } from 'zod';

// 공통 필드 정의
const emailSchema = z.email('올바른 이메일을 입력해주세요.');
const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
    '비밀번호는 영문, 숫자, 특수문자를 각각 최소 1자 이상 포함해야 합니다.',
  );

// 로그인 스키마
const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
type LoginFormValues = z.infer<typeof loginSchema>;

// 회원가입 스키마
const signupSchema = z
  .object({
    email: emailSchema,
    nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다.'),
    password: passwordSchema,
    passwordConfirm: z.string(),
    termsAgree: z.boolean().refine((v) => v === true, {
      message: '이용약관에 동의해주세요.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });
type SignupFormValues = z.infer<typeof signupSchema>;

export {
  emailSchema,
  passwordSchema,
  loginSchema,
  signupSchema,
  type LoginFormValues,
  type SignupFormValues,
};
