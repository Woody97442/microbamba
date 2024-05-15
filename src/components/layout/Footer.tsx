import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer p-8 bg-black text-white flex flex-col md:flex-row items-baseline px-[10px] lg:px-[30px] xl:px-[200px]">
      <aside className="w-full">
        <span className="text-xl font-primary">
          <a href="/microbamba/">MICROBAMBA</a>
        </span>
      </aside>
      <nav className="gap-6 w-full flex flex-col md:flex-row justify-end">
        <a
          className="link link-hover text-lg"
          href="/microbamba/contact">
          Contact
        </a>
        <a
          className="link link-hover text-lg"
          href="/microbamba/about">
          À Propos
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
