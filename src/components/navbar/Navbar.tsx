"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { PiMoonStars, PiSun } from "react-icons/pi";
import { useDarkMode } from "usehooks-ts";

function Navbar() {
  const { isDarkMode } = useDarkMode();
  const [isDarkModeHook, setIsDarkModeHook] = useState(isDarkMode);
  const [showEffect, setShowEffect] = useState(false);
  const [mount, setMount] = useState(false);

  const toggleMode = () => {
    setShowEffect(true);
    setTimeout(() => {
      setIsDarkModeHook((prev) => !prev);
      setShowEffect(false);
    }, 500);
  };

  useEffect(() => {
    setMount(true);
    if (isDarkModeHook) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkModeHook]);

  if (!mount) {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-4 w-full">
      <Image
        src="/images/logo1.jpg"
        alt="logo"
        width={70}
        height={70}
        className="rounded-full"
      />

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="ghost"
          onClick={toggleMode}
          className="bg-transparent shadow-none"
        >
          {isDarkModeHook ? (
            <PiSun size={40} color="white" />
          ) : (
            <PiMoonStars size={40} color="black" />
          )}
        </Button>
        <Button className="hover:bg-secondary hover:text-muted">Sign In</Button>
        <Button className="bg-secondary text-muted hover:text-secondary">
          Sign Up
        </Button>
      </div>

      {showEffect && <div className="transition-effect"></div>}
    </header>
  );
}

export default Navbar;
