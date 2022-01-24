import { render, fireEvent, screen, getByText } from "@testing-library/react";
import React, { Component } from "react";
import { act } from "react-dom/test-utils";
import {
  FormContactFormatron,
  list,
} from "../components/form-contact-formatron";
var listClone = JSON.parse(JSON.stringify(list));
jest.setTimeout(30000);

describe("checks there is an Error message required not present input", () => {
  listClone.name.shouldFail = ["1"];
  listClone.company.shouldFail = [];
  listClone.telephone.shouldFail = ["1"];
  listClone.email.shouldFail = [];
  listClone.comment.shouldFail = ["1"];

  for (const component of Object.keys(listClone)) {
    listClone[component]["shouldFail"].forEach((inputValue) => {
      test(`${component} for value: "${inputValue}" - should render Error under`, async () => {
        const block = render(<FormContactFormatron />);
        const fields = block.container.querySelectorAll(
          `[name='${component}']`
        );
        await act(async () => {
          fireEvent.change(fields[0], { target: { value: inputValue } });
        });
        await act(async () => {
          const submitButton = screen.getByRole("button", {
            name: /send/i,
          });
          fireEvent.click(submitButton);
        });
        await act(async () => {
          const submitButton = screen.getByRole("button", {
            name: /send/i,
          });
          fireEvent.click(submitButton);
        });
        expect(
          fields[0].nextElementSibling.tagName.toLowerCase() === "div"
        ).toBeTruthy();
      });
    });
  }
});
