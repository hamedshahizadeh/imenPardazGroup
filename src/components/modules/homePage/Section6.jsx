import React from "react";
import cards from "@/data/datas";
import Card from "../card/Card";
export default function Section6() {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 pt-6 pb-10">
      {cards.map((item) => (
     <Card key={item.id} {...item} />
      ))}
    </div>
  );
}
