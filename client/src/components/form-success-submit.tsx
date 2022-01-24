import React, { useEffect, useState } from "react";

const SuccessSubmit = ({ submitedData }) => {
  const [formData, setFormData] = useState(submitedData);
  useEffect(() => {
    setFormData(submitedData);
  }, [submitedData]);
  return (
    formData && (
      <>
        <h3>Form data</h3>
        <div id="success-submit" className="w-100">
          {formData}
        </div>
      </>
    )
  );
};
export default SuccessSubmit;
