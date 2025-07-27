import "./App.css";
import { Instructions } from "./Instructions";
import { Swap } from "./Swap";

function App() {
  return (
    <div className="card">
      <span className="text-3xl font-bold">Swap Tokens</span>
      <Swap />
      <Instructions />
    </div>
  );
}

export default App;
