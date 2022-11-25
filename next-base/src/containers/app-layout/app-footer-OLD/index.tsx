import FacebookIcon from 'public/svg/facebook.svg'
import InstagramIcon from 'public/svg/instagram.svg'
import LineIcon from 'public/svg/line.svg'
import LogoIcon from 'public/svg/logo.svg'
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
      <div className="ecm-footer px-4">
        <div className="container mx-auto flex">
          <div className="w-full ecm-footer__logo lg:hidden my-1 mt-5">
            <ActiveLink href={'/'}>
              <a>
                <LogoIcon className="ecm-header__logo" />
              </a>
            </ActiveLink>
          </div>
        </div>
        <div className="container mx-auto flex gap-0 lg:gap-x-5 py-8">
          <div className="w-1/2 lg:w-4/5">
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-x-5">
              <div className="w-full lg:w-1/4 ecm-footer__about">
                <ul>
                  <li className="mb-5">
                    <ActiveLink href={'/about-us'}>
                      <a className="a-standard">
                        <h4>{messages.aboutUs}</h4>
                      </a>
                    </ActiveLink>
                  </li>
                  <li className="mb-5">
                    <ActiveLink href={'/quality-standard'}>
                      <a className="a-standard">
                        <h4>{messages.qualityStandard}</h4>
                      </a>
                    </ActiveLink>
                  </li>
                  <li className="mb-5 lg:mb-0">
                    <ActiveLink href={'/warranty'}>
                      <a className="a-standard">
                        <h4>{messages.warranty}</h4>
                      </a>
                    </ActiveLink>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-1/4 ecm-footer__guide">
                <ul>
                  <li className="mb-5">
                    <ActiveLink href={'/user-guide'}>
                      <a className="a-standard">
                        <h4>{messages.userGuide}</h4>
                      </a>
                    </ActiveLink>
                  </li>
                  <li className="mb-5">
                    <ActiveLink href={'/help'}>
                      <a className="a-standard">
                        <h4>{messages.help}</h4>
                      </a>
                    </ActiveLink>
                  </li>
                  <li className="mb-5 lg:mb-0">
                    <ActiveLink href={'/inquiry'}>
                      <a className="a-standard">
                        <h4>{messages.inquiry}</h4>
                      </a>
                    </ActiveLink>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-2/4 ecm-footer__hiring">
                <ul>
                  <li className="mb-5">
                    <h4>{messages.toProducers}</h4>
                  </li>
                  <li className="mb-5 lg:mb-0">
                    <p>{messages.hiring}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-1/2 lg:w-1/5 ecm-footer__social-accounts">
            <ul>
              <li className="mb-5">
                <h4>{messages.socialAccounts}</h4>
              </li>
              <li>
                <ol className="flex items-center">
                  {socialAccounts.map(
                    (account: SocialItem): JSX.Element => (
                      <li key={account.id} className="mr-3">
                        <ActiveLink href={account.url}>
                          <a className="a-standard">{account.icon}</a>
                        </ActiveLink>
                      </li>
                    )
                  )}
                </ol>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto flex flex-col">
          <div className="ecm-footer__links mt-5 px-3">
            <ul className="flex items-center justify-center flex-wrap">
              <li className="mr-5">
                <ActiveLink href={'/operating-company'}>
                  <a className="a-standard">{messages.operatingCompany}</a>
                </ActiveLink>
              </li>
              <li className="mr-5">
                <ActiveLink href={'/terms-of-service'}>
                  <a className="a-standard">{messages.termsOfService}</a>
                </ActiveLink>
              </li>
              <li className="mr-5">
                <ActiveLink href={'/privacy-policy'}>
                  <a className="a-standard">{messages.privacyPolicy}</a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href={'/description'}>
                  <a className="a-standard">{messages.description}</a>
                </ActiveLink>
              </li>
            </ul>
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

        .ecm-footer__about ul li a,
        .ecm-footer__guide ul li a,
        .ecm-footer__hiring ul li h4 {
          font-size: var(--medium-font-size);
          position: relative;
          display: block;
        }

        .ecm-footer__hiring p,
        .ecm-footer__links ul li a {
          font-size: var(--tiny-font-size);
        }

        .ecm-footer__copyright p {
          font-size: var(--extra-tiny-font-size);
        }

        .ecm-footer__hiring p,
        .ecm-footer__copyright p {
          line-height: 2;
        }

        .ecm-footer__links ul li {
          position: relative;
        }

        .ecm-footer__links ul li::after {
          content: '';
          width: 1px;
          height: 50%;
          background-color: var(--footer-separator);
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translate(0, -50%);
        }

        .ecm-footer__links ul li:last-child::after,
        .ecm-footer__links ul li:nth-last-child(2)::after {
          display: none;
        }

        .ecm-footer__about ul li a::before,
        .ecm-footer__guide ul li a::before,
        .ecm-footer__hiring ul li h4::before {
          content: '';
          width: 10px;
          height: 1px;
          background-color: var(--primary-color);
          position: absolute;
          left: 0;
          bottom: -5px;
        }

        @media (min-width: 416px) {
          .ecm-footer__links ul li:nth-last-child(2)::after {
            display: inline-block;
          }
        }

        @media (min-width: 1024px) {
          .ecm-footer {
          }

          .ecm-footer__links ul li a {
            font-size: var(--medium-font-size);
          }

          .ecm-footer__hiring p,
          .ecm-footer__copyright p {
            font-size: var(--tiny-font-size);
            line-height: 1.5;
          }

          .ecm-footer__about ul li a::before,
          .ecm-footer__guide ul li a::before,
          .ecm-footer__hiring ul li h4::before {
            display: none;
          }
        }
      `}</style>
      <style jsx global>{`
        .ecm-footer__logo a svg {
          height: 43px;
        }
      `}</style>
    </>
  )
}
