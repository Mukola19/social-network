import { ListItemButton } from '@mui/material'
import cl from 'classnames'
import React from 'react'
import { To, useLocation, useNavigate, useResolvedPath } from 'react-router-dom'

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  reloadDocument?: boolean
  replace?: boolean
  state?: any
  to: To
}

export interface NavLinkProps
  extends Omit<LinkProps, 'className' | 'style' | 'children'> {
  children?:
    | React.ReactNode
    | ((props: { isActive: boolean }) => React.ReactNode)
  caseSensitive?: boolean
  className?: string | ((props: { isActive: boolean }) => string | undefined)
  activeClassName?: string
  end?: boolean
  style?:
    | React.CSSProperties
    | ((props: { isActive: boolean }) => React.CSSProperties)
}

export const ListItemButtonLink = React.forwardRef<HTMLAnchorElement, any>(
  function NavLinkWithRef(
    {
      'aria-current': ariaCurrentProp = 'page',
      caseSensitive = false,
      className: classNameProp = '',
      activeClassName: activeClassNameProp = '',
      end = false,
      style: styleProp,
      to,
      children,
      ...rest
    },
    ref
  ) {
    let location = useLocation()
    let navigate = useNavigate()
    let path = useResolvedPath(to)

    let locationPathname = location.pathname
    let toPathname = path.pathname
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase()
      toPathname = toPathname.toLowerCase()
    }

    let isActive =
      locationPathname === toPathname ||
      (!end &&
        locationPathname.startsWith(toPathname) &&
        locationPathname.charAt(toPathname.length) === '/')

    let ariaCurrent = isActive ? ariaCurrentProp : undefined

    let activeClassName: string | undefined

    if (isActive) {
      activeClassName = activeClassNameProp
    }

    let className: string | undefined
    if (typeof classNameProp === 'function') {
      className = classNameProp({ isActive })
    } else {
      // If the className prop is not a function, we use a default `active`
      // class for <NavLink />s that are active. In v5 `active` was the default
      // value for `activeClassName`, but we are removing that API and can still
      // use the old default behavior for a cleaner upgrade path and keep the
      // simple styling rules working as they currently do.
      className = [classNameProp, isActive ? 'active' : null]
        .filter(Boolean)
        .join(' ')
    }

    let style =
      typeof styleProp === 'function' ? styleProp({ isActive }) : styleProp

    return (
      <ListItemButton
        {...rest}
        aria-current={ariaCurrent}
        className={cl(className, activeClassName)}
        ref={ref}
        style={style}
        onClick={() => navigate(to)}
      >
        {typeof children === 'function' ? children({ isActive }) : children}
      </ListItemButton>
    )
  }
)
