import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Page, PageDocument, PageQuery, ServiceEntity } from '../generated'
import client from '../graphql'
import AboutService from '../sections/AboutService'
import Form from '../sections/Form'
import Hero from '../sections/Hero/Hero'
import Operators from '../sections/operators/Operators'
import Reviews from '../sections/Reviews'
import Services from '../sections/Services'

interface IPage {
  page: Page
  services: Array<ServiceEntity>
}

const Home: NextPage<IPage> = ({ page, services }) => {
  return (
    <>
      <Navbar />
      <Hero data={page.hero} />
      <AboutService data={page.aboutService} />
      <Services services={services} />
      <Operators data={page.operators} />
      <Reviews data={page.reviews} />
      <Form services={services} />
      <Footer data={page.footer} />
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
      services: data.services.data,
    },
  }
}

export default Home
