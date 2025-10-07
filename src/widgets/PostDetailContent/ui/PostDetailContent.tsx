import { usePostDetailQuery } from '@/entities/post/model/usePostDetail';
import CommentList from '@/entities/comment/ui/CommentList';
import { PostDetail } from '@/entities/post/ui/PostDetail';
import { useToggleLike } from '@/features/like-post';
import { AddCommentForm } from '@/features/add-comment/ui/AddCommentForm';

type Props = {
  postId: number;
};

export function PostDetailContent({ postId }: Props) {
  const { data } = usePostDetailQuery(postId);
  const { mutate } = useToggleLike();

  return (
    <div className='space-y-6'>
      <PostDetail post={data} onClickLike={(postId: number) => mutate(postId)} />

      {/* 댓글 추가 박스 */}
      <AddCommentForm postId={postId} />

      {/* 댓글 리스트 */}
      <CommentList postId={postId} />
    </div>
  );
}

export default PostDetailContent;
