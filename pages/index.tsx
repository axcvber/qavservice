import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Header from '../components/Header'
import UserWidget from '../components/UserWidget'
import { Page, PageDocument, PageQuery } from '../generated'
import client from '../graphql'
import AboutService from '../sections/AboutService'
import Form from '../sections/Form'
import Hero from '../sections/Hero/Hero'
import Reviews from '../sections/Reviews'
import Services from '../sections/Services'

interface IPage {
  page: Page
}

const Home: NextPage<IPage> = ({ page }) => {
  return (
    <>
      <Header />
      <Hero title={page.title} />
      <AboutService data={page.aboutUs} />
      <Services />
      <Reviews />
      <Form />
      <UserWidget />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<PageQuery>({
    query: PageDocument,
  })
  return {
    props: {
      page: data.page.data.attributes,
    },
  }
}

export default Home
