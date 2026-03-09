// Reuse EditStylistModal but without passing a stylist
import EditStylistModal from './EditStylist';

export default function CreateStylist({ isOpen, onClose, onSave }) {
  return (
    <EditStylistModal
      isOpen={isOpen}
      onClose={onClose}
      stylist={null}
      onSave={onSave}
    />
  );
}