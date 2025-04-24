
import { Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { companyService } from '@/services/api';
import { Invitation } from '@/types';

const NotificationsDropdown = () => {
  const { toast } = useToast();

  const { data: invitations = [] } = useQuery({
    queryKey: ['user-invitations'],
    queryFn: async () => {
      const response = await companyService.getUserInvitations();
      return response;
    }
  });

  const pendingInvitations = invitations.filter(inv => inv.status === 'pending');

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await companyService.acceptInvitation(invitationId);
      toast({
        title: "Invitation accepted",
        description: "You have joined the company successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept invitation.",
        variant: "destructive",
      });
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      await companyService.rejectInvitation(invitationId);
      toast({
        title: "Invitation rejected",
        description: "The invitation has been rejected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject invitation.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {pendingInvitations.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {pendingInvitations.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          {pendingInvitations.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No pending invitations
            </div>
          ) : (
            pendingInvitations.map((invitation) => (
              <DropdownMenuItem key={invitation._id} className="flex flex-col items-start p-4">
                <div className="font-medium">Company Invitation</div>
                <p className="text-sm text-gray-500 mt-1">
                  You've been invited to join {invitation.company}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    onClick={() => handleAcceptInvitation(invitation._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRejectInvitation(invitation._id)}
                  >
                    Reject
                  </Button>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
