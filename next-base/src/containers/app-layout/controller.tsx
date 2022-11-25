import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { appLayoutStoreProps, getRoot, toggleMenu as toggleMenuBar } from './store';

const ctx: Types.ControllerContext<appLayoutStoreProps> = {}

export function useAppLayoutController() {
  ctx.dispatch = useDispatch()
  ctx.router = useRouter()
  ctx.state = useSelector(getRoot)
  return {
    toggleMenu,
  }
}

const toggleMenu = () => {
  ctx.dispatch(toggleMenuBar())
}
