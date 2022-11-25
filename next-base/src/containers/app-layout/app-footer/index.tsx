import FacebookIcon from 'public/svg/facebook.svg'
import InstagramIcon from 'public/svg/instagram.svg'
import LineIcon from 'public/svg/line.svg'
import TiktokIcon from 'public/svg/tiktok.svg'
import TwitterIcon from 'public/svg/twitter.svg'
import { ActiveLink } from 'src/common/components'
import { useLanguage } from 'src/common/hooks'

import { locale } from './locale'

type FooterProps = Record<string, any>

type SocialItem = {
  id: string
  icon: JSX.Element
  url: string
}

export function AppFooter({ children }: React.PropsWithChildren<FooterProps>): JSX.Element {
  const [lang] = useLanguage()
  const messages = locale[lang]
  const links = [
    {
      name: messages.company,
      url: '/',
    },
    {
      name: messages.terms,
      url: '/',
    },
    {
      name: messages.policy,
      url: '/',
    },
    {
      name: messages.description,
      url: '/',
    },
    {
      name: messages.column,
      url: '/',
    },
    {
      name: messages.faq,
      url: '/',
    },
    {
      name: messages.inquiry,
      url: '/',
    },
  ]
  const socialAccounts: SocialItem[] = [
    {
      id: 'instagram',
      icon: <InstagramIcon />,
      url: 'http://instagram.com',
    },
    {
      id: 'facebook',
      icon: <FacebookIcon />,
      url: 'http://facebook.com',
    },
    {
      id: 'twitter',
      icon: <TwitterIcon />,
      url: 'http://twitter.com',
    },
    {
      id: 'line',
      icon: <LineIcon />,
      url: 'http://line.com',
    },
    {
      id: 'tiktok',
      icon: <TiktokIcon />,
      url: 'http://tiktok.com',
    },
  ]

  return (
    <>
      <div className="ecm-footer pt-8 pb-3 px-4">
        <div className="container mx-auto flex flex-col">
          <div className="ecm-footer__links mb-5">
            <ul className="flex flex-col lg:flex-row lg:items-center justify-center flex-wrap">
              {links.map(
                (link: any): JSX.Element => (
                  <li className="my-2 lg:mx-3" key={link.name}>
                    <ActiveLink href={link.url}>
                      <a className="a-standard hoverable">{link.name}</a>
                    </ActiveLink>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="ecm-footer__social">
            <p className="lg:hidden mb-2 text-center f-bold">{messages.account}</p>
            <ol className="flex items-center justify-center">
              {socialAccounts.map(
                (account: SocialItem): JSX.Element => (
                  <li key={account.id} className="mr-3">
                    <ActiveLink href={account.url}>
                      <a className="a-standard hoverable">{account.icon}</a>
                    </ActiveLink>
                  </li>
                )
              )}
            </ol>
          </div>
          <div className="ecm-footer__copyright mt-5 mb-3">
            <p className="text-center">{messages.copyright}</p>
          </div>
        </div>
      </div>
      {children}
      <style jsx>{`
        .ecm-footer {
          background-color: var(--footer-background);
        }

        .ecm-footer__copyright p {
          font-size: var(--extra-tiny-font-size);
        }

        .ecm-footer__copyright p {
          line-height: 2;
        }

        .ecm-footer__links ul li a {
          font-size: var(--medium-font-size);
          color: var(--base-text);
        }

        .ecm-footer__social > p {
          font-size: var(--medium-font-size);
        }

        @media (min-width: 1024px) {
          .ecm-footer {
          }

          .ecm-footer__links ul li a {
            font-size: var(--medium-font-size);
          }

          .ecm-footer__copyright p {
            font-size: var(--tiny-font-size);
            line-height: 1.5;
          }
        }
      `}</style>
      <style jsx global>{``}</style>
    </>
  )
}
