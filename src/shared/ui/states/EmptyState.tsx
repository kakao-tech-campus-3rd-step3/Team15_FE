import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import type { VariantProps } from 'class-variance-authority';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

type LinkAction = {
  label: string;
  to: string;
  variant?: ButtonVariant;
};

type ClickAction = {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
};

type Action = LinkAction | ClickAction;

function isLinkAction(action: Action): action is LinkAction {
  return 'to' in action;
}

export type EmptyStateProps = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: Action;
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
  'aria-label'?: string;
};

export function EmptyState({
  icon,
  title = '데이터가 없습니다',
  description = '아직 표시할 내용이 없어요.',
  action,
  variant = 'default',
  className,
  ...rest
}: EmptyStateProps) {
  const Icon = icon ?? <Inbox aria-hidden className='text-muted-foreground h-5 w-5' />;

  if (variant === 'inline') {
    return (
      <div
        role='status'
        className={cn(
          'bg-card flex items-center gap-3 rounded-md border px-3 py-2 text-sm',
          className,
        )}
        {...rest}
      >
        <div className='bg-muted/50 flex h-8 w-8 items-center justify-center rounded-md border'>
          {Icon}
        </div>
        <div className='flex-1'>
          <p className='font-medium'>{title}</p>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>
        {action &&
          (isLinkAction(action) ? (
            <Button asChild variant={action.variant ?? 'default'} size='sm'>
              <Link to={action.to}>{action.label}</Link>
            </Button>
          ) : (
            <Button onClick={action.onClick} variant={action.variant ?? 'default'} size='sm'>
              {action.label}
            </Button>
          ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        role='status'
        className={cn(
          'bg-card flex flex-col items-center justify-center rounded-md border p-6 text-center',
          className,
        )}
        {...rest}
      >
        <div className='bg-muted/50 mb-3 flex h-10 w-10 items-center justify-center rounded-md border'>
          {Icon}
        </div>
        <p className='text-sm font-medium'>{title}</p>
        {description && <p className='text-muted-foreground mt-1 text-xs'>{description}</p>}
        {action && (
          <div className='mt-3'>
            {isLinkAction(action) ? (
              <Button asChild variant={action.variant ?? 'default'} size='sm'>
                <Link to={action.to}>{action.label}</Link>
              </Button>
            ) : (
              <Button onClick={action.onClick} variant={action.variant ?? 'default'} size='sm'>
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  // default (Card)
  return (
    <Card role='status' className={cn('bg-card', className)} {...rest}>
      <CardHeader className='space-y-2'>
        <div className='flex items-center gap-2'>
          <div className='bg-muted/50 flex h-9 w-9 items-center justify-center rounded-md border'>
            {Icon}
          </div>
          <CardTitle className='text-base'>{title}</CardTitle>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-4'>
        <p className='text-muted-foreground text-sm'>{description}</p>
        {action &&
          (isLinkAction(action) ? (
            <Button asChild variant={action.variant ?? 'default'}>
              <Link to={action.to}>{action.label}</Link>
            </Button>
          ) : (
            <Button onClick={action.onClick} variant={action.variant ?? 'default'}>
              {action.label}
            </Button>
          ))}
      </CardContent>
    </Card>
  );
}
