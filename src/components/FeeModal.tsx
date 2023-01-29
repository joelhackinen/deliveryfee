import { Modal, Table } from "react-bootstrap";
import { Fee } from "../types";
import { isEmpty } from "../utils/helper";

const descriptions = [
  "Small order surcharge",
  "Distance fee",
  "Item fee",
  "Friday rush extra fee"
]

const FeeModal = ({ fee, hide } : { fee: Fee, hide: () => void }) => {
  if (isEmpty(fee)) {
    return null;
  }

  const { cart, totalFee, distanceFee, itemFee, surcharge, rushFee, limitedFlag } = fee;

  return (
    <Modal show onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Your delivery fee is {fee.totalFee} €
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          cart >= 100
            ? <p>No delivery fee because the cart value is 100€ or more euros.</p>
            : <Table>
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
                    [surcharge, distanceFee, itemFee, rushFee]
                      .map((f, i) => (
                        f !== 0 &&
                          <tr key={i}>
                            <td>{descriptions[i]}</td>
                            <td>+{f}€</td>
                          </tr>
                      ))
                  }
                  {
                    !limitedFlag
                      ? null
                      : <p>Fee limit is 15€</p>
                  }
                </tbody>
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