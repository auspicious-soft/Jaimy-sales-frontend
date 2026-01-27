import { Pencil } from "lucide-react";

export function TemplateBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-zinc-950 rounded-lg p-4 mb-4 border border-zinc-800 relative">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">{title}</h4>
        <button className="p-2 rounded-md hover:bg-zinc-800">
          <Pencil className="h-4 w-4 text-pink-500" />
        </button>
      </div>

      <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-sans">
        {text}
      </pre>
    </div>
  );
}
