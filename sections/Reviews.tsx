import React from 'react'
import Image from 'next/image'
import { Container } from '../styles/layout/Container'
import Box from '../styles/layout/Box'
import Flex from '../styles/layout/Flex'
import Heading from '../styles/layout/Heading'
import Text from '../styles/layout/Text'
import Button from '../styles/layout/Button'
import { ComponentReviewsReviews } from '../generated'
import BackgroundTitle from '../components/BackgroundTitle'
import BackgroundImage from '../components/BackgroundImage'

interface IReviews {
  data: ComponentReviewsReviews
}

const Reviews: React.FC<IReviews> = ({ data }) => {
  return (
    <Box as='section' id='reviews' my={{ default: 5, lg: 7 }} position='relative'>
      <Container>
        <Flex
          width='100%'
          gap={5}
          alignItems={{ sm: 'flex-end', lg: 'center' }}
          flexDirection={{ default: 'column-reverse', lg: 'row' }}
        >
          <Box position='relative' width={[1, 1, 1 / 2]} height={'400px'}>
            <Image
              priority
              src={data.image.data.attributes.url}
              placeholder='blur'
              blurDataURL={data.image.data.attributes.url}
              alt={data.image.data.attributes.alternativeText}
              layout='fill'
              objectFit='contain'
            />
          </Box>
          <Flex width={1} flexDirection={'column'} alignItems={{ default: 'center', sm: 'flex-start' }}>
            <Heading line={'right'} textAlign='center' mb={2} fontSize={[5, 6]}>
              Озывы
            </Heading>
            <Text fontSize='md' mb={4} textAlign={{ default: 'center', sm: 'left' }}>
              {data.text}
            </Text>
            <a href={data.reviewsLink} target='_blank' rel='noreferrer noopener'>
              <Button>Оставить отзыв</Button>
            </a>
          </Flex>
        </Flex>
      </Container>
      <BackgroundTitle variant='right' title={'Озывы'} />
      <BackgroundImage variant='left-bottom' />
    </Box>
  )
}

export default Reviews

// const StyledReviews = styled(Section)`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
//     flex-direction: column;
//     align-items: center;
//   }
// `
