import { DefaultSeo } from 'next-seo'
import Script from 'next/script'
import React from 'react'
import { ComponentSeoSeo } from '../generated'
interface ISEO {
  seo: ComponentSeoSeo
  logo: string
  logoTitle: string
  gTag: string
}

const SEO: React.FC<ISEO> = ({ seo, logo, logoTitle, gTag }) => {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gTag}`} strategy='afterInteractive' />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gTag}');
        `}
      </Script>
      <DefaultSeo
        title={seo.metaTitle}
        description={seo.metaDescription}
        canonical={seo.canonicalURL}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'initial-scale=1, width=device-width',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: logo,
          },
        ]}
        openGraph={{
          type: 'website',
          locale: 'ru',
          url: seo.canonicalURL,
          site_name: logoTitle,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
}

export default SEO
