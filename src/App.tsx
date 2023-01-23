import DeliveryForm from "./components/DeliveryForm";
import { Parameters } from "./components/DeliveryForm";

const App = () => {
  const calculateFee = (params: Parameters) => {
    const { cart, distance, amount, rushHour } = params;
    window.alert("button pressed");
    console.log(cart + distance + amount + (rushHour ? 5 : 0))
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
