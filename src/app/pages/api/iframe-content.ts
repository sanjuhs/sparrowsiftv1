// pages/api/iframe-content.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (typeof code !== "string") {
    res.status(400).json({ error: "Invalid code parameter" });
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dynamic Iframe</title>
      <link href="/app/globals.css" rel="stylesheet">
    </head>
    <body>
      <div id="root"></div>
      <script type="module">
        import React from 'https://esm.sh/react@18';
        import ReactDOM from 'https://esm.sh/react-dom@18';
        import { Button } from '/components/ui/button';
        ${code}
        
        ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(MyComponent));
      </script>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
