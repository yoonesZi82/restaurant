import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardType } from "./types/CardType";
import Image from "next/image";

function UiCard({ title, description, image, price }: CardType) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full"
        />
        <CardTitle className="px-4 pt-4">{title}</CardTitle>
        <CardDescription className="px-4">{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <p>{price}</p>
      </CardContent>
    </Card>
  );
}

export default UiCard;
