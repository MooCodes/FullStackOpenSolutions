import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("form calls event handler with the right details when blog is created", async () => {
  const mockHandler = jest.fn();

  render(<BlogForm createBlog={mockHandler} setShowBlogForm={() => null} />);

  const titleInput = screen.getByPlaceholderText("write title here");
  const authorInput = screen.getByPlaceholderText("write author here");
  const urlInput = screen.getByPlaceholderText("write url here");
  const sendButton = screen.getByText("create");

  const user = userEvent.setup();

  await user.type(titleInput, "some title");
  await user.type(authorInput, "some author");
  await user.type(urlInput, "some url");
  await user.click(sendButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  console.log(mockHandler.mock.calls[0][0]);
  expect(mockHandler.mock.calls[0][0].title).toBe("some title");
  expect(mockHandler.mock.calls[0][0].author).toBe("some author");
  expect(mockHandler.mock.calls[0][0].url).toBe("some url");
});
