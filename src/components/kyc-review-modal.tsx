
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface KycReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: any;
  onAction: (action: string) => void;
}

export function KycReviewModal({ isOpen, onClose, submission, onAction }: KycReviewModalProps) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: string) => {
    setLoading(true);
    try {
      await onAction(action);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!submission) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>KYC Review - {submission.fullName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Badge variant="outline">{submission.status}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium">Submission Date</label>
              <p className="text-sm">{new Date(submission.submittedAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => handleAction('approve')} 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button 
              onClick={() => handleAction('reject')} 
              disabled={loading}
              variant="destructive"
            >
              Reject
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
