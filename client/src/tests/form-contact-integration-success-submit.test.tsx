import {
  render,
  fireEvent,
  screen,
  queryByAttribute,
} from "@testing-library/react";
import React, { Component } from "react";
import { act } from "react-dom/test-utils";
import {
  FormContactFormatron,
  list,
} from "../components/form-contact-formatron";
var listClone = JSON.parse(JSON.stringify(list));
jest.setTimeout(30000);

const scenario = async (block) => {
  await act(async () => {
    for (const component of Object.keys(listClone)) {
      const field = block.container.querySelectorAll(`[name='${component}']`);
      fireEvent.change(field[0], {
        target: { value: listClone[component].shouldSubmit },
      });
    }
  });
  await act(async () => {
    const submitButton = screen.getByRole("button", {
      name: /send/i,
    });
    fireEvent.click(submitButton);
  });
};

describe("checks submit is successful", () => {
  const getById = queryByAttribute.bind(null, "id");
  test("name, telephone and comment hold valid data", async () => {
    listClone.name.shouldSubmit = "Ray";
    listClone.company.shouldSubmit = "";
    listClone.telephone.shouldSubmit = "11122233344";
    listClone.email.shouldSubmit = "";
    listClone.comment.shouldSubmit = [...new Array(50)].map(() => "a").join("");

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).toBeInTheDocument();
  });
});
