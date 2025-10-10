import { VALIDATION_MESSAGES } from '@/shared/constants/validationMessages';
import { z } from 'zod';

// 공통 필드 정의
const emailSchema = z.email(VALIDATION_MESSAGES.EMAIL_INVALID);
const passwordSchema = z
  .string()
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, VALIDATION_MESSAGES.PASSWORD_COMPLEXITY);

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
    password: passwordSchema,
    passwordConfirm: z.string(),
    verificationCode: z.string().optional(),
    termsAgree: z.boolean().refine((v) => v === true, {
      message: VALIDATION_MESSAGES.TERMS_AGREE,
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
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
