
import { useState } from 'react';
import { Comment, User, getUserName } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

type CommentSectionProps = {
  comments: Comment[];
  taskId: string;
  currentUser: User;
  onAddComment: (taskId: string, content: string) => void;
  isSubmitting?: boolean;
};

const CommentSection = ({ 
  comments, 
  taskId, 
  currentUser, 
  onAddComment,
  isSubmitting = false
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
          <AvatarFallback>{currentUser.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="resize-none"
          />
          <Button 
            size="sm" 
            onClick={handleSubmit} 
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No comments yet</p>
        ) : (
          comments.map(comment => (
            <div key={comment._id} className="flex gap-3 animate-fade-in">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback>{comment.author?.firstName.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{getUserName(comment.author)}</span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                  </span>
                </div>
                <div className="text-sm bg-secondary p-3 rounded-md">
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
