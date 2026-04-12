import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import SearchPage from "../component/SearchPage";

describe("SearchPage filter tags", () => {
  it("toggles the Politiker tag active on click", async () => {
    render(<SearchPage />);
    const tag = screen.getByRole("button", { name: /Politiker/i });

    expect(tag.className).not.toContain("search-tag-active");

    await userEvent.click(tag);
    expect(tag.className).toContain("search-tag-active");

    await userEvent.click(tag);
    expect(tag.className).not.toContain("search-tag-active");
  });
});
