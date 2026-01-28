export function ChannelOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between py-2 ">
      <span className="text-sm">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled
        className=" accent-pink-500 h-4 w-4  disabled:opacity-100"
      />
    </label>
  );
}
