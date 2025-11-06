import { Badge } from '@/shared/ui/badge';
import { Calendar, Heart, MessageCircle, Eye } from 'lucide-react';
import { getCategoryColor } from '../lib/activityUtils';
import { formatDate } from '@/shared/lib/date';
import type { MyComment, MyLikedPost, MyPost } from '../types/activity';
// import { useNavigate } from 'react-router-dom';

/* -------------------- 공통 카드 베이스 -------------------- */
interface ActivityCardBaseProps {
  badgeLabel: string;
  badgeColor: string;
  title?: string;
  subtitle?: string;
  content?: string;
  date: string;
  stats?: React.ReactNode;
  // postId: number;
}

const ActivityCardBase = ({
  badgeLabel,
  badgeColor,
  title,
  subtitle,
  content,
  date,
  stats,
  // postId,
}: ActivityCardBaseProps) => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(`/posts/${postId}`);
  // };
  return (
    <div
      // onClick={handleClick}
      className='cursor-pointer rounded-lg border bg-white p-5 transition-colors hover:bg-gray-50 active:bg-gray-100'
    >
      <div className='mb-3 flex justify-between'>
        <div className='flex-1'>
          <div className='mb-2 flex items-center justify-between'>
            {/* 왼쪽 영역: 뱃지 + 서브타이틀 */}
            <div className='flex items-center space-x-2'>
              <Badge className={badgeColor}>{badgeLabel}</Badge>
              {subtitle && <span className='text-sm font-medium text-blue-600'>{subtitle}</span>}
            </div>

            {/* 오른쪽 영역: 날짜 */}
            <div className='flex items-center text-sm text-gray-500'>
              <Calendar className='mr-1 h-4 w-4' />
              {formatDate(date)}
            </div>
          </div>

          {title && <h4 className='mb-2 text-lg font-semibold text-gray-900'>{title}</h4>}
          {content && <p className='mb-3 text-sm leading-relaxed text-gray-600'>{content}</p>}
        </div>
      </div>

      {stats && <div className='flex items-center space-x-6 text-sm text-gray-600'>{stats}</div>}
    </div>
  );
};

/* -------------------- 내가 쓴 글 카드 -------------------- */
export const ActivityPostCard = ({ post }: { post: MyPost }) => {
  return (
    <ActivityCardBase
      // postId={post.id}
      badgeLabel={post.displayName}
      badgeColor={getCategoryColor(post.displayName)}
      title={post.title}
      content={post.content}
      date={post.createdAt}
      stats={
        <>
          <span className='flex items-center'>
            <Heart className='mr-1 h-4 w-4 text-red-500' /> 좋아요 {post.likeCount}
          </span>
          <span className='flex items-center'>
            <MessageCircle className='mr-1 h-4 w-4 text-blue-500' /> 댓글 {post.commentCount}
          </span>
          <span className='flex items-center'>
            <Eye className='mr-1 h-4 w-4 text-gray-500' /> 조회 {post.viewCount}
          </span>
        </>
      }
    />
  );
};

/* -------------------- 내 댓글 카드 -------------------- */
export const CommentCard = ({ comment }: { comment: MyComment }) => {
  return (
    <ActivityCardBase
      // postId={comment.postId}
      badgeLabel={comment.displayName}
      badgeColor={getCategoryColor(comment.displayName)}
      subtitle={comment.postTitle}
      content={`해당 게시물에 ${comment.content}을 달았습니다.`}
      date={comment.createdAt}
      stats={
        <span className='flex items-center'>
          <Heart className='mr-1 h-4 w-4 text-red-500' /> 좋아요 {comment.likeCount}
        </span>
      }
    />
  );
};

/* -------------------- 좋아요한 글 카드 -------------------- */
export const LikedPostCard = ({ post }: { post: MyLikedPost }) => {
  return (
    <ActivityCardBase
      // postId={post.postId}
      badgeLabel={post.displayName}
      badgeColor={getCategoryColor(post.displayName)}
      title={post.postTitle}
      content={post.postContent}
      date={post.postCreatedAt}
      stats={
        <>
          <span className='flex items-center'>
            <Heart className='mr-1 h-4 w-4 text-red-500' /> 좋아요 {post.likeCount}
          </span>
          <span className='flex items-center'>
            <MessageCircle className='mr-1 h-4 w-4 text-blue-500' /> 댓글 {post.commentCount}
          </span>
        </>
      }
    />
  );
};
