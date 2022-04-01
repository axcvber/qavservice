import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Button, Container, H3, HeadingTitle, P, Section } from '../styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import UserAvatar from '../public/reviews/user.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Textarea from '../components/Textarea'
import { useReviewsQuery, useAddReviewMutation } from '../generated'
import DataLoader from '../components/DataLoader'
import { useAuth } from '../hooks/useAuth'
import { useModal } from '../hooks/useModal'
import { MODAL_TYPES } from '../context/modalContext'

export interface IReviewsInputs {
  review: string
}

export const ReviewsSchema = yup.object().shape({
  review: yup
    .string()
    .required('Введите Ваш Отзыв')
    .min(10, 'Введите Ваш Отзыв')
    .max(250, 'Максимум 250 символов')
    .trim(),
})

const Reviews = () => {
  const { showModal } = useModal()
  const { userData } = useAuth()
  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm<IReviewsInputs>({
    mode: 'onChange',
    defaultValues: { review: '' },
    resolver: yupResolver(ReviewsSchema),
  })

  const { loading, data, refetch } = useReviewsQuery({
    notifyOnNetworkStatusChange: true,
  })

  const [fetchAddReview, { loading: addingReview }] = useAddReviewMutation({
    context: {
      headers: {
        authorization: userData?.jwt ? `Bearer ${userData?.jwt}` : '',
      },
    },
    onCompleted() {
      toast.success('Отзыв успешно отправлен')
      refetch()
    },
    onError({ message }) {
      toast.error(message)
    },
    notifyOnNetworkStatusChange: true,
  })

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ review: '' })
    }
  }, [isSubmitSuccessful, reset])

  const onLoginModal = () => {
    showModal(MODAL_TYPES.LOGIN_MODAL)
  }

  const onRegisterModal = () => {
    showModal(MODAL_TYPES.REGISTER_MODAL)
  }

  const onSubmit: SubmitHandler<IReviewsInputs> = ({ review }) => {
    fetchAddReview({
      variables: {
        username: userData.user.username,
        text: review,
      },
    })
  }

  return (
    <Container>
      <StyledReviews id='reviews'>
        <ReviewsContent>
          <HeadingTitle mb={40} line='right'>
            Отзывы
          </HeadingTitle>
          {loading ? (
            <DataLoader />
          ) : (
            <StyledSwiper
              modules={[Pagination]}
              autoHeight
              wrapperTag='ul'
              pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 5 }}
              spaceBetween={50}
            >
              {data?.reviews.data.map((item) => (
                <SwiperSlide key={item.id} className='reviewSlide' tag='li'>
                  <ReviewAvatar>
                    <UserAvatar />
                  </ReviewAvatar>
                  <ReviewBody>
                    <ReviewText>{item.attributes.text}</ReviewText>
                    <ReviewName>{item.attributes.username}</ReviewName>
                  </ReviewBody>
                </SwiperSlide>
              ))}
            </StyledSwiper>
          )}
          {userData ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea control={control} height={100} name='review' placeholder='Введите отзыв' />
              <ReviewsButton variant='contained' disabled={addingReview} type='submit'>
                Отправить
              </ReviewsButton>
            </form>
          ) : (
            <H3>
              Чтобы оставить отзыв <AuthLink onClick={onLoginModal}>войдите </AuthLink>
              или <AuthLink onClick={onRegisterModal}>зарегистрируйтесь</AuthLink>
            </H3>
          )}
        </ReviewsContent>
        <ReviewsImage>
          <Image src='/reviews/rating.png' alt='rating' layout='fill' objectFit='contain' priority />
        </ReviewsImage>
      </StyledReviews>
    </Container>
  )
}

export default Reviews

const ReviewsButton = styled(Button)`
  margin-top: 20px;
`

const AuthLink = styled.span`
  color: ${({ theme }) => theme.palette.primary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const ReviewsImage = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 40px;
    width: 300px;
    height: 300px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 250px;
    height: 250px;
  }
`

const ReviewName = styled.span`
  color: ${({ theme }) => theme.palette.bg.primary};
  color: #c69dff;
  font-weight: 600;
  letter-spacing: 0.3px;
`

const ReviewText = styled(P)`
  padding-bottom: 10px;
`

const ReviewBody = styled.div`
  width: 100%;
`

const ReviewAvatar = styled.div`
  margin-right: 20px;
  background-color: #4c1894;
  border-radius: 50%;
  padding: 10px;
  width: 70px;
  height: 60px;
  svg {
    width: 100%;
    height: 100%;
  }
`

const StyledSwiper = styled(Swiper)`
  user-select: none;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.palette.primary};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow} rgba(0, 0, 0, 0.1);
  padding: 20px 20px 50px 20px;

  .reviewSlide {
    display: flex;
    justify-content: space-between;
  }

  .swiper-pagination {
    bottom: 20px;
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      margin: 0 5px;
    }
    .swiper-pagination-bullet-active {
      background: #a768ff;
    }
  }
`

const ReviewsContent = styled.div`
  max-width: 500px;
  width: 500px;
  margin-right: 60px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 400px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 500px;
    margin-right: 0px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`

const StyledReviews = styled(Section)`
  width: 100%;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: center;
  }
`
