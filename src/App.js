import Inputs from "./components/Inputs";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Inputs title="imagine stacking pizza" value={{ length: 50, width: 50, height: 10 }} />
      <Inputs title="custom products" />
    </div>
  );
}
