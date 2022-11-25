import { CommonButton } from 'common-ui/components'
import { clearSessionCookie } from 'common-ui/open-api/cookie'
import Router from 'next/router'
import BarChart from 'public/svg/bar-chart.svg'
import CheckoutIcon from 'public/svg/checkout.svg'
import DiscountIcon from 'public/svg/discount.svg'
import ProductIcon from 'public/svg/groceries.svg'
import BlogIcon from 'public/svg/icon-blog.svg'
import LogoIcon from 'public/svg/logo.svg'
import PinIcon from 'public/svg/pin.svg'
import RecipeIcon from 'public/svg/recipe-book.svg'
import RemoveIcon from 'public/svg/remove.svg'
import RightChevronGrayIcon from 'public/svg/right-chevron-gray.svg'
import SettingIcon from 'public/svg/setting.svg'
import UserIcon from 'public/svg/user-checked.svg'
import VendorIcon from 'public/svg/vendor.svg'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ActiveLink } from 'src/common/components'
import { useOutsideAlerter } from 'src/common/hooks/useOutsideAlerter'

import { useAppLayoutController } from '../controller'
import { getIsMenuOpen } from '../store'

type MenuProps = Record<string, any>
// type MenuItem = {
//   id: string
//   name: string
//   icon: JSX.Element
//   url: string
// }

export function AppMenu({ children }: React.PropsWithChildren<MenuProps>): JSX.Element {
  const controller = useAppLayoutController()
  const isMenuOpen = useSelector(getIsMenuOpen)
  const wrapperRef = useRef()
  useOutsideAlerter(
    wrapperRef,
    () => {
      // MOBILE: when click outside app menu, hide app menu
      // DESKTOP: skip it
      const isSidebarOpen =
        wrapperRef && wrapperRef.current ? (wrapperRef.current as any).classList.contains('open') : false
      const isMobile = (window || {}).innerWidth <= 1024
      if (isMobile && isSidebarOpen) {
        controller.toggleMenu()
      }
    },
    'ecm-header--menu'
  )

  const menus = [
    {
      id: 'buyer',
      name: 'ユーザー管理',
      url: '',
      icon: <UserIcon />,
      child: [{ name: 'ユーザー一覧', url: '/buyer' }],
    },
    {
      id: 'vendors',
      name: '生産者管理',
      url: '',
      icon: <VendorIcon />,
      child: [
        { name: '新規登録申請', url: '/vendor/registration-request' },
        { name: '生産者一覧', url: '/vendor/list' },
      ],
    },
    {
      id: 'products',
      name: '商品管理',
      url: '',
      icon: <ProductIcon />,
      child: [{ name: '商品一覧', url: '/products' }],
    },
    {
      id: 'orders',
      name: '注文管理',
      url: '',
      icon: <CheckoutIcon />,
      child: [
        { name: '注文一覧', url: '/order/list' },
        { name: 'キャンセル申請一覧', url: '/order/cancel-order' },
      ],
    },
    {
      id: 'recipe',
      name: 'レシピ管理',
      url: '',
      icon: <RecipeIcon />,
      child: [
        { name: 'レシピ数値管理', url: '/recipe/manager' },
        { name: 'レシピ一覧', url: '/recipe/list' },
      ],
    },
    {
      id: 'blogs',
      name: '記事管理',
      url: '/blogs',
      icon: <BlogIcon />,
    },
    {
      id: 'banner',
      name: 'バナー登録',
      url: '/banner',
      icon: <PinIcon />,
    },
    {
      id: 'gmo',
      name: 'GMO送金',
      url: '/gmo',
      icon: <BarChart />,
    },
    {
      id: 'discounts',
      url: '/discounts',
      name: 'クーポン管理',
      icon: <DiscountIcon />,
    },
    {
      id: 'setting',
      name: '基本設定',
      url: '',
      icon: <SettingIcon />,
      child: [
        { name: '見出し/掲載ロジック管理', url: '' },
        { name: '商品カテゴリー編集', url: '/setting/product-category' },
        { name: 'レシピカテゴリー編集', url: '/setting/recipe-category' },
        { name: '材料カテゴリー編集', url: '/setting/ingredient-category' },
        { name: 'ハッシュタグ編集', url: '/setting/hashtag' },
        { name: '管理アカウント設定', url: '/setting/account-admin' },
      ],
    },
  ]

  useEffect(() => {
    const isMobile = (window || {}).innerWidth <= 1024
    if (isMobile) {
      if (isMenuOpen) {
        document.body.classList.add('modal-open')
      } else {
        document.body.classList.remove('modal-open')
      }
    }
  }, [isMenuOpen])

  const onLogout = async () => {
    clearSessionCookie()
    Router.replace('/login')
  }

  return (
    <>
      <div ref={wrapperRef} id="ecm-sidebar" className={`ecm-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo flex items-center justify-between p-5">
          <ActiveLink href={'/'}>
            <a>
              <LogoIcon width={90} className="ecm-header__logo" />
            </a>
          </ActiveLink>
          <RemoveIcon width={15} height={15} onClick={controller.toggleMenu} />
        </div>
        <ul className="ecm-sidebar__inner">
          {menus.map(
            (menu): JSX.Element => (
              <li key={menu.id} onClick={controller.toggleMenu}>
                <ActiveLink href={menu.url}>
                  <a className="flex items-center a-standard py-1 px-4">
                    {menu.icon}
                    <span className="lg:ml-5">{menu.name}</span>
                    <RightChevronGrayIcon className="ml-auto" />
                  </a>
                </ActiveLink>

                {menu.child &&
                  menu.child.map((child) => (
                    <div className="flex items-center a-standard py-1 px-4" key={child.name}>
                      <ActiveLink href={child.url}>
                        <a className="flex items-center a-standard py-1 px-4">
                          <span className="lg:ml-5 !text-xs">{child.name}</span>
                        </a>
                      </ActiveLink>
                      <RightChevronGrayIcon className="ml-auto" />
                    </div>
                  ))}
              </li>
            )
          )}
          <div className="text-center">
            <CommonButton type="indigo" className="mt-[30px] mb-[10px] md:mt-[63px]" size="small" onClick={onLogout}>
              ログアウトする
            </CommonButton>
          </div>
        </ul>
      </div>
      {children}
      <style jsx>{`
        .ecm-sidebar {
          position: fixed;
          left: -100%;
          top: 0;
          width: 85%;
          transition: all var(--animation-duration) ease-in-out;
          background-color: var(--white);
          z-index: var(--sidebar-z-index);
          overflow: hidden;
          z-index: 1000;
        }

        .ecm-sidebar .ecm-sidebar__inner {
          border: 1px solid var(--sidebar-item-border);
        }

        /* NOTICE: Update menu height based on number of items */
        .ecm-sidebar.open {
          left: 0;
        }

        .ecm-sidebar .ecm-sidebar__inner li {
          position: relative;
        }

        .ecm-sidebar .ecm-sidebar__inner li {
          border-bottom: 1px solid var(--sidebar-item-border);
        }

        .ecm-sidebar .ecm-sidebar__inner li:last-child a {
          border-bottom: 0;
        }

        .ecm-sidebar .ecm-sidebar__inner li a span {
          font-size: var(--small-font-size);
          font-weight: var(--bold-font-weight);
        }

        @media (min-width: 1024px) {
          .ecm-sidebar {
            position: relative;
            left: auto;
            top: auto;
            max-height: initial;
            height: initial;
            width: auto;
            max-width: initial;
            transition: none;
          }

          .ecm-sidebar.open {
            max-height: initial;
            height: initial;
          }

          .ecm-sidebar__inner {
            border: none;
          }

          .ecm-sidebar .ecm-sidebar__inner li a span {
            font-size: var(--large-font-size);
          }

          .ecm-sidebar .ecm-sidebar__inner {
            border: none;
          }
        }
      `}</style>
      <style jsx global>{`
        .modal-open:after {
          content: '';
          background: var(--black-50);
          width: 100%;
          height: 100%;
          z-index: 999;
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          transition: all var(--animation-duration) ease-in-out;
        }

        .ecm-sidebar.open .logo > svg {
          position: fixed;
          z-index: 1000;
          right: 20px;
          top: 15px;
        }

        .ecm-sidebar .logo > svg * {
          fill: var(--white);
        }

        .ecm-sidebar__chevron {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translate(0, -50%);
        }

        .ecm-sidebar .ecm-sidebar__inner li a svg {
          display: none;
        }

        .ecm-sidebar .ecm-sidebar__inner li a svg * {
          fill: var(--base-text);
        }

        @media (min-width: 1024px) {
          .ecm-sidebar .ecm-sidebar__inner li a svg {
            display: inline-block;
          }
        }
      `}</style>
    </>
  )
}
