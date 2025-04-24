import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { useAuth } from '@/context/AuthContext';

interface LocalInvitation {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
}

const NotificationsDropdown = () => {
  const { toast } = useToast();
  const { userData } = useAuth();

  const [invitations, setInvitations] = useState<LocalInvitation[]>([]);

  useEffect(() => {
    const fetchInvitations = () => {
      const pendingInvitationsJSON = localStorage.getItem('pendingInvitations');
      if (pendingInvitationsJSON) {
        try {
          const parsed: LocalInvitation[] = JSON.parse(pendingInvitationsJSON);
          const pendingOnly = parsed.filter(inv => inv.status === 'pending');
          setInvitations(pendingOnly);
        } catch (err) {
          console.error("Error parsing pendingInvitations from localStorage", err);
        }
      }
    };
  
    fetchInvitations();
  }, []);
  

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await companyService.acceptInvitation(invitationId);
      toast({
        title: "Invitation accepted",
        description: "You have joined the company successfully.",
      });

      // remove the accepted one from state
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
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

      // remove the rejected one from state
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
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
          {invitations.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {invitations.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          {invitations.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No pending invitations
            </div>
          ) : (
            invitations.map((invitation) => (
              <DropdownMenuItem key={invitation.id} className="flex flex-col items-start p-4">
                <div className="font-medium">Company Invitation</div>
                <p className="text-sm text-gray-500 mt-1">
                  You've been invited to join <strong>{invitation.companyName}</strong>
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    onClick={() => handleAcceptInvitation(invitation.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRejectInvitation(invitation.id)}
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
