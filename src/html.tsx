import React from "react"

export interface HTMLProps {
  /** HTML Attributes */
  htmlAttributes: object
  /** Head Components */
  headComponents: string[]
  /** Body Attributes */
  bodyAttributes: object
  /** Pre Body Components */
  preBodyComponents: string[]
  /** Body */
  body: string
  /** Post Body Components */
  postBodyComponents: string[]
}

/* eslint-disable react/no-danger */
const HTML: React.FC<HTMLProps> = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => (
  <html lang="en" {...htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SQ4WFEHFDG"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-SQ4WFEHFDG');
                `,
        }}
      />

      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {postBodyComponents}
    </body>
  </html>
)
/* eslint-enable react/no-danger */

export default HTML
