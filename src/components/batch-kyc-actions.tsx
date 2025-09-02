
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface BatchKycActionsProps {
  selectedIds: string[];
  onBatchAction: (action: string, ids: string[]) => void;
  disabled?: boolean;
}

export function BatchKycActions({ selectedIds, onBatchAction, disabled }: BatchKycActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onBatchAction('approve', selectedIds)}
        disabled={disabled || selectedIds.length === 0}
        size="sm"
        className="bg-green-600 hover:bg-green-700"
      >
        <CheckCircle className="h-4 w-4 mr-1" />
        Approve Selected ({selectedIds.length})
      </Button>
      <Button
        onClick={() => onBatchAction('reject', selectedIds)}
        disabled={disabled || selectedIds.length === 0}
        size="sm"
        variant="destructive"
      >
        <XCircle className="h-4 w-4 mr-1" />
        Reject Selected ({selectedIds.length})
      </Button>
    </div>
  );
}
