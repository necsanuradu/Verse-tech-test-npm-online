import React, { useState } from "react";
import { Formatron, Input, Textarea } from "formidable-forms-state";
import SuccessSubmit from "./form-success-submit";
import ConsentMessage from "./consent-message";

interface InputListMap {
  [key: string]: string | boolean;
}
interface ListMap {
  [key: string]: InputListMap;
}
const list: ListMap = {
  name: {
    type: "text",
    placeholder: "Your name",
    "data-pattern": "[a-z ]+",
    "data-required": true,
    "data-error-message": "* name must contain only alphabetic characters",
    "data-required-message": "* please provide a valid name",
  },
  company: {
    type: "text",
    placeholder: "Company name",
    "data-pattern": "[^\\?]+",
    "data-error-message": "* company may include any type of charcters",
  },
  telephone: {
    type: "text",
    placeholder: "Telephone",
    "data-pattern": "[0-9]{11}",
    "data-required": true,
    "data-error-message": "* telephone number must be 10 digits long",
    "data-required-message": "* please provide a valid UK telephone number",
  },
  email: {
    type: "text",
    placeholder: "Email address",
    "data-pattern":
      "[a-zA-Z0-9_\\.\\-]+@[a-zA-Z0-9\\-]+\\.([a-zA-Z]{3}|[a-zA-Z]{2}\\.[a-zA-Z0-9]{2})",
    "data-error-message": "* please provide a valid email address",
  },
  comment: {
    "data-as": "textarea",
    placeholder: "Enter a message...",
    "data-pattern": "(.){20,500}",
    "data-required": true,
    rows: "7",
    "data-error-message":
      "* please provide a message that is between 20 and 500 characters in length",
    "data-required-message": "* please provide a message",
  },
};

const getInputGroupLeftOrRight = (start: number, end: number) => {
  return Object.keys(list)
    .slice(start, end)
    .map((name) => {
      return "data-as" in list[name] && list[name]["data-as"] === "textarea" ? (
        <Textarea
          key={name}
          name={name}
          className="form-control col-12 col-md-6"
        />
      ) : (
        <Input
          key={name}
          name={name}
          className="form-control col-12 col-md-6"
        />
      );
    });
};

const FormContactFormatron = () => {
  const [successSubmit, setSuccessSubmit] = useState("");
  const FormComponentsLeft = getInputGroupLeftOrRight(0, 4);
  const FormComponentsRight = getInputGroupLeftOrRight(4, 5);

  return (
    <div id="contact-form">
      <h1 className="text-start">Contact us</h1>

      <Formatron
        onSubmit={(data) => {
          setSuccessSubmit(JSON.stringify(data));
        }}
        method="get"
        action="/"
        list={list}
        form={
          <>
            <SuccessSubmit submitedData={successSubmit} />
            <div className="row">
              <div className="col-12 col-md-6">{FormComponentsLeft}</div>
              <div className="col-12 col-md-6">{FormComponentsRight}</div>
              <div className="col-md-12">
                <button
                  type="submit"
                  className="btn btn-primary btn-md mt-2 btn-block float-end col-12 col-md-3"
                >
                  Send
                </button>
                <ConsentMessage />
                <div className="mt-2 float-end px-0 px-md-3 col-12 col-md-3 text-start ps-0">
                  <button
                    type="reset"
                    onClick={() => setSuccessSubmit("")}
                    className="btn btn-block clearForm ms-0 ps-0"
                  >
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export { FormContactFormatron, list };
