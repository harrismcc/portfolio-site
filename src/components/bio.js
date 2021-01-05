/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import {useSpring, animated} from 'react-spring'

const Bio = () => {


  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100, quality: 10) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div 
      roll="display"
      className="bio"
    >
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <div>
        <small className="bio-location-tag">Software Engineer - Los Angeles, California</small>
        {author?.name && (
          <p>
            <strong>{author.name}</strong> {author?.summary || null}

          </p>
        )}
      <Socials/>
      </div>

    </div>
  )
}

export default Bio



//linkedin link
// github link
// email link
// resume link

const Socials = () => {

  return(
      <div className="social-display">
          <SocialButton
              className="A"
              buttonText="Github"
              src="https://github.com/harrismcc/"
          />
          <SocialButton
              className="B"
              buttonText="LinkedIn"
              src="https://www.linkedin.com/in/harrismccullers/"
          />
          <SocialButton
              buttonText="Resume"
              src="/img/harris_mccullers.pdf"
          />
          <SocialButton
              buttonText="Email"
              src="mailto://harrismccullers@gmail.com"
          />
      </div>
  )
}


const SocialButton = (props) => {

  const handleClick = () => {
    //window.location.href=props.src;
    window.open(
      props.src,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  const [springStyle, set] = useSpring(() => ({paddingLeft: "5px", paddingRight: "5px", letterSpacing: "1px"}))
  const handleMouseEnter = () => {
    console.log("Enter")
    set({paddingLeft: "8px",
          paddingRight: "8px",
          letterSpacing: "2.5px"})
  }
  const handleMouseLeave = () => {
    set({paddingLeft: "5px",
    paddingRight: "5px",
    letterSpacing: "1px"})
  }
  return(
      <animated.button 
        style={springStyle}
        className="social-button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
          {props.buttonText}
      </animated.button>
  )
}
