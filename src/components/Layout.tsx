import { Link } from "gatsby"
import React from "react"

export interface LayoutProps {
  /** Should the header be a title */
  titleHeader?: boolean
  /** Title of the page */
  title: string
  /** Children to render */
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({
  titleHeader = false,
  title,
  children,
}) => {
  let header
  if (titleHeader) {
    header = (
      <div>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
      </div>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={titleHeader}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Harris McCullers</footer>
    </div>
  )
}
