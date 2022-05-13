const path = require("path")

module.exports = {
  siteMetadata: {
    title: `HARRIS MCCULLERS - PORTFOLIO`,
    author: {
      name: `Harris McCullers`,
      summary: `is a San Francisco based full-stack software engineer. As a talented coder, skilled communicator, and team-player, Harris is a great addition to any team.`,
    },
    description: `Harris McCullers' Portfolio Page.`,
    siteUrl: `https://harrismccullers.com/`,
    location: "San Francisco, California",
    role: "Software Engineer",
    social: [
      {
        name: "Github",
        url: "https://github.com/harrismcc/",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/harrismccullers/",
      },
      {
        name: "Email",
        url: "mailto://contact@harrismccullers.com",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/work`,
        name: `work`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-SQ4WFEHFDG`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Harris McCullers Portfolio`,
        short_name: `Harris`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
