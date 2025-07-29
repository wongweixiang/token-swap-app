import "./App.css";
import { Instructions } from "./Instructions";
import { SwapForm } from "./SwapForm";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="py-8 px-0 md:px-32">
      <span className="text-3xl font-bold">Swap Tokens</span>
      <SwapForm />
      <Instructions />
      <Toaster />
    </div>
  );
}

export default App;
