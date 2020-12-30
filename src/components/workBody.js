import React from "react"
import { Link } from "gatsby"
import {useSpring, animated} from 'react-spring'

const WorkBody = (props) => {

    //super(props)
    const post = props.post
    const title = post.frontmatter.title || post.fields.slug
  
    
    const [itemHoverProps, itemHoverSet] = useSpring(() => ({fontSize: "2rem"}))
    const handleItemHover = () => {
      itemHoverSet({fontSize: "3rem"})
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
        <li 
          key={post.fields.slug}
  
        >
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
              <small>{post.frontmatter.roll}</small>
              <br></br>
              <div className="line-highlight">
                <small>{post.frontmatter.start} - {post.frontmatter.end}</small>
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

export default WorkBody