import React from 'react'

import './Link.scss'

type LinkProps = {
  children: any,
  link: string,
  [rest:string]: any
}

const Link = ({ children, link, ...rest }: LinkProps) => (
  <a
    href={link}
    target='_blank'
    rel='noopener noreferrer'
    className='link-component'
  >
    {children}
  </a>
)

export default Link
