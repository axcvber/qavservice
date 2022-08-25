import React from 'react'
import BackgroundImage from '../../components/BackgroundImage'
import BackgroundTitle from '../../components/BackgroundTitle'
import { ComponentOperatorsOperators } from '../../generated'
import Box from '../../styles/layout/Box'
import { Container } from '../../styles/layout/Container'
import Flex from '../../styles/layout/Flex'
import Heading from '../../styles/layout/Heading'
import GuaranteeBanner from './GuaranteeBanner'
import OperatorAvatar from './OperatorAvatar'
import OperatorDesc from './OperatorDesc'

interface IOperators {
  data: ComponentOperatorsOperators
}

const Operators: React.FC<IOperators> = ({ data }) => {
  return (
    <Box as='section' id='operators' my={{ default: 5, lg: 7 }} position='relative'>
      <Container>
        <Flex width={1} flexDirection={'column'} alignItems={{ default: 'center', md: 'flex-start' }}>
          <Heading line={'right'} textAlign='center' mb={4} fontSize={[5, 6]}>
            Операторы
          </Heading>
        </Flex>
        <Flex flexDirection='column' gap={5}>
          {data.operatorWidget.map((item) => (
            <Flex
              gap={4}
              key={item.id}
              alignItems={{ default: 'center', md: 'flex-start' }}
              flexDirection={{ default: 'column', sm: 'column', md: 'row' }}
            >
              <OperatorAvatar
                avatarUrl={item.avatar.data.attributes.url}
                alt={item.avatar.data.attributes.alternativeText}
              />
              <OperatorDesc nickname={item.nickname} desc={item.text} />
            </Flex>
          ))}
          <GuaranteeBanner
            avatarUrl={data.guarantorBanner.avatar.data.attributes.url}
            nickname={data.guarantorBanner.nickname}
            desc={data.guarantorBanner.text}
            chatLink={data.guarantorBanner.chatLink}
            reviewsLink={data.guarantorBanner.reviewsLink}
            alt={data.guarantorBanner.avatar.data.attributes.alternativeText}
          />
        </Flex>
      </Container>
      <BackgroundTitle variant='right-vertical' title={'Операторы'} />
      <BackgroundImage variant='right-bottom' />
    </Box>
  )
}

export default Operators
