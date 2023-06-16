import { MarkdownRemark } from "@main/graphql-types"
import { Link } from "gatsby"
import React, { CSSProperties } from "react"
import { animated, useSpring } from "@react-spring/web"

export const ProjectsBody: React.FC<{
  /** The Post to render */
  post: MarkdownRemark
}> = props => {
  const { post } = props
  const title = post.frontmatter.title || post.fields.slug

  const [itemHoverProps, itemHoverSet] = useSpring(() => ({
    fontSize: "2rem",
    textAlign: "center",
  }))

  return (
    <div
      onMouseEnter={() => {
        itemHoverSet({ fontSize: "2.5rem" })
      }}
      onMouseLeave={() => {
        itemHoverSet({ fontSize: "2rem" })
      }}
    >
      <li key={post.fields.slug}>
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <animated.h2 style={itemHoverProps as unknown as CSSProperties}>
              <Link to={post.fields.slug} itemProp="url">
                <span itemProp="headline">{title}</span>
              </Link>
            </animated.h2>
            <small>{post.frontmatter.start}</small>
          </header>
          <section>
            <p>{post.frontmatter.description}</p>
          </section>
        </article>
      </li>
    </div>
  )
}
