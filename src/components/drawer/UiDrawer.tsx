import React from "react";
import * as Icons from "react-icons/pi";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";

interface DrawerType {
  direction: "right" | "top" | "bottom" | "left";
  icon: string;
  title: string;
  contentTrigger?: React.ReactNode;
  styleTrigger?: string;
  styleContent?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}
function UiDrawer({
  direction,
  icon,
  title,
  content,
  footer,
  contentTrigger,
  styleTrigger,
  styleContent,
}: DrawerType) {
  const Icon = Icons[icon as keyof typeof Icons];
  return (
    <Drawer direction={direction}>
      <DrawerTrigger className={styleTrigger}>
        <Icon size={24} />
        {contentTrigger ? <>{contentTrigger}</> : null}
      </DrawerTrigger>
      <DrawerContent className={`w-full lg:w-[30%] ${styleContent}`}>
        <DrawerHeader>
          <DrawerTitle className="flex justify-between items-center">
            <div>
              <h1 className="text-md">{title}</h1>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost">
                <Icons.PiX size={18} />
              </Button>
            </DrawerClose>
          </DrawerTitle>
          {content ? (
            <>{content}</>
          ) : (
            <DrawerDescription>Not content</DrawerDescription>
          )}
        </DrawerHeader>
        {footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </Drawer>
  );
}

export default UiDrawer;
