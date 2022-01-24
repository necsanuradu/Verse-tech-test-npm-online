import { render, fireEvent } from "@testing-library/react";
import React, { Component } from "react";
import { act } from "react-dom/test-utils";
import {
  FormContactFormatron,
  list,
} from "../components/form-contact-formatron";
var listClone = JSON.parse(JSON.stringify(list));
jest.setTimeout(30000);

describe("checks there is NO Error message for valid input", () => {
  listClone.name.shouldPass = ["James", "john", "Red Square"];
  listClone.company.shouldPass = ["James", " john", "Red Square1", " ", ""];
  listClone.telephone.shouldPass = ["00011122233", "33344455566"];
  listClone.email.shouldPass = ["abc@def.ghj", "fgh@yui.co.uk"];
  listClone.comment.shouldPass = [
    [...new Array(20)].map(() => "a").join(""),
    [...new Array(300)].map(() => "a").join(""),
    [...new Array(500)].map(() => "a").join(""),
  ];

  for (const component of Object.keys(listClone)) {
    listClone[component]["shouldPass"].forEach((inputValue) => {
      test(`${component} for value: "${inputValue}" - should NOT render Error under`, async () => {
        const block = render(<FormContactFormatron />);
        const fields = block.container.querySelectorAll(
          `[name='${component}']`
        );
        await act(async () => {
          fireEvent.change(fields[0], { target: { value: inputValue } });
        });
        await act(async () => {
          fireEvent.blur(fields[0]);
        });
        expect(
          fields[0].nextElementSibling === null ||
            fields[0].nextElementSibling.tagName.toLowerCase() !== "div"
        ).toBeTruthy();
      });
    });
  }
});
