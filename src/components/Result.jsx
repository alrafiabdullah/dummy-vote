import React from "react";

import { getPosition, choiceSerial } from "../utils/functions";
import allCandidate from "../assets/candidates.json";

const Result = ({ result }) => {
  /**
   * filters candidate by id
   * @param {int} serial
   * @returns array
   */
  const getCandidate = (serial) => {
    return allCandidate.filter((candidate) => candidate.id === serial);
  };

  const properties = Object.values(result);
  const keys = Object.keys(result);
  let newArr = [];

  for (let i = 0; i < properties.length; i++) {
    let candidate = getCandidate(properties[i]);
    newArr.push(candidate[0]);
  }

  return (
    <div>
      <h3>Result</h3>
      <div className="row mt-3 mb-3">
        {newArr.map((values, index) => (
          <div className="col-sm-6" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {choiceSerial(keys[index][0])} {getPosition(values.position)}{" "}
                  Choice
                </h5>
                <div className="card mt-3">
                  <div className="card-body">
                    <p className="card-text">{values.name}</p>
                    <p className="card-text">{getPosition(values.position)}</p>
                    <small>NSU ID: {values.NSUID}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
