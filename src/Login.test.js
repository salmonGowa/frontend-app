import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import LoginPage from "./LoginPage";

jest.mock("firebase/auth", () => ({
  signInWithPopup: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockOnLoginSuccess = jest.fn();
const mockNavigate = jest.fn();

useNavigate.mockImplementation(() => mockNavigate);

describe("LoginPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login page with Google Sign-in button", () => {
    render(<LoginPage onLoginSuccess={mockOnLoginSuccess} />);

    expect(screen.getByText("Welcome to Savannah Albums.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Log in to unlock all features and dive into a seamless album management experience!"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign in with Google" })
    ).toBeInTheDocument();
  });

  test("handles successful Google sign-in", async () => {
    const mockUser = { displayName: "John Doe", email: "johndoe@example.com" };
    signInWithPopup.mockResolvedValueOnce({ user: mockUser });

    render(<LoginPage onLoginSuccess={mockOnLoginSuccess} />);

    // Click the Sign-in button
    fireEvent.click(
      screen.getByRole("button", { name: "Sign in with Google" })
    );

    // Check signInWithPopup was called
    expect(signInWithPopup).toHaveBeenCalledTimes(1);

    // Wait for the effects
    await screen.findByText("Welcome to Savannah Albums.");

    // Check localStorage was updated
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(mockUser));

    // Check callback and navigation
    expect(mockOnLoginSuccess).toHaveBeenCalledWith(mockUser);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("handles Google sign-in failure", async () => {
    const mockError = new Error("Google sign-in failed");
    signInWithPopup.mockRejectedValueOnce(mockError);

    render(<LoginPage onLoginSuccess={mockOnLoginSuccess} />);

    // Click the Sign-in button
    fireEvent.click(
      screen.getByRole("button", { name: "Sign in with Google" })
    );

    // Wait for the effects
    await screen.findByText("Welcome to Savannah Albums.");

    // Check the error handling
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("user")).toBeNull();
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
