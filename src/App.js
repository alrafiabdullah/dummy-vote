import { Toaster } from "react-hot-toast";

import './App.css';

import CandidateForm from "./components/CandidateForm";

function App() {
  return (
    <div className="container jumbotron">
      <h1 className="mt-5" align="center">Welcome to Dummy Vote!</h1>
      <Toaster position="top-center" />
      <CandidateForm />
    </div>
  );
}

export default App;
