import { CloseButton, Modal, Table } from "react-bootstrap";
import { Fee } from "../types";
import { DESCRIPTIONS, BASE_FEE, MAX_FEE, FREE_DELIVERY_THRESHOLD } from "../utils/constants";
import { isEmpty, roundToTwo } from "../utils/helper";


const FeeModal = ({ fee, hide } : { fee: Fee, hide: () => void }) => {
  console.log("<Feemodal /> render")
  if (isEmpty(fee)) {
    return null;
  }

  const {
    cart,
    totalFee,
    distanceFee,
    itemFee,
    surcharge,
    rushFee,
    unlimitedFee,
    limitedFlag
  } = fee;

  if (cart >= FREE_DELIVERY_THRESHOLD) {
    return (
      <Modal show onHide={hide} id="fee-modal">
        <Modal.Header>
          <Modal.Title>
            Delivery fee: {roundToTwo(fee.totalFee)} €
          </Modal.Title>
          <CloseButton id="close-button" onClick={hide} />
        </Modal.Header>
        <Modal.Body>
          No delivery fee because the cart value is {FREE_DELIVERY_THRESHOLD}€ or more euros.
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show onHide={hide} id="fee-modal">
      <Modal.Header>
        <Modal.Title>
          Delivery fee: {roundToTwo(fee.totalFee)} €
        </Modal.Title>
        <CloseButton id="close-button" onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Fee amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Base fee</td>
              <td>+{BASE_FEE}€</td>
            </tr>
            {
              [surcharge, distanceFee, itemFee, rushFee]
                .map((f, i) => (
                  f !== 0 &&
                    <tr key={i}>
                      <td>{DESCRIPTIONS[i]}</td>
                      <td>+{roundToTwo(f)}€</td>
                    </tr>
                ))
            }
          </tbody>
            {
              limitedFlag &&
              <thead>
                <tr>
                  <td>Fee limit is {MAX_FEE}€</td>
                  <td>-{roundToTwo(unlimitedFee - MAX_FEE)}€</td>
                </tr>
              </thead>
            }
          <thead>
            <tr>
              <th>Total:</th>
              <th>{roundToTwo(totalFee)}€</th>
            </tr>
          </thead>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default FeeModal;