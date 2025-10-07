import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '../model/useCreatePost';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/shadcn/form';
import { Input } from '@/shared/ui/shadcn/input';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/shadcn/radio-group';
import { Button } from '@/shared/ui/shadcn/button';
import { createPostSchema, type CreatePostFormValues } from '../lib/post.scheme';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';

export function CreatePostForm({ category }: { category: string }) {
  const navigate = useNavigate();
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      anonymous: true,
      categoryCode: category,
    },
  });

  const { mutateAsync, isPending } = useCreatePost();

  useEffect(() => {
    form.setValue('categoryCode', category);
  }, [category, form]);

  const onSubmit = async (values: CreatePostFormValues) => {
    await mutateAsync(values);
    navigate(ROUTES.post);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* 제목 */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg font-semibold'>제목</FormLabel>
              <FormControl>
                <Input
                  placeholder='어떤 이야기를 나누고 싶으신가요?'
                  className='h-12 rounded-xl'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 내용 + 가이드 */}
        <div className='space-y-3'>
          <div className='text-lg font-semibold'>내용</div>
          {/* <GuidelineCard /> */}
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='편안하게 마음을 나눠보세요. 여기는 안전한 공간입니다.'
                    className='min-h-[320px] rounded-xl'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 익명 설정 */}
        <FormField
          control={form.control}
          name='anonymous'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-lg font-semibold'>익명 설정</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={String(field.value)}
                  onValueChange={(v) => field.onChange(v === 'true')}
                  className='flex items-center gap-8'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='true' id='anon-true' />
                    <label htmlFor='anon-true'>익명으로 작성</label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='false' id='anon-false' />
                    <label htmlFor='anon-false'>닉네임으로 작성</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 숨김 필드(카테고리 코드) */}
        <input type='hidden' value={category} {...form.register('categoryCode')} />

        {/* 액션 */}
        <div className='flex items-center justify-end gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            className='h-11 rounded-xl'
            onClick={() => history.back()}
          >
            취소
          </Button>
          <Button type='submit' className='h-11 rounded-xl' disabled={isPending}>
            게시하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
