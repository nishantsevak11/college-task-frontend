import { useState } from 'react';
import { Comment, User, getUserName } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

type CommentSectionProps = {
  comments: Comment[];
  taskId: string;
  currentUser: User;
  onAddComment: (taskId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  isSubmitting?: boolean;
};

const CommentSection = ({
  comments,
  taskId,
  currentUser,
  onAddComment,
  onDeleteComment,
  isSubmitting = false,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(taskId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Comments</h3>

      <div className="flex gap-3">
        <Avatar className="h-8 w-8 mt-1">
          {currentUser.avatar ? (
            <AvatarImage src={currentUser.avatar} alt={currentUser.firstName} />
          ) : (
            <AvatarFallback>{currentUser.firstName.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none"
          />
          <Button size="sm" onClick={handleSubmit} disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 animate-fade-in">
              <Avatar className="h-8 w-8 mt-1">
                {comment.author?.avatar ? (
                  <AvatarImage src={comment.author.avatar} alt={getUserName(comment.author)} />
                ) : (
                  <AvatarFallback>{comment.author?.firstName.charAt(0) || '?'}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{getUserName(comment.author)}</span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                  </span>
                  {comment.author?._id === currentUser._id && (
                    <div className="flex gap-2 ml-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => alert('Edit comment not implemented')}
                        title="Edit comment"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDeleteComment(comment._id)}
                        title="Delete comment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-sm bg-secondary p-3 rounded-md">{comment.content}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;