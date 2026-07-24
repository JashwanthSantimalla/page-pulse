import axios from "axios";
import * as cheerio from "cheerio";

export async function auditPage(url: string) {
  if (!url) {
    throw new Error("URL is required.");
  }

  try {
    new URL(url);
  } catch {
    throw new Error("Invalid URL.");
  }

  const startTime = Date.now();

  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      "User-Agent": "Page Pulse Audit Bot",
    },
  });

  const responseTime = Date.now() - startTime;

  const contentType = String(response.headers["content-type"] || "");

  if (!contentType.includes("text/html")) {
    throw new Error("URL does not return an HTML page.");
  }

  const $ = cheerio.load(response.data);

  const title = $("title").text().trim();

  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || "Not Found";

  const h1Count = $("h1").length;

  const imagesMissingAlt = $("img")
    .toArray()
    .filter((img) => {
      const alt = $(img).attr("alt");
      return !alt || alt.trim() === "";
    }).length;

  const wordCount = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  return {
    url,
    status: response.status,
    responseTime,
    title,
    metaDescription,
    h1Count,
    imagesMissingAlt,
    wordCount,
  };
}