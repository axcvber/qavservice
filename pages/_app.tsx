import type { AppContext, AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql'
import App from 'next/app'
import SEO from '../components/SEO'
import { AppProvider } from '../context/appContext'
import React from 'react'
import Layout from '../components/Layout'
import { GlobalDocument, GlobalQuery, Global } from '../generated'
export default function MyApp({ Component, pageProps }: AppProps) {
  const global = pageProps.global as Global
  return (
    <>
      <SEO
        seo={global.seo}
        logo={global.logo.data.attributes.url}
        gTag={global.googleAnalyticsTag}
        favicon={global.favicon.data.attributes.url}
      />
      <ApolloProvider client={client}>
        <AppProvider cmsData={global}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ApolloProvider>
    </>
  )
}

MyApp.getInitialProps = async (app: AppContext) => {
  const appProps = await App.getInitialProps(app)
  const { data } = await client.query<GlobalQuery>({
    query: GlobalDocument,
  })
  return {
    ...appProps,
    pageProps: {
      global: data.global.data.attributes,
    },
  }
}
