import React from "react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer p-8 bg-black text-white flex flex-col md:flex-row items-baseline px-[10px] lg:px-[30px] xl:px-[200px]">
      <aside className="w-full">
        <span className="text-xl font-primary">
          <NavLink to="/">MICROBAMBA</NavLink>
        </span>
      </aside>
      <nav className="gap-6 w-full flex flex-col md:flex-row justify-end">
        <NavLink
          className="link link-hover text-lg"
          to="/contact">
          Contact
        </NavLink>
        <NavLink
          className="link link-hover text-lg"
          to="/about">
          À Propos
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
