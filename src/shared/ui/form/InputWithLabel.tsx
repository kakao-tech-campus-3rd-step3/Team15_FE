import React, { type InputHTMLAttributes } from 'react';
import { Label } from '../shadcn/label';
import { Input } from '../shadcn/input';

export interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // label 텍스트
  htmlFor?: string; // label htmlFor
  className?: string; // wrapper div 클래스
}

// 범용으로 forwardRef 사용
export const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, id, className, ...inputProps }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`mb-2 grid w-full max-w-sm items-center gap-1 ${className || ''}`}>
        <Label htmlFor={inputId} className='mt-2 block text-base'>
          {label}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          className='h-12 border-2 focus:!border-green-500'
          {...inputProps}
        />
      </div>
    );
  },
);

InputWithLabel.displayName = 'InputWithLabel'; //react devtools에서 컴포넌트 이름 확인 용
