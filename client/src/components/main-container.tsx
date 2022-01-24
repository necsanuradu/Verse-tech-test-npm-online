import React from "react";
import DataConsent from "./data-consent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormContactFormatron } from "./form-contact-formatron";

type CardProps = {
  title?: string;
};

export const MainContainer = ({ title }: CardProps) => (
  <div className="container px-3 py-3">
    <Router>
      <Routes>
        <Route path="/" element={<FormContactFormatron />} />
      </Routes>
      <Routes>
        <Route path="/data-consent" element={<DataConsent />} />
      </Routes>
    </Router>
  </div>
);
