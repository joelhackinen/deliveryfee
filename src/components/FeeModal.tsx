import { Modal, Table } from "react-bootstrap";
import { Fee } from "../types";
import { isEmpty, roundToTwo } from "../utils/helper";

const FeeModal = ({ fee, hide } : { fee: Fee, hide: () => void }) => {
  if (isEmpty(fee)) {
    return null;
  }

  const { totalFee, totalPrice, distanceFee, itemFee, surcharge, multiplier, limitedFee } = fee;

  const basicFee = distanceFee + surcharge + itemFee;

  return (
    <Modal show onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Your delivery fee is {fee.totalFee} €
        </Modal.Title>
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
              <td>+2€</td>
            </tr>
            {
              surcharge === 0
                ? null
                : <tr>
                    <td>Small order surcharge</td>
                    <td>+{surcharge}€</td>
                  </tr>
            }
            {
              distanceFee === 2
                ? null
                : <tr>
                    <td>Distance fee</td>
                    <td>+{distanceFee}€</td>
                  </tr>
            }
            {
              itemFee === 0
                ? null
                : <tr>
                    <td>Item fee</td>
                    <td>+{itemFee}€</td>
                  </tr>
            }
            {
              multiplier === 1
                ? null
                : <tr>
                    <td>Friday rush extra fee</td>
                    <td>+{roundToTwo(0.2 * basicFee)}€</td>
                  </tr>
            }
          </tbody>
          <thead>
            <tr>
              <th>Total:</th>
              <th>{totalFee}€</th>
            </tr>
          </thead>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default FeeModal;