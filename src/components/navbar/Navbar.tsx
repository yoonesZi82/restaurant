"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PiMoonStars, PiSun } from "react-icons/pi";
import { useDarkMode } from "usehooks-ts";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { UserType } from "./types/UserType";
import UiDrawer from "../drawer/UiDrawer";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Navbar({ user }: { user: UserType | false }) {
  const { isDarkMode } = useDarkMode();
  const [isDarkModeHook, setIsDarkModeHook] = useState(isDarkMode);
  const [showEffect, setShowEffect] = useState(false);
  const [basket, setBasket] = useState<number | null>(null);
  const [mount, setMount] = useState(false);

  const toggleMode = () => {
    setShowEffect(true);
    setTimeout(() => {
      setIsDarkModeHook((prev) => !prev);
      setShowEffect(false);
    }, 500);
  };

  useEffect(() => {
    const order = localStorage.getItem("order");
    if (order) {
      setBasket(order.length);
    }
  }, [basket]);

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

  const navbarItems = [
    {
      title: "Category",
      href: "/",
    },
    {
      title: "About Us",
      href: "/about-us",
    },
    {
      title: "Contact Us",
      href: "/contact-us",
    },
    {
      title: "Privacy",
      href: "/privacy",
    },
    {
      title: "Account",
      href: "/dashboard",
    },
    {
      title: "Sign up",
      href: "/signup",
    },
    {
      title: "Sign in",
      href: "/signin",
    },
  ];

  return (
    <header className="flex justify-between items-center p-4 w-full">
      <UiDrawer
        direction="left"
        icon="PiList"
        title="Menu"
        styleTrigger="block lg:hidden"
        content={
          <ul className="flex flex-col justify-start items-start gap-6 mt-4 w-full">
            {navbarItems.slice(0, user ? 5 : 7).map((item, index) => {
              return (
                <Link href={item.href} key={index} className="w-full">
                  <li className="hover:bg-muted p-2 rounded-lg w-full text-base text-start hover:text-primary transition-colors duration-300 cursor-pointer">
                    {item.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        }
        footer={user ? <Button className="w-full">Sign Out</Button> : null}
      />

      <div className="lg:flex flex-row-reverse justify-center items-center gap-4 hidden">
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
        <Button
          className={`hover:bg-secondary hover:text-muted ${
            user ? "hidden" : ""
          }`}
        >
          Sign In
        </Button>
        <Button
          className={`bg-secondary text-muted hover:text-secondary ${
            user ? "hidden" : ""
          }`}
        >
          Sign Up
        </Button>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback> {user.name} </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel> {user.name} </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">
                  Account
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-primary hover:!text-primary cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
      <NavigationMenu className="lg:flex hidden">
        <NavigationMenuList
          className={`gap-[80px] ${!user ? "pr-[195px]" : ""}`}
        >
          {navbarItems.slice(0, user ? 4 : 7).map((item, index) => {
            return (
              <NavigationMenuItem
                key={index}
                className="hover:text-primary transition-colors duration-300"
              >
                <NavigationMenuLink href={item.href}>
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <UiDrawer
        direction="right"
        icon="PiShoppingCart"
        styleTrigger="relative hover:motion-preset-shake"
        title="Basket"
        contentTrigger={
          basket ? (
            <div className="-top-2 -right-2 absolute flex justify-center items-center bg-primary rounded-full w-5 h-5">
              <span className="text-white text-xs">{basket}</span>
            </div>
          ) : null
        }
        content={
          <div className="flex justify-center items-center">
            <span className="text-muted text-sm">No items </span>
          </div>
        }
        footer={
          <>
            {user ? (
              <Button disabled={basket ? false : true}>pay</Button>
            ) : (
              <>
                <Button className="hover:bg-secondary hover:text-muted">
                  Sign In
                </Button>
                <Button className="bg-secondary text-muted hover:text-secondary">
                  Sign Up
                </Button>
              </>
            )}
          </>
        }
      />

      {showEffect && (
        <div className="top-1/2 left-1/2 z-[9999] fixed rounded-full w-0 h-0 transition-effect -translate-x-1/2 -translate-y-1/2"></div>
      )}
    </header>
  );
}

export default Navbar;
