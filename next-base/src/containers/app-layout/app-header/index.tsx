import BellIcon from 'public/svg/bell.svg'
import CheckoutIcon from 'public/svg/checkout.svg'
import DollarIcon from 'public/svg/dollar.svg'
import EmailIcon from 'public/svg/email.svg'
import HomeIcon from 'public/svg/home.svg'
import LogoIcon from 'public/svg/logo.svg'
import MagicBoxIcon from 'public/svg/magic-box.svg'
import PacketIcon from 'public/svg/packet.svg'
import QuestionIcon from 'public/svg/question.svg'
import RecipeIcon from 'public/svg/recipe-book.svg'
import TodoListIcon from 'public/svg/todo-list.svg'
import UserIcon from 'public/svg/user.svg'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'src/common/antd'
import { ActiveLink } from 'src/common/components'
import { useLanguage } from 'src/common/hooks'
import { useDebouncedCallback } from 'use-debounce'

import { useAppLayoutController } from '../controller'
import { getIsMenuOpen } from '../store'
import { locale } from './locale'

// type HeaderProps = Record<string, any>
type HeaderProps = {
  searchBox?: boolean
}
type MenuItem = {
  id: string
  name: string
  icon: JSX.Element
  url: string
}

export function AppHeader({ children, searchBox }: React.PropsWithChildren<HeaderProps>): JSX.Element {
  const [lang] = useLanguage()
  const messages = locale[lang]
  const controller = useAppLayoutController()
  const isMenuOpen = useSelector(getIsMenuOpen)
  const menus = searchBox
    ? [
        {
          id: 'home',
          name: messages.home,
          icon: <HomeIcon />,
          url: '/',
        },
        {
          id: 'myApp',
          name: messages.notifications,
          icon: <BellIcon />,
          url: '/notifications',
        },
        {
          id: 'myPage',
          name: messages.myPage,
          icon: <UserIcon />,
          url: '/my-page',
        },
      ]
    : [
        {
          id: 'home',
          name: messages.home,
          icon: <HomeIcon />,
          url: '/',
        },
        {
          id: 'products',
          name: messages.products,
          icon: <PacketIcon />,
          url: '/products',
        },
        {
          id: 'orders',
          name: messages.orders,
          icon: <CheckoutIcon />,
          url: '/orders',
        },
        {
          id: 'sales',
          name: messages.sales,
          icon: <DollarIcon />,
          url: '/sales',
        },
        {
          id: 'customers',
          name: messages.customers,
          icon: <TodoListIcon />,
          url: '/customers',
        },
        {
          id: 'messages',
          name: messages.messages,
          icon: <EmailIcon />,
          url: '/messages',
        },
        {
          id: 'recipes',
          name: messages.recipes,
          icon: <RecipeIcon />,
          url: '/recipe',
        },
        {
          id: 'myApp',
          name: messages.notifications,
          icon: <BellIcon />,
          url: '/notifications',
        },
        {
          id: 'myPage',
          name: messages.myPage,
          icon: <UserIcon />,
          url: '/my-page',
        },
      ]

  useEffect(() => {
    window.addEventListener('resize', onWindowResizeDebounced)
    window.addEventListener('load', onWindowResize)
  }, [])

  const onWindowResize = () => {
    const width = window.innerWidth
    if ((width <= 1024 && isMenuOpen) || (width > 1024 && !isMenuOpen)) {
      controller.toggleMenu()
    }

    if (width > 1024) {
      document.body.classList.remove('modal-open')
    }
  }

  const onWindowResizeDebounced = useDebouncedCallback(onWindowResize, 300)

  return (
    <>
      <div className={`md:hidden flex ecm-header ${searchBox ? 'ecm-search-box' : ''} `}>
        <div className="ecm-header--left flex flex-col">
          <div>
            <div
              id="ecm-header--menu"
              className="ecm-header--menu flex flex-col items-center"
              onClick={controller.toggleMenu}
            >
              <span className="ecm-header--menu__hamburger" />
            </div>
          </div>
        </div>
      </div>
      {children}
      <style jsx>{`
        .ecm-header {
          background-color: var(--white);
          position: relative;
          z-index: var(--header-z-index);
          font-weight: 400;
          flex-direction: column;
          align-items: center;
          height: 60px;
          box-shadow: 0 2px 2px 0 var(--black-5);
        }
        .ecm-header.ecm-search-box {
          height: 130px;
        }

        .ecm-header--left {
          position: relative;
          width: 100%;
          padding: 20px;
          text-align: center;
          height: 75px;
        }

        .ecm-header--menu {
          position: absolute;
          text-align: left;
          cursor: pointer;
        }

        .ecm-header--menu__hamburger {
          position: relative;
        }

        .ecm-header--menu__hamburger,
        .ecm-header--menu__hamburger::before,
        .ecm-header--menu__hamburger::after {
          display: inline-block;
          width: 25px;
          height: 3px;
          background-color: var(--base-text);
          border-radius: 2px;
        }

        .ecm-header--menu__hamburger::before,
        .ecm-header--menu__hamburger::after {
          content: '';
          position: absolute;
        }

        .ecm-header--menu__hamburger::before {
          top: 8px;
        }

        .ecm-header--menu__hamburger::after {
          top: 16px;
        }

        .ecm-header--menu__text {
          font-size: var(--small-font-size);
        }

        .ecm-header--navbar {
          height: 71px;
          flex-grow: 1;
          margin-left: 40px;
          display: none;
        }

        .ecm-header--navbar ul li span {
          font-size: var(--small-font-size);
        }

        @media (min-width: 1024px) {
          .ecm-header {
            box-shadow: 0 4px 4px var(--header-shadow);
            flex-direction: row;
            justify-content: space-between;
            padding: 20px 40px;
            height: 90px;
          }

          .ecm-header--left {
            box-shadow: none;
            width: auto;
            height: auto;
            text-align: left;
            padding: 0;
          }

          .ecm-header--menu {
            display: none;
          }

          .ecm-header--navbar {
            height: auto;
            display: inline-block;
          }
          .ecm-header.ecm-search-box .ecm-header--navbar {
            justify-content: end;
            display: flex;
            padding-right: 100px;
          }
        }
      `}</style>
      <style jsx global>{`
        .ecm-header .ecm-header__logo {
          height: 30px;
          margin-top: -4px;
        }

        .ecm-header--navbar ul li a svg * {
          fill: var(--base-text);
        }

        .ecm-header .ecm-header--ctas {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translate(0, -50%);
        }

        .ecm-header.ecm-search-box .ecm-header--ctas {
          top: 22%;
        }
        @media (min-width: 768px) {
          .ecm-header.ecm-search-box .ecm-header--ctas {
            top: 50%;
          }
        }

        .ecm-header .ecm-header--ctas .ecm-button {
          width: 60px;
          height: 60px;
          padding: 0;
        }

        .ecm-header .ecm-header--ctas .ecm-button > span {
          font-size: var(--small-font-size);
        }

        .ecm-header .ecm-header--ctas .ecm-button svg {
          width: 25px;
          height: 25px;
        }

        @media (min-width: 1024px) {
          .ecm-header .ecm-header__logo {
            height: 50px;
            margin-top: 0;
          }
        }
      `}</style>
    </>
  )
}
