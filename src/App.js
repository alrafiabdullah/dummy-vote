import { Toaster } from "react-hot-toast";

import './App.css';

import CandidateForm from "./components/CandidateForm";

function App() {
  let voted = localStorage.getItem("voted") === "true" ? true : false;

  return (
    <div className="container jumbotron">
      <h1 className="mt-5" align="center">Welcome to Dummy Vote!</h1>
      <Toaster position="top-center" />
      {voted ? <div align="center" className="alert alert-danger mt-5" role="alert">
        You can cast your vote only once!
      </div> : <CandidateForm />}
    </div>
  );
}

export default App;
