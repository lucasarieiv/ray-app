"use client";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";

export function TopBar() {
  // const pathname = usePathname();
  // const routeMap: Record<string, string> = {
  //   calculator: "Calculadora",
  //   history: "Histórico",
  //   teste: "Testes",
  // };

  // const items = pathname
  //   .split("/")
  //   .slice(1, pathname.split("/").length)
  //   .map((item) => {
  //     return routeMap[item];
  //   });

  return (
    <div className="flex items-center  border-gray-300 border-b-[1px] h-14 w-full">
      <div className="flex px-8 items-center">
        {/* <Home size={24} className="mr-2"/>
        {items.map((item) => (
          <div className="flex" key={item}>
            <ChevronRight size={24} />
            <p className="text-lg mx-2">{item}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
