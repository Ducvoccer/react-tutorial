import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import farmerAvatar from 'public/images/farmer-avatar.jpg'
import GrayStarIcon from 'public/svg/gray-star.svg'
import LocationIcon from 'public/svg/location.svg'
import PenIcon from 'public/svg/pen.svg'
import UserIcon from 'public/svg/user.svg'
import YellowStarIcon from 'public/svg/yellow-star.svg'
import React from 'react'
import { Button } from 'src/common/antd'
import { useLanguage } from 'src/common/hooks'

import { locale } from './locale'

export const UserBox = ({
  isMyPage = true,
  className = '',
  avatar,
  following = 0,
  follower = 0,
  producer,
}: React.PropsWithChildren<any>): JSX.Element => {
  const router = useRouter()
  const [lang] = useLanguage()
  const messages = locale[lang]
  return (
    <>
      <div className={`ecm-user-box md:p-5 ${className}`}>
        <div className="flex flex-col items-center md:items-start mb-20 md:mb-6">
          {avatar ? (
            <Image src={avatar} alt={messages.producer.name} width={140} height={140} />
          ) : (
            <Image src={farmerAvatar} alt={messages.producer.name} width={140} height={140} />
          )}
        </div>
        <div className="detail__address flex items-center my-2">
          <LocationIcon />
          <span className="ml-2">{producer?.address}</span>
        </div>
        <h2>{producer?.name}</h2>
        <div className="detail__reviews flex items-center my-3">
          <div className="ecm-stars flex items-center">
            {producer?.stars !== undefined && (
              <>
                {Array(producer.stars)
                  .fill(0)
                  .map(
                    (_, index: number): JSX.Element => (
                      <YellowStarIcon key={index} />
                    )
                  )}
                {Array(5 - producer?.stars)
                  .fill(0)
                  .map(
                    (_, index: number): JSX.Element => (
                      <GrayStarIcon key={index} />
                    )
                  )}
              </>
            )}
          </div>
          <Link href={'/my-page#reviews'}>
            <a className="ml-3 a-standard">レビュー（{producer?.reviewCount}件）</a>
          </Link>
        </div>
        <div className="detail__follow flex items-center my-3 md:my-5">
          <Link href={'/'}>
            <a className="a-standard mr-6">
              <span className="f-bold">
                {following}
                {messages.producer.person}
              </span>
              <span>{messages.producer.following}</span>
            </a>
          </Link>
          <Link href={'/'}>
            <a className="a-standard">
              <span className="f-bold">
                {follower}
                {messages.producer.person}
              </span>
              <span>{messages.producer.follower}</span>
            </a>
          </Link>
        </div>
        <div className="detail__message">
          <p>{producer?.aboutUs}</p>
        </div>
        <Button
          style={isMyPage ? 'outline' : 'link'}
          radius={20}
          onClick={() => {
            router.push(isMyPage ? '/my-page/vendor' : '/my-page')
          }}
        >
          {isMyPage ? <PenIcon /> : <UserIcon />}
          <span className="ml-3">{isMyPage ? messages.producer.edit : messages.producer.myPage}</span>
        </Button>
      </div>
      <style jsx global>{`
        .ecm-user-box {
          position: relative;
        }

        .ecm-user-box .ecm-button {
          position: absolute;
          top: 105px;
          left: 50%;
          transform: translate(-50%, 0);
          height: auto;
          width: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-width: 2px;
        }

        .ecm-user-box .ecm-stars svg {
          margin-right: 3px;
        }

        .ecm-user-box img {
          width: 85px !important;
          height: 85px !important;
          border-radius: 85px;
          overflow: hidden;
        }

        .ecm-user-box .detail__address svg {
          width: 15px;
          height: 20px;
        }

        .ecm-user-box .detail__address span {
          color: var(--address-color);
        }

        .ecm-user-box > h2 {
          font-size: var(--huge-font-size);
        }

        .ecm-user-box .detail__reviews a {
          font-size: var(--medium-font-size);
          text-decoration: underline;
        }

        .ecm-user-box .detail__follow .a-standard {
          font-size: var(--larger-font-size);
        }

        .ecm-user-box .detail__message {
          font-size: var(--larger-font-size);
        }

        @media (min-width: 768px) {
          .ecm-user-box .ecm-button {
            left: auto;
            transform: none;
            right: 0;
            top: 55px;
          }
        }

        @media (min-width: 1024px) {
          .ecm-user-box .ecm-button {
            top: 95px;
          }

          .ecm-user-box img {
            width: 140px !important;
            height: 140px !important;
          }

          .ecm-user-box > h2 {
            font-size: var(--heading-font-size);
          }

          .ecm-user-box .detail__reviews a {
            font-size: var(--large-font-size);
          }

          .ecm-user-box .detail__message {
            font-size: var(--large-font-size);
          }
        }
      `}</style>
    </>
  )
}
