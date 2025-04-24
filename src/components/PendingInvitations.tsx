
import { useQuery } from '@tanstack/react-query';
import { companyService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PendingInvitations = () => {
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

  if (pendingInvitations.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
          <CardDescription>You have been invited to join the following companies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingInvitations.map((invitation) => (
            <div key={invitation._id} className="p-4 border rounded-lg space-y-3">
              <div>
                <h4 className="font-semibold">Company: {invitation.company}</h4>
                <p className="text-sm text-gray-500">Role: {invitation.role}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleAcceptInvitation(invitation._id)}
                >
                  Accept
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleRejectInvitation(invitation._id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingInvitations;
