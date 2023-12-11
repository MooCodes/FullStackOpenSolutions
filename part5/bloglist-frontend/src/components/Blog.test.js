import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders blog title and author, but not URL and likes by default", async () => {
  const blog = {
    title: "real one",
    author: "Ali Baig",
    url: "www.blog.com",
    likes: 2,
    user: {
      name: "ali baba",
    },
  };

  console.log(blog);

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");

  expect(div).not.toHaveTextContent("www.blog.com");
  expect(div).not.toHaveTextContent("2");
});

test("URL and number of likes are shown when the show details button is clicked", async () => {
  const blog = {
    title: "real one",
    author: "Ali Baig",
    url: "www.blog.com",
    likes: 2,
    user: {
      name: "ali",
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = container.querySelector("#showDetails");
  await user.click(button);

  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("www.blog.com");
  expect(div).toHaveTextContent("2");
});
