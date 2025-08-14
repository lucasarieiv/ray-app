interface NavItemProps {
  icon: React.ReactNode;
  expanded?: boolean;
  title: string;
  page?: string;
  activePath?: string;
  onHandleClick: (value: string) => void;
}

function activeRouter(page: string, pathname: string) {
  if (!pathname) return;
  const router = pathname.replace("/", "");
  return (
    router.startsWith(page) && ""
  );
}

export default function NavItem({
  icon,
  title,
  page,
  activePath,
  expanded,
  onHandleClick,
}: NavItemProps) {
  return (
    <button
      className="block w-full"
      onClick={() => {
        onHandleClick(`/${page}`);
      }}
    >
      <div
        className={`flex gap-[1rem] py-4 ${
          expanded && "px-4"
        } text-[1rem] items-center cursor-pointer rounded-2xl duration-300 linear  hover:text-[#2563eb] ${activeRouter(
          page,
          activePath
        )}`}
      >
        {icon}
        {expanded && <p className="text-left">{title}</p>}
      </div>
    </button>
  );
}
