"use client";
import { Calculator, LayoutList, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import NavItem from "./nav-item";
import { signOut } from "next-auth/react";

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(path: string) {
    router.push(path);
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="fixed top-0 left-0 w-[16rem] flex flex-col justify-between h-full p-4 bg-[#fff] border-gray-300 border-r-[1px]">
        <nav className="flex flex-col text-[#737791] mt-4 gap-2">
          <NavItem
            title={"Calculadora"}
            page={"calculator"}
            activePath={pathname}
            icon={<Calculator size={24} />}
            onHandleClick={handleClick}
          />
          <NavItem
            title={"Histórico"}
            page={"history"}
            activePath={pathname}
            icon={<LayoutList size={24} />}
            onHandleClick={handleClick}
          />
        </nav>
        <div className="">
          <NavItem
            title={"Sair"}
            icon={<LogOut size={24} />}
            onHandleClick={handleSignOut}
          />
        </div>
    </div>
  );
}
