import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UserPage from "./components/UserPage"; // Path to your component
import Spinner from "./components/Spinner"; 

jest.mock("./Spinner", () => () => <div data-testid="spinner">Loading...</div>);

const mock = new MockAdapter(axios);

describe("UserPage", () => {
  const mockUser = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
  };

  const mockAlbums = [
    { id: 1, title: "Album 1" },
    { id: 2, title: "Album 2" },
  ];

  afterEach(() => {
    mock.reset();
  });

  test("renders loading spinner initially", () => {
    render(
      <Router>
        <UserPage />
      </Router>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders user details and albums after successful API calls", async () => {
    mock
      .onGet("https://jsonplaceholder.typicode.com/users/1")
      .reply(200, mockUser);
    mock
      .onGet("https://jsonplaceholder.typicode.com/albums?userId=1")
      .reply(200, mockAlbums);

    render(
      <Router>
        <UserPage />
      </Router>
    );

    // Wait for the user name to appear
    await screen.findByText(mockUser.name);

    // Check user details
    expect(
      screen.getByText(`Username: ${mockUser.username}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();

    // Check album titles
    mockAlbums.forEach((album) => {
      expect(screen.getByText(album.title)).toBeInTheDocument();
    });
  });

  test("handles API errors gracefully", async () => {
    mock.onGet("https://jsonplaceholder.typicode.com/users/1").reply(500);
    mock
      .onGet("https://jsonplaceholder.typicode.com/albums?userId=1")
      .reply(500);

    render(
      <Router>
        <UserPage />
      </Router>
    );

    // Wait for the loading spinner to disappear
    await waitFor(() =>
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
    );

    // Check for an error message or lack of content
    expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    expect(screen.queryByText("Albums:")).not.toBeInTheDocument();
  });
});
