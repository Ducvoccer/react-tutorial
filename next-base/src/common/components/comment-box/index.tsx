import Image from 'next/image'
import DownChevronPinkIcon from 'public/svg/down-chevron-pink.svg'
import GrayStarIcon from 'public/svg/gray-star.svg'
import RightChevronYellowIcon from 'public/svg/right-chevron-yellow.svg'
import SendIcon from 'public/svg/send.svg'
import YellowStarIcon from 'public/svg/yellow-star.svg'
import React, { useState } from 'react'
import { Button } from 'src/common/antd'
import { FormField } from 'src/common/components'
import { useLanguage } from 'src/common/hooks'

import { locale } from './locale'

enum CommentType {
  REVIEW = 'review',
  QUESTION = 'question',
}

export const CommentBox = ({
  type = CommentType.REVIEW,
  sub = false,
  hot,
  avatar,
  name,
  content,
  star = 0,
  date,
  images = [],
  replies = [],
}: React.PropsWithChildren<any>): JSX.Element => {
  const [lang] = useLanguage()
  const messages = locale[lang]
  const [showReplies, setShowReplies] = useState(false)

  return (
    <>
      <div className="ecm-comment-box__wrapper mb-6">
        <div className={`ecm-comment-box ${sub ? '' : 'p-5'} ${type}`}>
          <div className={`ecm-comment-box__main ${!sub && type === CommentType.QUESTION ? 'has-border pb-4' : ''}`}>
            {!sub && type === CommentType.REVIEW && (
              <div className="detail__reviews flex items-center justify-between">
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
                <span className="detail__date">{date}</span>
              </div>
            )}
            <div className={`thumbnail ${sub ? `flex items-center justify-between` : ''}`}>
              <div className="flex-1 flex items-center py-3">
                <Image src={avatar} alt={name} />
                <h3 className="detail__name ml-4">{name}</h3>
              </div>
              {sub && <span className="detail__date">{date}</span>}
            </div>
            <div className="detail__message-wrapper my-3">
              <div className={`detail__message ${type === CommentType.REVIEW ? 'text-ellipse two-lines' : ''}`}>
                <p>{content}</p>
              </div>
              {type === CommentType.REVIEW && <a className="view-more">{messages.review.seeMore}</a>}
            </div>
            {type === CommentType.REVIEW && (
              <div className="detail__images flex items-center">
                {images.map(
                  (image: any, index: number): JSX.Element => (
                    <Image src={image} alt={`image-${index}`} key={index} />
                  )
                )}
              </div>
            )}

            {type === CommentType.QUESTION && !sub && (
              <div className="detail__hot flex items-center justify-between">
                <Image src={hot.avatar} alt="hot answer" />
                <p className="f-bold flex-1 ml-3 mr-6">{hot.content}</p>
                <RightChevronYellowIcon />
              </div>
            )}
            {type === CommentType.QUESTION && (
              <div className="detail__view-replies mt-3">
                <span className="detail__date">{date}</span>
              </div>
            )}
            {!sub && (
              <a
                className="detail__view-replies flex items-center hoverable mt-3"
                onClick={() => setShowReplies(!showReplies)}
              >
                <span className="mr-2">{messages.review.replies.replace('$reviews', replies.length)}</span>
                <DownChevronPinkIcon />
              </a>
            )}
            {showReplies && (
              <div className="ecm-comment-box__replies">
                {replies.map(
                  (reply: any, index: number): JSX.Element => (
                    <CommentBox type={type} sub {...reply} key={index} />
                  )
                )}
              </div>
            )}
          </div>
          {!sub && type === CommentType.QUESTION && (
            <div className="ecm-comment-box__form-wrapper pt-4">
              <div className="ecm-comment-box__form flex items-center">
                <FormField containerClass="flex-1" type="input" placeholder={messages.question.commentPlaceholder} />
                <Button className="ml-3" style="link">
                  <SendIcon />
                </Button>
              </div>
            </div>
          )}
        </div>
        {!sub && type === CommentType.REVIEW && (
          <div className="mt-2">
            <p className="my-3">{messages.review.helpful}</p>
            <Button style="outline" radius={5}>
              {messages.review.helpfulCta}
            </Button>
          </div>
        )}
      </div>
      <style jsx global>{`
        .ecm-comment-box {
          background: var(--chat-background);
          border-radius: 10px;
        }

        .ecm-comment-box .detail__date {
          font-size: var(--tiny-font-size);
          color: var(--sidebar-border);
        }

        .ecm-comment-box .ecm-stars svg {
          margin-right: 3px;
        }

        .ecm-comment-box.review .thumbnail {
          border-bottom: 1px dotted var(--chat-date-color);
        }

        .ecm-comment-box .thumbnail img {
          width: 40px !important;
          height: 40px !important;
          border-radius: 40px;
          overflow: hidden;
        }

        .ecm-comment-box .thumbnail h3,
        .ecm-comment-box .detail__message {
          font-size: var(--larger-font-size);
        }

        .ecm-comment-box .thumbnail h3 {
          max-width: calc(100% - 60px);
        }

        .ecm-comment-box.question .detail__message-wrapper {
          background: var(--white);
          border-radius: 5px;
          padding: 15px;
          margin-left: 50px;
          margin-top: 0;
        }

        .ecm-comment-box .detail__view-replies {
          color: var(--primary-border);
          font-size: var(--larger-font-size);
        }

        .ecm-comment-box .detail__message-wrapper {
          position: relative;
        }

        .ecm-comment-box .detail__message-wrapper > a {
          color: var(--variant-border);
          position: absolute;
          bottom: 0;
          right: 6px;
          background: var(--chat-background);
        }

        .ecm-comment-box .detail__message-wrapper > a:before {
          content: '...';
        }

        .ecm-comment-box .detail__images img {
          width: 160px !important;
        }

        .ecm-comment-box .detail__images > span {
          margin-right: 15px !important;
        }

        .ecm-comment-box .detail__view-replies {
          color: var(--primary-color);
        }

        .ecm-comment-box .detail__view-replies svg {
          width: 8px;
          height: 12px;
        }

        .ecm-comment-box__wrapper > p {
          font-size: var(--tiny-font-size);
        }

        .ecm-comment-box__wrapper > .ecm-button {
          font-size: var(--tiny-font-size);
        }

        .ecm-comment-box .ecm-comment-box__replies {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid var(--chat-date-color);
        }

        .ecm-comment-box .ecm-comment-box__form .ecm-input {
          border-color: var(--dot-background);
          border-radius: 30px;
          font-size: var(--larger-font-size);
          background: var(--white);
        }

        .ecm-comment-box .ecm-comment-box__form .ecm-form-field__input {
          padding: 0;
        }

        .ecm-comment-box .ecm-comment-box__form .ecm-button {
          border: none;
          background: transparent;
          box-shadow: none;
        }

        .ecm-comment-box .ecm-comment-box__form .ecm-button:after {
          display: none;
        }

        .ecm-comment-box .detail__hot {
          background: var(--variant-background);
          border: 1px solid var(--variant-border);
          border-radius: 5px;
          padding: 5px 10px;
        }

        .ecm-comment-box .detail__hot p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ecm-comment-box .detail__hot img {
          width: 30px !important;
          height: 30px !important;
        }

        .ecm-comment-box.question .detail__view-replies {
          margin-left: 50px;
        }

        .ecm-comment-box__main.has-border {
          border-bottom: 1px solid var(--chat-date-color);
        }

        @media (min-width: 1024px) {
          .ecm-comment-box .detail__reviews > span {
            font-size: var(--small-font-size);
          }

          .ecm-comment-box .thumbnail h3 {
            font-size: var(--big-font-size);
          }

          .ecm-comment-box .detail__message {
            font-size: var(--large-font-size);
          }

          .ecm-comment-box__wrapper > p {
            font-size: var(--large-font-size);
          }

          .ecm-comment-box__wrapper > .ecm-button {
            font-size: var(--large-font-size);
          }

          .ecm-comment-box .ecm-comment-box__form {
            max-width: 90%;
            margin: 0 auto;
          }

          .ecm-comment-box .detail__hot img {
            width: 46px !important;
            height: 46px !important;
          }

          .ecm-comment-box .detail__hot p {
            white-space: initial;
            overflow: initial;
            text-overflow: initial;
          }
        }
      `}</style>
    </>
  )
}
