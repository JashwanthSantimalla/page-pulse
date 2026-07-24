import { NextRequest, NextResponse } from "next/server";
import { auditPage } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    const report = await auditPage(url);

    return NextResponse.json({
      success: true,
      ...report,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to audit this URL.";

    let status = 500;

    if (
      message === "URL is required." ||
      message === "Invalid URL." ||
      message === "URL does not return an HTML page."
    ) {
      status = 400;
    }

    if (message === "Request timed out.") {
      status = 408;
    }

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}