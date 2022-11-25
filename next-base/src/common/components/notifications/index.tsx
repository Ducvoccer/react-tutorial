import PenIcon from 'public/svg/pen.svg'
import React, { useState } from 'react'
import { Button } from 'src/common/antd'
import { useLanguage } from 'src/common/hooks'

import { InfoBox } from '../info-box'
import { locale } from './locale'

export const Notifications = ({ className = '' }: React.PropsWithChildren<any>): JSX.Element => {
  const [lang] = useLanguage()
  const messages = locale[lang]
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: 1,
      title: messages.sample.first,
      read: true,
    },
    ...Array.from(new Array(4), (_, index: number): any => ({
      id: index + 2,
      title: messages.sample.second,
      read: index !== 3,
    })),
  ])

  const handleToggleNotification = (notificationIndex: number, read: boolean) => {
    if (notificationIndex >= 0) {
      setNotifications((oldNotifications) => [
        ...oldNotifications.map((notification: any, index: number) => {
          if (notificationIndex === index)
            return {
              ...notification,
              read,
            }
          return notification
        }),
      ])
    }
  }

  return (
    <>
      <InfoBox color title={messages.title} className="mt-6 update-box">
        <div className={`ecm-notifications ${className} mb-6`}>
          <p className="mb-12">{messages.description}</p>
          {notifications.length > 0 && (
            <ul className="ecm-notifications__list">
              {notifications.map(
                (notification: any, index: number): JSX.Element => (
                  <li className="mb-5 flex items-center justify-between" key={index}>
                    <span>{notification.title}</span>
                    <span
                      onClick={() => handleToggleNotification(index, !notification.read)}
                      className={`f-bold a-standard hoverable ${notification.read ? 'read' : 'unread'}`}
                    >
                      {notification.read ? messages.read : messages.unread}
                    </span>
                  </li>
                )
              )}
            </ul>
          )}
          <div className="flex items-center justify-center mt-12">
            <Button style="outline" radius={20} size="medium" className="edit-btn">
              <PenIcon />
              <span className="ml-3">{messages.edit}</span>
            </Button>
          </div>
        </div>
      </InfoBox>
      <style jsx global>{`
        .ecm-notificaations p,
        .ecm-notificaations li {
          font-size: var(--larger-font-size);
        }

        .ecm-notifications .ecm-button {
          width: 250px;
        }

        .ecm-notifications__list li span:first-child {
          max-width: calc(100% - 100px);
        }

        .ecm-notifications__list li span:first-child:before {
          content: '•';
          margin-right: 5px;
        }

        .ecm-notifications__list li .a-standard.read {
          color: var(--primary-color);
          cursor: pointer;
        }

        .ecm-notifications__list li .a-standard.unread {
          color: var(--variant-border);
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .ecm-notificaations p,
          .ecm-notificaations li {
            font-size: var(--base-font-size);
          }
        }
      `}</style>
    </>
  )
}
