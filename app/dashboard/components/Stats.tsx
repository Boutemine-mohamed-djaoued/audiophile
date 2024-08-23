import { MdAttachMoney } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";
import Graph from "./Graph";
import Button from "@/app/util/components/Button";
interface CardStats {
  title: string;
  value: number;
  icon: JSX.Element;
}

const CardStats = ({ title, value, icon }: CardStats) => {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-1 ring-1 ring-black ring-opacity-20">
      <div className="rounded-full bg-off-black text-white">{icon}</div>
      <div>
        <div className="text-500 font-semibold text-gray-800">
          {title != "Total Sold" ? "$ " : ""}
          {value.toLocaleString()}
        </div>
        <div className="text-gray-400">{title}</div>
      </div>
    </div>
  );
};

interface StatsProps {
  total: number;
  thisWeek: number;
  totalSold: number;
  weekStats: [
    {
      EARPHONES: number;
      HEADPHONES: number;
      SPEAKERS: number;
    },
  ];
}

const Stats = ({ total, thisWeek, totalSold, weekStats }: StatsProps) => {
  const cardStats = [
    {
      title: "Total Earned",
      value: total,
      icon: <MdAttachMoney className="m-2" size={30} />,
    },
    {
      title: "This Week",
      value: thisWeek,
      icon: <BsCalendar2Week className="m-[0.7rem]" size={25} />,
    },
    {
      title: "Total Sold",
      value: totalSold,
      icon: <MdOutlineSell className="m-2" size={30} />,
    },
  ];
  return (
    <>
      <div className="my-4 flex gap-4">
        {cardStats.map((card, index) => (
          <CardStats key={index} {...card}></CardStats>
        ))}
      </div>
      <Graph weekStats={weekStats}></Graph>
    </>
  );
};
export default Stats;
