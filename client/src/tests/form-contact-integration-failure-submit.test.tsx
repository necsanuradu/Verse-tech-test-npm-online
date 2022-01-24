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
        target: { value: listClone[component].shouldNotSubmit },
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

describe("checks submit is failing", () => {
  const getById = queryByAttribute.bind(null, "id");
  test("email field holds invalid data", async () => {
    listClone.name.shouldNotSubmit = "Ray";
    listClone.company.shouldNotSubmit = "";
    listClone.telephone.shouldNotSubmit = "11122233344";
    listClone.email.shouldNotSubmit = "Not an email";
    listClone.comment.shouldNotSubmit = [...new Array(50)]
      .map(() => "a")
      .join("");

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).not.toBeInTheDocument();
  });

  test("name field holds invalid data", async () => {
    listClone.name.shouldNotSubmit = "Not a name 3";
    listClone.company.shouldNotSubmit = "";
    listClone.telephone.shouldNotSubmit = "11122233344";
    listClone.email.shouldNotSubmit = "asd@yahoo.ooo";
    listClone.comment.shouldNotSubmit = [...new Array(50)]
      .map(() => "a")
      .join("");

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).not.toBeInTheDocument();
  });

  test("telephone field holds invalid data", async () => {
    listClone.name.shouldNotSubmit = "Ray";
    listClone.company.shouldNotSubmit = "";
    listClone.telephone.shouldNotSubmit = "Not a phone number";
    listClone.email.shouldNotSubmit = "asd@yahoo.ooo";
    listClone.comment.shouldNotSubmit = [...new Array(50)]
      .map(() => "a")
      .join("");

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).not.toBeInTheDocument();
  });

  test("comment field holds invalid data", async () => {
    listClone.name.shouldNotSubmit = "Ray";
    listClone.company.shouldNotSubmit = "";
    listClone.telephone.shouldNotSubmit = "11122233344";
    listClone.email.shouldNotSubmit = "asd@yahoo.ooo";
    listClone.comment.shouldNotSubmit = "Short comment";

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).not.toBeInTheDocument();
  });

  test("name field holds no data, is required", async () => {
    listClone.name.shouldNotSubmit = "";
    listClone.company.shouldNotSubmit = "";
    listClone.telephone.shouldNotSubmit = "11122233344";
    listClone.email.shouldNotSubmit = "asd@yahoo.ooo";
    listClone.comment.shouldNotSubmit = [...new Array(50)]
      .map(() => "a")
      .join("");

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).not.toBeInTheDocument();
  });

  test("telephone field holds no data, is required", async () => {
    listClone.name.shouldNotSubmit = "James";
    listClone.company.shouldNotSubmit = "";
    listClone.telephone.shouldNotSubmit = "";
    listClone.email.shouldNotSubmit = "asd@yahoo.ooo";
    listClone.comment.shouldNotSubmit = [...new Array(50)]
      .map(() => "a")
      .join("");

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).not.toBeInTheDocument();
  });

  test("comment field holds no data, is required", async () => {
    listClone.name.shouldNotSubmit = "Hellen";
    listClone.company.shouldNotSubmit = "";
    listClone.telephone.shouldNotSubmit = "11122233344";
    listClone.email.shouldNotSubmit = "asd@yahoo.ooo";
    listClone.comment.shouldNotSubmit = "";

    const block = render(<FormContactFormatron />);
    await scenario(block);
    expect(getById(block.container, "success-submit")).not.toBeInTheDocument();
  });
});
