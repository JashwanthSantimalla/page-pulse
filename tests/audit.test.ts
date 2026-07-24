import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { auditPage } from "../lib/audit";

vi.mock("axios");

const mockedAxios = vi.mocked(axios);

describe("auditPage()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully parse a valid HTML page", async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      headers: {
        "content-type": "text/html",
      },
      data: `
        <html>
          <head>
            <title>Test Page</title>
            <meta name="description" content="This is a test page">
          </head>
          <body>
            <h1>Hello</h1>
            <img src="one.jpg">
            <img src="two.jpg" alt="Image">
            <p>This is some sample text for testing.</p>
          </body>
        </html>
      `,
    } as any);

    const result = await auditPage("https://example.com");

    expect(result.status).toBe(200);
    expect(result.title).toBe("Test Page");
    expect(result.metaDescription).toBe("This is a test page");
    expect(result.h1Count).toBe(1);
    expect(result.imagesMissingAlt).toBe(1);
    expect(result.wordCount).toBeGreaterThan(5);
  });

  it("should throw an error for an invalid URL", async () => {
    await expect(auditPage("invalid-url")).rejects.toThrow("Invalid URL.");
  });

  it("should reject non HTML responses", async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      headers: {
        "content-type": "application/json",
      },
      data: "{}",
    } as any);

    await expect(
      auditPage("https://example.com")
    ).rejects.toThrow("URL does not return an HTML page.");
  });
});