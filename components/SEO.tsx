import { DefaultSeo } from 'next-seo'
import Script from 'next/script'
import React from 'react'
import { ComponentSeoSeo } from '../generated'
interface ISEO {
  seo: ComponentSeoSeo
  logo: string
  favicon: string
  gTag: string
}

const SEO: React.FC<ISEO> = ({ seo, logo, gTag, favicon }) => {
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
            href: favicon,
          },
        ]}
        openGraph={{
          type: 'website',
          locale: 'ru',
          url: seo.canonicalURL,
          site_name: 'Q.A.V',
          images: [
            {
              url: seo.metaImage.data.attributes.url,
              width: 400,
              height: 400,
              alt: seo.metaImage.data.attributes.alternativeText,
            },
          ],
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
