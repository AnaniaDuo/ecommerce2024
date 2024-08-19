import React from "react";
import facebookIcon from "../../public/fb-logo.svg";
import instaIcon from "../../public/insta-logo.svg";

function Footer() {
  return (
    <footer className="flex items-center justify-between px-16 text-center text-white z-10 bg-black h-40">
      <div className="flex gap-3 items-center">
        <p className="mr-4">Follow us</p>
        <a href="https://facebook.com" target="_blank">
          <img
            className="rounded-lg w-8 h-8 border-2 p-2"
            src={facebookIcon}
            alt="Facebook Logo"
          />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img
            className="rounded-lg w-8 h-8 border-2 p-2"
            src={instaIcon}
            alt="Instagram Logo"
          />
        </a>
      </div>
      <p>CopyRight© 2024. All Right Reserved.</p>
    </footer>
  );
}

export default Footer;
