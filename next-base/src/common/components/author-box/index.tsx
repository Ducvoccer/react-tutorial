import Image from 'next/image'
import GrayStarIcon from 'public/svg/gray-star.svg'
import LocationIcon from 'public/svg/location.svg'
import AddUserIcon from 'public/svg/user-add.svg'
import YellowStarIcon from 'public/svg/yellow-star.svg'
import React from 'react'
import { Button } from 'src/common/antd'
import { useLanguage } from 'src/common/hooks'

import { locale } from './locale'

export const AuthorBox = ({
  avatar,
  name,
  address,
  reviews,
  following = 0,
  follower = 0,
  content,
  star = 0,
}: React.PropsWithChildren<any>): JSX.Element => {
  const [lang] = useLanguage()
  const messages = locale[lang]
  return (
    <>
      <div className="ecm-author-box p-5">
        <div className="flex items-center">
          <Image src={avatar} alt={name} />
          <h3 className="detail__name ml-4 mb-2 flex flex-col">
            <span>{name}</span>
            <small className="flex items-center mt-1">
              <LocationIcon />
              <span className="ml-2">{address}</span>
            </small>
          </h3>
        </div>
        <div className="detail__reviews flex flex-col">
          <div className="reviews flex items-center">
            <div className="ecm-stars flex items-center">
              {Array(star)
                .fill(0)
                .map(
                  (_, index: number): JSX.Element => (
                    <YellowStarIcon key={index} />
                  )
                )}
              {Array(5 - star)
                .fill(0)
                .map(
                  (_, index: number): JSX.Element => (
                    <GrayStarIcon key={index} />
                  )
                )}
            </div>
            <a className="a-standard lg:ml-3 mt-2 lg:mt-0">{reviews}</a>
          </div>
          <div className="followers flex items-center">
            <span className="mr-12">
              <span className="f-bold">
                {following}
                {messages.producer.person}
              </span>
              <span>{messages.producer.following}</span>
            </span>
            <span>
              <span className="f-bold">
                {follower}
                {messages.producer.person}
              </span>
              <span>{messages.producer.follower}</span>
            </span>
          </div>
        </div>
        <div className="detail__message text-ellipse two-lines mt-4">
          <p>{content}</p>
        </div>
        <Button style="outline" className="flex items-center">
          <AddUserIcon />
          <small className="hidden md:inline-block ml-1">{messages.follow}</small>
        </Button>
      </div>
      <style jsx global>{`
        .ecm-author-box {
          background: var(--chat-background);
          border-radius: 5px;
          position: relative;
        }

        .ecm-author-box .ecm-button {
          position: absolute;
          top: 20px;
          right: 10px;
          border-width: 1px;
          border-color: var(--base-text);
          font-weight: var(--normal-font-weight);
          color: var(--base-text);
          padding: 3px 8px;
        }

        .ecm-author-box .ecm-stars svg {
          margin-right: 3px;
        }

        .ecm-author-box img {
          width: 60px !important;
          height: 60px !important;
          border-radius: 60px;
          overflow: hidden;
        }

        .ecm-author-box h3 {
          font-size: var(--big-font-size);
        }

        .ecm-author-box h3 * {
          font-size: var(--larger-font-size);
        }

        .ecm-author-box .detail__reviews {
          margin-top: 10px;
          margin-top: -15px;
        }

        .ecm-author-box .detail__reviews .reviews {
          order: 2;
          margin-top: 8px;
        }

        .ecm-author-box .detail__reviews .followers {
          margin-top: 8px;
          margin-left: 75px;
        }

        .ecm-author-box h3 small {
          font-weight: var(--normal-font-weight);
          color: var(--location-color);
        }

        .ecm-author-box h3 small svg {
          width: 12px;
          height: 16px;
        }

        .ecm-author-box h3 small svg * {
          fill: var(--location-color);
        }

        .ecm-author-box .a-standard {
          text-decoration: underline;
          font-size: var(--larger-font-size);
        }

        .ecm-author-box .detail__message {
          font-size: var(--larger-font-size);
        }

        @media (min-width: 1024px) {
          .ecm-author-box .ecm-button {
            right: 30px;
          }

          .ecm-author-box .a-standard {
            font-size: var(--large-font-size);
          }

          .ecm-author-box .detail__message {
            font-size: var(--large-font-size);
          }

          .ecm-author-box .detail__reviews {
            margin-top: -15px;
            margin-left: 75px;
          }

          .ecm-author-box h3 {
            margin-top: -15px;
          }

          .ecm-author-box h3 * {
            font-size: var(--large-font-size);
          }

          .ecm-author-box .detail__reviews .reviews {
            order: 0;
          }

          .ecm-author-box .detail__reviews .followers {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  )
}
