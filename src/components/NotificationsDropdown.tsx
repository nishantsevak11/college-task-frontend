import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject invitation.",
        variant: "destructive",
      });
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-300 hover:text-neon-green hover:bg-white/5 transition-all duration-300"
        >
          <Bell className="h-5 w-5" />
          {invitations.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-400/80 text-[10px] font-inter font-medium text-black flex items-center justify-center"
            >
              {invitations.length}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-[#111111] border-white/10 glass-card shadow-xl p-1.5"
      >
        <DropdownMenuGroup>
          {invitations.length === 0 ? (
            <div className="p-4 text-sm text-black font-inter text-center">
              No pending invitations
            </div>
          ) : (
            invitations.map((invitation) => (
              <motion.div
                key={invitation.id}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
              >
                <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="font-syne font-medium text-white">Company Invitation</div>
                  <p className="text-sm text-gray-300 font-inter mt-1">
                    You've been invited to join <strong>{invitation.companyName}</strong>
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleAcceptInvitation(invitation.id)}
                      className="bg-gradient-to-r from-neon-green to-emerald-400 text-black font-inter font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRejectInvitation(invitation.id)}
                      className="border-neon-green text-neon-green hover:bg-neon-green/20 font-inter font-semibold rounded-lg transition-all duration-300"
                    >
                      Reject
                    </Button>
                  </div>
                </DropdownMenuItem>
              </motion.div>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;