// components/StatusModalContainer.tsx
import StatusModal from '../StatusModal';

type StatusModalContainerProps = {
  currentStatus: string;
  currentJobId: number | null;
  updateJobStatus: (id: number, status: string, additionalData?: any) => Promise<void>;
  closeStatusModal: () => void;
};

const StatusModalContainer = ({ currentStatus, currentJobId, updateJobStatus, closeStatusModal }: StatusModalContainerProps) => {
  const handleUpdateStatus = async (status: string, additionalData?: any) => {
    if (!currentJobId) return;
    await updateJobStatus(currentJobId, status, additionalData);
    closeStatusModal();
  };

  return (
    <StatusModal
      currentStatus={currentStatus}
      onUpdateStatus={handleUpdateStatus}
      onClose={closeStatusModal}
    />
  );
};

export default StatusModalContainer;
