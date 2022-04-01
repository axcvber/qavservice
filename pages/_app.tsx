import type { AppContext, AppProps } from 'next/app'
import Theme from '../styles/Theme'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql'
import { AuthProvider } from '../context/authContext'
import App from 'next/app'
import { parseCookies } from 'nookies'
import { GlobalQuery, Global, GlobalDocument, UsersPermissionsLoginPayload } from '../generated'
import SEO from '../components/SEO'
import { AppProvider } from '../context/appContext'
import React from 'react'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
export default function MyApp({ Component, pageProps }: AppProps) {
  const global = pageProps.global as Global
  const userData = pageProps.userData as UsersPermissionsLoginPayload
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setLoading(true)
    })
    router.events.on('routeChangeComplete', () => {
      setLoading(false)
    })
  }, [router])

  return (
    <>
      <SEO
        seo={global.seo}
        logo={global.logo.data.attributes.url}
        logoTitle={global.logoTitle}
        gTag={global.googleAnalyticsTag}
      />
      <ApolloProvider client={client}>
        <AppProvider cmsData={global}>
          <AuthProvider userData={userData}>
            <Theme>
              <>
                <Loader loading={loading} />
                <Component {...pageProps} />
              </>
            </Theme>
          </AuthProvider>
        </AppProvider>
      </ApolloProvider>
    </>
  )
}

MyApp.getInitialProps = async (app: AppContext) => {
  const appProps = await App.getInitialProps(app)
  const { jwt } = parseCookies(app.ctx)
  const { data } = await client.query<GlobalQuery>({
    context: {
      headers: {
        authorization: jwt ? `Bearer ${jwt}` : '',
      },
    },
    query: GlobalDocument,
  })

  return {
    ...appProps,
    pageProps: {
      global: data.global?.data.attributes,
      userData: data.me ? { user: { ...data.me }, jwt } : null,
    },
  }
}
