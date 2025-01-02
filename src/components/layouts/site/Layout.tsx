import React from "react";
import Navbar from "@/components/navbar/Navbar";
import { UserType } from "@/components/navbar/types/UserType";

function SiteLayout({ children }: { children: React.ReactNode }) {
  const user: UserType | false = {
    id: 1,
    name: "John Doe",
    email: "G0b0z@example.com",
    role: "Admin",
    image: "https://randomuser.me/api/portraits/lego/1.jpg",
    address: "123 Main St, Anytown, USA",
    phone: "555-555-5555",
  };
  return (
    <main className="flex flex-col justify-between w-full overflow-hidden">
      <section className="container">
        <Navbar user={user ? user : false} />
      </section>
      <section className="mb-5 pt-8 w-full h-full container">
        {children}
      </section>
      <footer className="w-full">footer</footer>
    </main>
  );
}

export default SiteLayout;
