import React from "react"
import { Link } from "gatsby"
import {useSpring, animated} from 'react-spring'

const ProjectsBody = (props) => {
    const post = props.post
    const title = post.frontmatter.title || post.fields.slug

    const [itemHoverProps, itemHoverSet] = useSpring(() => ({fontSize: "2rem"}))
    const handleItemHover = () => {
      itemHoverSet({fontSize: "2.5rem"})
    }
    const handleItemUnhover = () => {
      itemHoverSet({fontSize: "2rem"})
    }

    return (
      <div
      style={itemHoverProps}
      onMouseEnter={handleItemHover}
      onMouseLeave={handleItemUnhover}
      >
        <li key={post.fields.slug}>
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <animated.h2 style={itemHoverProps}>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </animated.h2>
              <small>{post.frontmatter.start}</small>
    
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.html,
                }}
                itemProp="description"
              />
            </section>
          </article>
        </li>
      </div>
    )
  }

export default ProjectsBody