import React from "react"
import { Link } from "gatsby"
import {useSpring, animated} from 'react-spring'

const WorkBody = (props) => {

    //super(props)
    const post = props.post
    //const title = post.frontmatter.title || post.fields.slug

    const {title, description, roll, url, date, start, end, isCurrent} = post.frontmatter
    console.log(post.frontmatter)
  
    
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
                <Link to={url || post.fields.slug} itemProp="url" target="_blank" rel="noopener noreferrer">
                  <span itemProp="headline">{title}</span>
                </Link>
              </animated.h2>
              <small>{roll}</small>
              <br></br>
              <div className="line-highlight">
                <small>{start} - {end || 'Present'}</small>
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