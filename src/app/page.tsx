import Navbar from "@/components/navbar/Navbar";
import Menu from "@/components/menu/Menu";

type Tab = {
  title: string;
  icon: string;
};

export default function Page() {
  const tabs: Tab[] = [
    { title: "Lock", icon: "PiLock" },
    { title: "Folder", icon: "PiFolder" },
    { title: "User", icon: "PiUser" },
    { title: "Map", icon: "PiMapPin" },
  ];

  return (
    <main className="flex flex-col justify-center w-screen">
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <Menu
          tabs={tabs}
          activeColor="text-blue-500"
          className="border-secondary dark:border-primary"
        />
      </div>
    </main>
  );
}
