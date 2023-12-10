import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title and author, but not URL and likes by default", async () => {
  const blog = {
    title: "real one",
    author: "Ali Baig",
    url: "www.blog.com",
    likes: 2,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");

  expect(div).not.toHaveTextContent("www.blog.com");
});
