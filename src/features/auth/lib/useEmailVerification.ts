import { useState, useEffect } from 'react';
import { sendEmailCodeApi, verifyEmailCodeApi, type EmailError } from '../api/useEmailAuth';
import { useMutation } from '@tanstack/react-query';

export type EmailVerificationState = {
  sent: boolean;
  verified: boolean;
  timer: number;
  isLoading: boolean;
};

export const useEmailVerification = () => {
  const [state, setState] = useState<EmailVerificationState>({
    sent: false,
    verified: false,
    timer: 0,
    isLoading: false,
  });

  // 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.timer > 0) {
      interval = setInterval(() => {
        setState((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.timer]);

  // 이메일 코드 전송 mutation
  const sendEmailMutation = useMutation({
    mutationFn: sendEmailCodeApi,
    onMutate: () => setState((prev) => ({ ...prev, isLoading: true })),
    onSuccess: (data) => {
      alert(data.newCode ? '새 코드가 전송되었습니다.' : '1분 이내 재요청: 기존 코드 전송');
      setState({ sent: true, verified: false, timer: 180, isLoading: false });
    },
    onError: (err: EmailError) => {
      alert(err.message);
      setState((prev) => ({ ...prev, isLoading: false }));
    },
  });

  // 이메일 코드 검증 mutation
  const verifyEmailMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyEmailCodeApi(email, code),
    onSuccess: () => {
      alert('이메일 인증 완료!');
      setState((prev) => ({ ...prev, verified: true, timer: 0 }));
    },
    onError: (err: EmailError) => {
      alert(err.message);
    },
  });

  // const verifyCode = async (code: string) => {
  //   if (code === '123456') {
  //     setState((prev) => ({ ...prev, verified: true, timer: 0 }));
  //     return true;
  //   }
  //   return false;
  // };

  // 훅에서 호출할 함수
  const sendVerificationCode = (email: string) => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    sendEmailMutation.mutate(email);
  };

  const verifyCode = (email: string, code: string) => {
    if (!code) {
      alert('인증 코드를 입력해주세요.');
      return;
    }
    verifyEmailMutation.mutate({ email, code });
  };

  const reset = () => {
    setState({ sent: false, verified: false, timer: 0, isLoading: false });
  };

  return { state, sendVerificationCode, verifyCode, reset };
};
