import Menu from "@/components/menu/Menu";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

type Tab = {
  title: string;
  icon: "PiLock" | "PiFolder" | "PiUser" | "PiMapPin";
  products: Product[];
};

export default function Page() {
  const tabs: Tab[] = [
    {
      title: "Lock",
      icon: "PiLock",
      products: [
        {
          id: 1,
          name: "Product 1",
          price: 20,
          image: "/images/logo1.jpg",
        },
        {
          id: 2,
          name: "Product 1",
          price: 20,
          image: "/images/logo1.jpg",
        },
        {
          id: 3,
          name: "Product 1",
          price: 20,
          image: "/images/logo1.jpg",
        },
        {
          id: 4,
          name: "Product 1",
          price: 20,
          image: "/images/logo1.jpg",
        },
        {
          id: 5,
          name: "Product 1",
          price: 20,
          image: "/images/logo1.jpg",
        },
      ],
    },
    {
      title: "Folder",
      icon: "PiFolder",
      products: [
        {
          id: 2,
          name: "Product 2",
          price: 30,
          image: "/images/logo1.jpg",
        },
      ],
    },
    {
      title: "User",
      icon: "PiUser",
      products: [
        {
          id: 3,
          name: "Product 3",
          price: 40,
          image: "/images/logo1.jpg",
        },
      ],
    },
    {
      title: "Map",
      icon: "PiMapPin",
      products: [
        {
          id: 4,
          name: "Product 4",
          price: 50,
          image: "/images/logo1.jpg",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex justify-center items-center w-full">
        <Menu
          tabs={tabs}
          activeColor="text-blue-500"
          className="border-secondary dark:border-primary"
        />
      </div>
    </div>
  );
}
