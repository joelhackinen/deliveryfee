import DeliveryForm from "./components/DeliveryForm";
import { Parameters } from "./components/DeliveryForm";

const App = () => {
  const calculateFee = (params: Parameters) => {
    const { cart, distance, amount, day, time } = params;
    const timeNumber = Number(time.split(":")[0]);
    const surcharge = cart >= 10 ? cart : 10 - cart;
    const deliveryFee = cart >= 1000 ? 0 : NaN;
    const feeMultiplier = day === 5 && (timeNumber >= 15 && timeNumber <= 19) ? 1.25 : 1.00;
    const fee = deliveryFee * feeMultiplier;
    const finalFee = fee > 15 ? 15 : fee;
    window.alert(`The delivery fee is ${finalFee}`);
  };

  // seuraavaks checkbox kysymään toimitusaikaa (rush hour?) ja joku kalenterihässäkkä.

  return (
    <div className="container" style={{ maxWidth: 1080, padding: 60 }}>
      <h1 className="mb-4">Delivery fee calculator</h1>
      <DeliveryForm calculateFee={calculateFee} />
    </div>
  );
};

export default App;
