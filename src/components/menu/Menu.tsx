"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import * as Icons from "react-icons/pi";
import Image from "next/image";
import UiCard from "../card/UiCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
interface Tab {
  title: string;
  icon: keyof typeof Icons;
  products: Product[];
}

interface ExpandableTabsProps {
  tabs: Tab[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export default function Menu({
  tabs,
  className,
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = useState<number | null>(0);
  const outsideClickRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const selectTab = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center w-full">
        <div
          ref={outsideClickRef}
          className={cn(
            "flex w-fit flex-wrap items-center gap-2 rounded-2xl bg-muted p-1 shadow-sm",
            className
          )}
        >
          {tabs.map((tab, index) => {
            const Icon = Icons[tab.icon] as React.ElementType;
            return (
              <motion.button
                key={tab.title}
                variants={buttonVariants}
                initial={false}
                animate="animate"
                custom={selected === index}
                onClick={() => selectTab(index)}
                transition={transition}
                className={cn(
                  "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
                  selected === index
                    ? cn("bg-background", "text-foreground")
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {Icon && <Icon className="mr-2 w-5 h-5" />}
                <AnimatePresence initial={false}>
                  {selected === index && (
                    <motion.span
                      variants={spanVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={transition}
                      className="overflow-hidden"
                    >
                      {tab.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="place-content-center gap-10 border-muted grid grid-cols-2 lg:grid-cols-4 bg-transparent mt-4 py-4 border-t w-full">
        {selected !== null &&
          tabs[selected].products.map((product) => (
            <UiCard
              key={product.id}
              title={product.name}
              description="card"
              image={product.image}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
}
