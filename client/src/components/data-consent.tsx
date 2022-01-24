import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
const DataConsent: FunctionComponent = () => {
  return (
    <>
      <h1>Data Consent</h1>
      <NavLink className="nav-link" to="/">
        Back
      </NavLink>
      Submitting your details indicates your consent for us to process your
      personal data.
    </>
  );
};
export default DataConsent;
