import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { lte } from "lodash"

const path = require(`path`)

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  let workPosts = []
  let blogPosts = []
  posts.map(post => {
    if (post.fields.collection === 'work'){
      workPosts.push(post)
    } else if (post.fields.collection === 'blog'){
      blogPosts.push(post)
    }
  })

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }


  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {workPosts.map(post => {
          return getWorkBody(post)
        })}
      </ol>
      <h2>Blog</h2>
      <ol style={{ listStyle: `none` }}>
        {blogPosts.map(post => {
          return getWorkBody(post)
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          collection
        }
        html
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          roll
          start
          end
        }
      }
    }
  }
`


const getWorkBody = (post) => {
  const title = post.frontmatter.title || post.fields.slug
  return (
    <li key={post.fields.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small>{post.frontmatter.date}</small>
          <small>{post.frontmatter.roll}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.html,
            }}
            itemProp="description"
          />
        </section>
      </article>
    </li>
  )
}

const getBlogBody = (post) => {
  const title = post.frontmatter.title || post.fields.slug
  return (
    <li key={post.fields.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small>{post.frontmatter.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.html,
            }}
            itemProp="description"
          />
        </section>
      </article>
    </li>
  )
}