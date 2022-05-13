import { BioSocialsQueryQuery } from "@main/graphql-types"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { animated, useSpring } from "react-spring"

export const Socials: React.FC = () => {
  const {
    site: {
      siteMetadata: { social },
    },
  }: BioSocialsQueryQuery = useStaticQuery(graphql`
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

  return (
    <div className="social-display">
      {social.map(({ name, url }, key) => (
        <SocialButton buttonText={name} src={url} key={key} />
      ))}
    </div>
  )
}

export interface SocialButtonProps {
  /** Text to display */
  buttonText: string
  /** page to navigate to */
  src: string
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  buttonText,
  src,
}) => {
  const [springStyle, set] = useSpring(() => ({
    paddingLeft: "5px",
    paddingRight: "5px",
    letterSpacing: "1px",
  }))

  return (
    <animated.button
      style={springStyle}
      className="social-button"
      onClick={() => {
        window.open(src, "_blank")
      }}
      onMouseEnter={() => {
        set({ paddingLeft: "8px", paddingRight: "8px", letterSpacing: "2.5px" })
      }}
      onMouseLeave={() => {
        set({ paddingLeft: "5px", paddingRight: "5px", letterSpacing: "1px" })
      }}
    >
      {buttonText}
    </animated.button>
  )
}
