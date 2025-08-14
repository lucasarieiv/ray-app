"use client";
import {
  Calculator,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import NavItem from "./nav-item";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  function handleClick(path: string) {
    router.push(path);
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <aside
      className={`${
        expanded ? "w-[20rem]" : "w-[4rem]"
      } relative transition-all flex flex-col justify-between h-auto p-4 bg-[#fff] border-gray-300 border-r-[1px]`}
    >
      <nav className="flex flex-col text-[#737791] mt-4 gap-2">
        <button
          onClick={() => setExpanded((cur) => !cur)}
          className="cursor-pointer text-[#2563eb] absolute right-0 -top-2 flex items-center justify-center translate-[50%] bg-blue-100 w-8 h-8 rounded-full"
        >
            {expanded ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
        </button>
        <NavItem
          expanded={expanded}
          title={"Calculadora"}
          page={"calculator"}
          activePath={pathname}
          icon={<Calculator size={24} />}
          onHandleClick={handleClick}
        />
        <NavItem
          expanded={expanded}
          title={"Histórico"}
          page={"history"}
          activePath={pathname}
          icon={<LayoutList size={24} />}
          onHandleClick={handleClick}
        />
      </nav>
      <div className="">
        <NavItem
          expanded={expanded}
          title={"Sair"}
          icon={<LogOut size={24} />}
          onHandleClick={handleSignOut}
        />
      </div>
    </aside>
  );
}
