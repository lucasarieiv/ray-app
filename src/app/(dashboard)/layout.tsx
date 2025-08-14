import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import SideBar from "@/components/sideBar/side-bar";
import { TopBar } from "@/components/topBar/top-bar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="">
      <TopBar />
      <section className="flex flex-1 overflow-y-auto">
        <SideBar />
        <div className="w-full overflow-x-auto">
          <div className="sm:h-[calc(99vh-60px)] overflow-auto">
            <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh -120px)] overflow-y-auto relative">
              <div className="w-full p-8 md:max-6xl mt-6 ">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
