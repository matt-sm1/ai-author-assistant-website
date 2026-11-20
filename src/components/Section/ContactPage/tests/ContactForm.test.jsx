import React from "react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../ContactForm";

const content = {
  badge: "Get In Touch",
  heading: "Get In Touch With Any General Query",
  description: "Tell us how we can help.",
  fields: [
    { id: "name", label: "Your Name", type: "text", autoComplete: "name" },
    { id: "email", label: "Email", type: "email", autoComplete: "email" },
    { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
    { id: "subject", label: "Subject", type: "text" },
  ],
  messageLabel: "Message",
  termsPrefix: "I agree to the",
  termsLinkLabel: "Terms And Conditions",
  submitLabel: "Submit",
};

function fillForm() {
  fireEvent.change(screen.getByLabelText(/Your Name/), { target: { value: "Ada" } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "ada@example.com" } });
  fireEvent.change(screen.getByLabelText(/Phone/), { target: { value: "5551234" } });
  fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: "Hello" } });
  fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "Hi there" } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("ContactForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the heading and a labelled input for every field", () => {
    render(<ContactForm content={content} />);

    expect(screen.getByRole("heading", { name: content.heading })).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name/)).toHaveAttribute("type", "text");
    expect(screen.getByLabelText(/Email/)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/Phone/)).toHaveAttribute("type", "tel");
    expect(screen.getByLabelText(/Subject/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/).tagName).toBe("TEXTAREA");
  });

  it("gives the form the contact-form anchor id", () => {
    const { container } = render(<ContactForm content={content} />);

    expect(container.querySelector("section")).toHaveAttribute("id", "contact-form");
  });

  it("updates the field value as the user types", () => {
    render(<ContactForm content={content} />);

    fireEvent.change(screen.getByLabelText(/Your Name/), { target: { value: "Ada" } });

    expect(screen.getByLabelText(/Your Name/)).toHaveValue("Ada");
  });

  it("submits the entered values and agreement state", () => {
    const onSubmit = vi.fn();
    render(<ContactForm content={content} onSubmit={onSubmit} />);

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: "Ada",
      email: "ada@example.com",
      phone: "5551234",
      subject: "Hello",
      message: "Hi there",
      agreed: true,
    });
  });

  it("renders the submit button as a submit control, not a plain button", () => {
    render(<ContactForm content={content} />);

    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit");
  });
});
