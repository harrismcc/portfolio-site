import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import {useSpring, animated} from 'react-spring'

export const Socials = () => {

    const {site: {siteMetadata : { social }}} = useStaticQuery(graphql`
      query BioSocialsQuery {
        site {
          siteMetadata {
            social {
              name
              url
            }
          }
        }
      }
    `)
  
    return(

        <div className="social-display">
            {
              social.map(({name, url}) => {
                return (
                  <SocialButton
                    className="A"
                    buttonText={name}
                    src={url}
                  />
                )
              })
            }
        </div>
    )
  }
  
  
export const SocialButton = (props) => {
  
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