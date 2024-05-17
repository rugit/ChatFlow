import { Toaster } from "react-hot-toast";
import FlowBuilder from "./components/FlowBuilder/FlowBuilder";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Toaster />
      <FlowBuilder />
    </div>
  );
}

export default App;
