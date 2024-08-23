import { ChartLegend, ChartLegendContent, ChartTooltip, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
interface GraphProps {
  weekStats: [
    {
      EARPHONES: number;
      HEADPHONES: number;
      SPEAKERS: number;
    },
  ];
}
const Graph = ({ weekStats }: GraphProps) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekStatsWithIndex = weekStats.map((stat, index) => ({
    ...stat,
    day: daysOfWeek[index],
  }));
  const chartConfig = {
    EARPHONES: {
      label: "EARPHONES",
      color: "#fbaf85", // Main Color
    },
    HEADPHONES: {
      label: "HEADPHONES",
      color: "#fcc1a0", // Complementary Color 1
    },
    SPEAKERS: {
      label: "SPEAKERS",
      color: "#ffe3c6", // Complementary Color 2
    },
  } satisfies ChartConfig;

  // const chartConfig = {
  //   EARPHONES: {
  //     label: "EARPHONES",
  //     color: "#8b9b95", // Main Color
  //   },
  //   HEADPHONES: {
  //     label: "HEADPHONES",
  //     color: "#a2b2a1", // Lighter Complementary Color 1
  //   },
  //   SPEAKERS: {
  //     label: "SPEAKERS",
  //     color: "#c1c8c0", // Lightest Color
  //   },
  // } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="max-h-[20rem] min-h-[200px] w-full">
      <BarChart accessibilityLayer data={weekStatsWithIndex}>
        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
        <ChartTooltip content={ <ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="EARPHONES" fill="var(--color-EARPHONES)" radius={4} />
        <Bar dataKey="HEADPHONES" fill="var(--color-HEADPHONES)" radius={4} />
        <Bar dataKey="SPEAKERS" fill="var(--color-SPEAKERS)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
export default Graph;
