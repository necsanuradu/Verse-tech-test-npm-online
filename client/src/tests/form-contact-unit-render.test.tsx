import { render, queryByAttribute } from "@testing-library/react";
import React, { Component } from "react";
import {
  FormContactFormatron,
  list,
} from "../components/form-contact-formatron";
var listClone = JSON.parse(JSON.stringify(list));

describe("all input components are rendered inside the form", () => {
  const getByName = queryByAttribute.bind(null, "name");
  for (const component of Object.keys(listClone)) {
    test(`${component} - input components renders`, () => {
      const block = render(<FormContactFormatron />);

      expect(getByName(block.container, component)).toBeInTheDocument();
    });
  }
});
