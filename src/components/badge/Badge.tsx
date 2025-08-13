import { X } from "lucide-react";

interface BadgeProps {
  idx: number;
  value: number;
  handleDelete: (idx: number) => void;
}

export function Badge({idx, value, handleDelete}: BadgeProps) {
  return (
    <div
      className="flex items-center py-2 px-4 justify-center gap-2 rounded-full bg-[#2563eb] font-semibold"
    >
      <p className="text-white">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)}
      </p>
      <div
        onClick={() => handleDelete(idx)}
        className="cursor-pointer flex items-center justify-center rounded-full bg-white w-4 h-4"
      >
        <X size={14} color="#2563eb"  />
      </div>
    </div>
  );
}
