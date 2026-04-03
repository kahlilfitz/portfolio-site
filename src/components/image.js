import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const ZionImage = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "kahlil-zion.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  `)

  return <GatsbyImage image={getImage(data.file)} alt="Kahlil at Zion" />
}
