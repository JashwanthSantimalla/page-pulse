# 🚀 Page Pulse

A lightweight website auditing tool that analyzes any public webpage and returns essential SEO and technical information in seconds.

**🌐 Live Demo:** https://page-pulse-wheat.vercel.app

**💻 GitHub Repository:** https://github.com/JashwanthSantimalla/page-pulse

---

## Features

- Analyze any public website URL
- Retrieve HTTP status code
- Measure response time
- Extract page title
- Extract meta description
- Count H1 headings
- Count images missing alt attributes
- Estimate total word count
- Clean responsive UI
- Graceful error handling for invalid URLs and failed requests

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Cheerio (HTML parsing)
- Vercel

---

## Quick Start

### Clone the repository

```bash
git clone https://github.com/JashwanthSantimalla/page-pulse.git
cd page-pulse
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# API Contract

## POST `/api/audit`

Analyzes a webpage and returns audit information.

### Request

```json
{
  "url": "https://example.com"
}
```

### Success Response

```json
{
  "status": 200,
  "responseTime": 152,
  "title": "Example Domain",
  "metaDescription": "Example description...",
  "h1Count": 1,
  "imagesMissingAlt": 0,
  "wordCount": 342
}
```

### Error Response

```json
{
  "error": "Invalid URL"
}
```

Possible errors include:

- Invalid URL
- Request timeout
- Non-success HTTP responses
- Failed page fetch

---

# Design Decisions

## 1. Server-side HTML Parsing

All webpage analysis is performed on the server instead of the browser.

**Reason**

- Avoids browser CORS restrictions.
- Keeps parsing logic centralized.
- Provides consistent results for all users.

---

## 2. Single API Endpoint

A single endpoint (`/api/audit`) returns the complete audit report.

**Reason**

- Reduces the number of client requests.
- Simpler frontend implementation.
- Easier to maintain and extend.

---

## 3. Minimal Dashboard UI

The interface focuses on displaying the most important audit metrics in a clean card layout.

**Reason**

- Improves readability.
- Keeps the user workflow simple.
- Makes the application responsive across different screen sizes.

---

# Error Handling

The application gracefully handles:

- Invalid URLs
- Failed network requests
- Non-HTML responses
- Unexpected server errors

The user receives a readable error message instead of the application crashing.

---

# Future Improvements

Given additional development time, the following improvements would be added:

- Lighthouse integration
- SEO scoring
- Performance recommendations
- Export reports as PDF
- Historical audit tracking
- Mobile optimization analysis

---

# Deployment

Hosted on Vercel.

Live URL:

https://page-pulse-wheat.vercel.app

---

## Built for Digital Heroes Training Task

This project was created as part of the **Digital Heroes Software Development Internship Qualification Task**.