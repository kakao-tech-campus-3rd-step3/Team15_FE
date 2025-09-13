export function PostMeta({ likes, comments }: { likes: number; comments: number }) {
  return (
    <div className='text-muted-foreground flex items-center gap-4 text-sm'>
      <span>❤ {likes}</span>
      <span>💬 {comments}</span>
    </div>
  );
}
