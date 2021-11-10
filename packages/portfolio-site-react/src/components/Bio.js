/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Socials } from './Socials';

export const Bio = () => {
  //https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L6
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 100, height: 100, quality: 10) {
            base64
            width
            height
            src
            srcSet
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          location
          role
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const avatar = data?.avatar?.childImageSharp?.fixed;
  const { author, social, location, role } = data.site.siteMetadata;

  return (
    <div roll="display" className="bio">
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
        <small className="bio-location-tag">
          {role} - {location}
        </small>
        {author?.name && (
          <p>
            <strong>{author.name}</strong> {author?.summary || null}
          </p>
        )}
        <Socials />
      </div>
    </div>
  );
};
