import { Modal } from "react-bootstrap";

const FeeModal = ({ fee, hide } : { fee: number, hide: () => void }) => {
  if (isNaN(fee)) {
    return null;
  }

  return (
    <Modal show onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {fee} €
        </Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default FeeModal;