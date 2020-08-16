import React from 'react'


type InfoSectionProps = {
  text?: string,
  title?: string,
 
  [rest:string]: any
}

const Button = ({ text, title, ...rest }: InfoSectionProps) => {


  return (
    <section className="info_section">
    <h2 className  = "header_style">{title}</h2>
    <p>
     {text}
    </p>
  </section>
  )
}

export default Button
