import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import SideBar from "@/components/sideBar/SideBar";
import { TopBar } from "@/components/topBar/TopBar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <SideBar />
      <section className="ml-[16rem] flex flex-col flex-1 overflow-y-auto">
        <TopBar />
        <div className="w-full p-8 md:gap-10 ">{children}</div>
      </section>
    </div>
  );
}
