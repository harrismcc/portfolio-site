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


  const AnimatedImage = animated(Image)

  const [props, set] = useSpring(() => ({minWidth: 50, height: 50, borderRadius: "50%"}))
  const handleBioHover = () => {
    set({minWidth: 100, height: 100, borderRadius: "50%"})
  }
  const handleBioUnhover = () => {
    set({minWidth: 50, height: 50, borderRadius: "10%"})
  }

  return (
    <div 
      roll="button"
      className="bio"
      onMouseEnter={() => handleBioHover()}
      onMouseLeave={() => handleBioUnhover()}
    >
      {avatar && (
        <AnimatedImage
          style={props}
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <p>
          <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
