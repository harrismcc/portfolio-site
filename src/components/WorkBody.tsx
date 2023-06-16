import { MarkdownRemark } from "@main/graphql-types"
import { Link } from "gatsby"
import React from "react"
import { animated, useSpring } from "@react-spring/web"

/* eslint-disable react/no-danger */
export const WorkBody: React.FC<{
  /** The post to render */
  post: MarkdownRemark
}> = props => {
  const { post } = props
  const { title, roll, url, start, end } = post.frontmatter

  const [itemHoverProps, itemHoverSet] = useSpring(() => ({ fontSize: "2rem" }))
  const handleItemHover = (): void => {
    itemHoverSet({ fontSize: "3rem" })
  }
  const handleItemUnhover = (): void => {
    itemHoverSet({ fontSize: "2rem" })
  }

  return (
    <div onMouseEnter={handleItemHover} onMouseLeave={handleItemUnhover}>
      <li key={post.fields.slug}>
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <animated.h2 style={itemHoverProps}>
              <Link
                to={url || post.fields.slug}
                itemProp="url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span itemProp="headline">{title}</span>
              </Link>
            </animated.h2>
            <small>{roll}</small>
            <br />
            <div className="line-highlight">
              <small>
                {start} - {end || "Present"}
              </small>
            </div>
          </header>
          <section>
            <div
              dangerouslySetInnerHTML={{
                __html: post.html,
              }}
              itemProp="description"
            />
          </section>
        </article>
      </li>
    </div>
  )
}
/* eslint-enable react/no-danger */
