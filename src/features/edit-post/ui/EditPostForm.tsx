import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import { postEditSchema, type PostEditValues } from '../model/postEdit.schema';

type Props = {
  defaultValues: PostEditValues;
  onSubmit: (values: PostEditValues) => void | Promise<void>;
  id?: string; // 외부 submit 용 (ex: "postEditForm")
  disabled?: boolean;
};

export function EditPostForm({ defaultValues, onSubmit, id = 'postEditForm', disabled }: Props) {
  const form = useForm<PostEditValues>({
    resolver: zodResolver(postEditSchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <Form {...form}>
      <form id={id} className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder='제목을 입력하세요' {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea
                  className='min-h-[180px]'
                  placeholder='내용을 입력하세요'
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
