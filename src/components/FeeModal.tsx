import { CloseButton, Modal, Table } from "react-bootstrap";
import { ModalProps } from "../types";
import { DESCRIPTIONS, BASE_FEE, MAX_FEE, FREE_DELIVERY_THRESHOLD } from "../utils/constants";
import { roundToTwoDecimals } from "../utils/helper";


const FeeModal = ({ fee, hide }: ModalProps) => {  
  if (!fee) {
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


  return (
    <Modal show onHide={hide} id="fee-modal">
      <Modal.Header>
        <Modal.Title>
          Delivery fee: {totalFee} €
        </Modal.Title>
        <CloseButton onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        {
          cart >= FREE_DELIVERY_THRESHOLD
            ? <p>No delivery fee because the cart value is {FREE_DELIVERY_THRESHOLD}€ or more euros.</p>
            :
        
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
                        <td>+{f}€</td>
                      </tr>
                  ))
              }
            </tbody>
              {
                limitedFlag &&
                <thead>
                  <tr>
                    <td>Total:</td>
                    <td>{unlimitedFee}€</td>
                  </tr>
                  <tr>
                    <td>Fee limit is {MAX_FEE}€</td>
                    <td>-{roundToTwoDecimals(unlimitedFee - MAX_FEE)}€</td>
                  </tr>
                </thead>
              }
            <thead>
              <tr>
                <th>Total:</th>
                <th>{totalFee}€</th>
              </tr>
            </thead>
          </Table>
        }
      </Modal.Body>
    </Modal>
  );
};

export default FeeModal;