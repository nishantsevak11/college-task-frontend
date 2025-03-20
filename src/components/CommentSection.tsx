
import { useState } from 'react';
import { Comment, User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

type CommentSectionProps = {
  comments: Comment[];
  taskId: string;
  currentUser: User;
  onAddComment: (taskId: string, content: string) => void;
};

const CommentSection = ({ comments, taskId, currentUser, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (newComment.trim()) {
      setIsSubmitting(true);
      onAddComment(taskId, newComment);
      setNewComment('');
      setTimeout(() => setIsSubmitting(false), 500);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Comments</h3>
      
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
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
            <div key={comment.id} className="flex gap-3 animate-fade-in">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={comment.author?.avatar} />
                <AvatarFallback>{comment.author?.name.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.author?.name}</span>
                  <span className="text-xs text-gray-500">
                    {format(comment.createdAt, 'MMM d, yyyy • h:mm a')}
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
