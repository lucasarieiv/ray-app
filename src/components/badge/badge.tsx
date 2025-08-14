interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  return (
    <div className="flex items-center py-2 px-4 justify-center gap-2 rounded-full bg-[#2563eb] font-semibold">
      <p className="text-white">{text}</p>
    </div>
  );
}
