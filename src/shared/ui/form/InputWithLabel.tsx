import { useId, type InputHTMLAttributes } from 'react';
import { Label } from '../shadcn/label';
import { Input } from '../shadcn/input';

// htmlFor는 내부에서 처리하므로 제거
export interface InputWithLabelProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'htmlFor'> {
  label: string; // label 텍스트
  className?: string; // wrapper div 클래스
}

export const InputWithLabel = ({ label, id, className, ...inputProps }: InputWithLabelProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`mb-2 grid w-full items-center gap-1 ${className || ''}`}>
      <Label htmlFor={inputId} className='mt-2 block text-base'>
        {label}
      </Label>
      <Input id={inputId} className='h-12 border-2 focus:!border-green-500' {...inputProps} />
    </div>
  );
};

InputWithLabel.displayName = 'InputWithLabel'; // React DevTools 확인용
