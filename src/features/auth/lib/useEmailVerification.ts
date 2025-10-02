import { useState, useEffect } from 'react';

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

  const sendVerificationCode = async (email: string) => {
    if (!email) return;

    //실제 api 요청이 들어갈 장소
    // 임시 코드

    setState((prev) => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      setState({ sent: true, verified: false, timer: 180, isLoading: false });
    }, 1000);
  };

  const verifyCode = async (code: string) => {
    if (code === '123456') {
      setState((prev) => ({ ...prev, verified: true, timer: 0 }));
      return true;
    }
    return false;
  };

  const reset = () => {
    setState({ sent: false, verified: false, timer: 0, isLoading: false });
  };

  return { state, sendVerificationCode, verifyCode, reset };
};
