import { Layout, SEO } from "@main/components"
import { NotFoundPageQuery } from "@main/graphql-types"
import { graphql, PageProps } from "gatsby"
import React from "react"

const NotFoundPage: React.FC<PageProps<NotFoundPageQuery>> = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
