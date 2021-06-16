import React from "react";
import { getPosition, choiceSerial } from "../utils/functions";

const CandidateList = ({ arr, changeHandler }) => {
  /**
   * creates dynamic name
   * @param {string} position
   * @param {int} index
   * @returns string
   */
  const nameMaker = (position, index) => {
    return `${index}${position}`;
  };

  return (
    <div>
      {arr.length !== 0 ? (
        <div className="card mt-5">
          <div className="card-body">
            <h3 align="center" className="card-title">
              <strong>{getPosition(arr[0].position)} Candidates</strong>
            </h3>
            <div align="center" className="alert alert-info" role="alert">
              Please select different candidate for different choices!
            </div>
            {arr.map((_, index) => (
              <div className="card-body" key={index}>
                <h5 className="card-subtitle mb-2 text-muted">
                  {choiceSerial(index)} Choice
                </h5>
                {arr.map((candidate) => (
                  <div className="form-check" key={candidate.id}>
                    <>
                      <input
                        required={true}
                        className="form-check-input"
                        type="radio"
                        id={index}
                        name={nameMaker(candidate.position, index)}
                        value={candidate.id}
                        onChange={changeHandler}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={candidate.id}
                      >
                        {candidate.name}
                      </label>
                    </>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h3>No Candidates to Show!</h3>
        </>
      )}
    </div>
  );
};

export default CandidateList;
