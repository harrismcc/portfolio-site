import { useStaticQuery, graphql } from 'gatsby';

// TODO: Make this whole query thing work to move SEO and stuff into shared-components

export const useQuerySiteData = useStaticQuery(graphql`
  query BioQuery2 {
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
        title
        description
        author {
          name
          summary
        }
        social {
          name
          url
        }
        location
        role
      }
    }
  }
`);

/*
 * This query gets SEO metadata about the site
 */
export const useSeoData = () => {
  const { site } = useQuerySiteData();
  return site;
};

/*
 * This query gets the Bio data
 */
export const useBioData = () => {
  const { avatar, site } = useQuerySiteData();
  return { avatar, site };
};

/*
 * This query gets social (contact) data
 */
export const useSocialData = () => {
  const {
    site: {
      siteMetadata: { social },
    },
  } = useQuerySiteData();
  return social;
};
