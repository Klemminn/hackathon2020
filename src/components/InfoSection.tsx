import React from "react";

import './InfoSection.scss'

type InfoSectionProps = {
  text?: string;
  title?: string;
  imagePath?: string;

  [rest: string]: any;
};

const Button = ({ text, title, imagePath, ...rest }: InfoSectionProps) => {
  return (
    <section className="info_section" {...rest}>
      <img alt="Jöfnum okkur" src={imagePath} />
      <h2 className="header_style">{title}</h2>
      <p>{text}</p>
    </section>
  );
};

export default Button;
