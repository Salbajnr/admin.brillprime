import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface KycDocument {
  id: string;
  fullName?: string;
  status: string;
  submittedAt: string;
  // Add other relevant properties of a KYC document here
}

interface KycReviewModalProps {
  document: KycDocument;
  isOpen: boolean;
  onClose: () => void;
  onReview: (documentId: string, action: 'approve' | 'reject', reason?: string) => Promise<void>;
}

export function KycReviewModal({ isOpen, onClose, document, onReview }: KycReviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  const handleAction = async (action: string) => {
    setLoading(true);
    try {
      await onReview(document.id, action as 'approve' | 'reject', action === 'reject' ? reason : undefined);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>KYC Review - {document.fullName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Badge variant="outline">{document.status}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium">Submission Date</label>
              <p className="text-sm">{new Date(document.submittedAt).toLocaleDateString()}</p>
            </div>
          </div>
          {document.status === 'pending_review' && (
            <div className="space-y-2">
              <label htmlFor="rejection-reason" className="text-sm font-medium">
                Rejection Reason (if applicable)
              </label>
              <textarea
                id="rejection-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="Enter reason for rejection..."
                rows={3}
              />
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => handleAction('approve')}
              disabled={loading || document.status !== 'pending_review'}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button
              onClick={() => handleAction('reject')}
              disabled={loading || document.status !== 'pending_review'}
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