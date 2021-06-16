import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import toast from "react-hot-toast";

import allCandidate from "../assets/candidates.json";
import CandidateList from "./CandidateList";
import Result from "./Result";

const CandidateForm = () => {
  // candidate hooks
  const [chairCandidate, setChairCandidate] = useState([]);
  const [viceChairCandidate, setViceChairCandidate] = useState([]);
  const [secretaryCandidate, setSecretaryCandidate] = useState([]);
  const [treasurerCandidate, setTreasurerCandidate] = useState([]);
  const [membershipChairCandidate, setMembershipChairCandidate] = useState([]);
  const [webmasterCandidate, setWebmasterCandidate] = useState([]);

  // result hook
  const [voteData, setVoteData] = useState({});

  // boolean hooks
  const [cleanResponse, setCleanResponse] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [opened, setOpened] = useState(false);

  /**
   * filters candidates by position
   * @param {array} candidateList
   * @param {string} position
   * @returns array
   */
  const filterCandidate = (candidateList, position) => {
    return candidateList
      .filter((candidate) => candidate.position === position)
      .map((filteredCandidate) => filteredCandidate);
  };

  /**
   * catches the data from onChange event of the form
   * @param {event} e
   */
  const changeHandler = (e) => {
    setVoteData({ ...voteData, [e.target.name]: parseInt(e.target.value) });
  };

  /**
   * catches the data from onSubmit event of the form
   * @param {event} e
   */
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(voteData);
    setSubmitted(true);
  };

  /**
   * confirms the voting options
   */
  const confirmationHandler = () => {
    setOpened(true);
    setConfirm(!confirm);
  };

  /**
   * randomizes the values of an array
   * @param {array} arr
   * @returns array
   */
  const randomizeArray = (arr) => {
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  };

  /**
   * removes the duplicate entry in an array
   * @param {array} arr
   * @returns array
   */
  const removeDuplicate = (arr) => {
    let c;
    let len = arr.length;
    let result = [];
    let obj = {};
    for (c = 0; c < len; c++) {
      obj[arr[c]] = 0;
    }
    for (c in obj) {
      result.push(c);
    }
    return result;
  };

  /**
   * sets the candidates when the page loads for the first time
   */
  useEffect(() => {
    setChairCandidate(randomizeArray(filterCandidate(allCandidate, "Chair")));
    setViceChairCandidate(
      randomizeArray(filterCandidate(allCandidate, "ViceChair"))
    );
    setSecretaryCandidate(
      randomizeArray(filterCandidate(allCandidate, "Secretary"))
    );
    setTreasurerCandidate(
      randomizeArray(filterCandidate(allCandidate, "Treasurer"))
    );
    setMembershipChairCandidate(
      randomizeArray(filterCandidate(allCandidate, "MembershipChair"))
    );
    setWebmasterCandidate(
      randomizeArray(filterCandidate(allCandidate, "Webmaster"))
    );
  }, []);

  /**
   * checks for duplicate choice selection
   */
  useEffect(() => {
    let values = Object.values(voteData);
    let newArr = removeDuplicate(values);
    if (values.length !== newArr.length) {
      toast.error("You already selected this candidate!.", {
        duration: 2000,
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#ff4500",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      setCleanResponse(false);
    } else {
      setCleanResponse(true);
    }
  }, [voteData]);

  return (
    <div>
      <Modal
        opened={opened}
        transition="rotate-left"
        transitionDuration={600}
        overflow="inside"
        onClose={() => setOpened(false)}
        title="Please Recheck Your Picks!"
      >
        <Result result={voteData} />
      </Modal>
      {submitted ? (
        <div align="center" className="mt-5">
          <div className="alert alert-success" role="alert">
            Thank you for exercising your constitutional right! Your casted
            votes are:
          </div>
          <Result result={voteData} />
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <CandidateList arr={chairCandidate} changeHandler={changeHandler} />
          <CandidateList
            arr={viceChairCandidate}
            changeHandler={changeHandler}
          />
          <CandidateList
            arr={secretaryCandidate}
            changeHandler={changeHandler}
          />
          <CandidateList
            arr={treasurerCandidate}
            changeHandler={changeHandler}
          />
          <CandidateList
            arr={membershipChairCandidate}
            changeHandler={changeHandler}
          />
          <CandidateList
            arr={webmasterCandidate}
            changeHandler={changeHandler}
          />

          <div className="mb-5 mt-5" align="center">
            {confirm ? (
              cleanResponse && (
                <input className="btn btn-danger" type="submit" value="Vote" />
              )
            ) : cleanResponse ? (
              <button className="btn btn-success" onClick={confirmationHandler}>
                Confirm
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={confirmationHandler}
                disabled={true}
              >
                Confirm
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default CandidateForm;
