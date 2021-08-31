import "../App.css";
import RingLoader from "react-spinners/RingLoader";
import React from 'react'

export const Loader = () => {
    return (
      <div className="dataLoader">
        <div className="load">
          <RingLoader />
        </div>
      </div>
    );
}