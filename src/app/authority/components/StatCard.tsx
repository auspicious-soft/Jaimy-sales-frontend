interface StatCardProps {
  title: string;
  value: string | number;
  icon?:any;
}

export default function StatCard({ title, value, icon }: any) {
  return (
    <div className="w-full flex flex-col bg-[#312B2C] gap-5 rounded-xl p-5 border border-white/10">
        {icon && (
          <div className="flex gap-5">
          <div className="text-xl h-[33px] p-2 rounded-[5px] bg-[#191A19]">
            {icon}
          </div>
          <p className="text-2xl font-semibold text-pink-500 ">
            {value}
          </p>
          </div>
        )}
          <p className="text-white text-xs font-medium plusJakartaSans" >{title}</p>
    </div>
  );
}
