"use client";
import useSWR from 'swr';
import GenericAreaGraph from "../components/ChartCard";
import StatCard from "../components/StatCard";
import {
    HomeActiveChatsIcon,
    HomeNewApplicantsIcon,
    HomeReplyRateIcon,
} from "../../../utils/svgicons";
import VerticalMilestoneGraph from "../components/VerticalMilestoneGraph";
import { getDahboardData } from '@/services/admin-services';

const applicantsPerWeek = [
    { label: "Mon", value: 220 },
    { label: "Tue", value: 180 },
    { label: "Wed", value: 240 },
    { label: "Thu", value: 210 },
    { label: "Fri", value: 200 },
    { label: "Sat", value: 280 },
    { label: "Sun", value: 260 },
];

const averageReplyTime = [
    { label: "6 hrs", value: 40 },
    { label: "12 hrs", value: 55 },
    { label: "24", value: 48 },
    { label: "48", value: 60 },
    { label: "72", value: 52 },
    { label: "96", value: 75 },
    { label: "Never", value: 70 },
];

const data1 = [
    { label: "Nov", value: 40 },
    { label: "Dec", value: 55 },
    { label: "Jan", value: 80, active: true },
];

export default function DashboardPage() {
      const { data, error, isLoading } = useSWR(
          "/api/app/overview",          // ✅ stable key
          getDahboardData,              // ✅ fetcher
          {
              revalidateOnFocus: false,
              dedupingInterval: 60_000,
            }
        );
        // const { newApplicantsToday,applicantsLast7Days } = data.data.stats || {};
        const stats = data?.data?.stats || {};
        const charts = data?.data?.charts || {};
        console.log('charts.weeklyApplicants: ', charts.averageReplyTime);
    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">

            {/* LEFT SECTION */}
            <div className="w-full xl:w-[70%] flex flex-col gap-8">

                {/* Header */}
                <h1 className="text-[#EF476F] text-xl sm:text-2xl font-extrabold">
                    Statistics
                </h1>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <StatCard
                        title="New Applicants Today"
                        value={stats.newApplicantsToday || 0}
                        icon={HomeNewApplicantsIcon()}
                    />
                    <StatCard
                        title="Applicants (Last 7 days)"
                        value={stats.applicantsLast7Days || 0}
                        icon={HomeNewApplicantsIcon()}
                    />
                    <StatCard
                        title="Reply Rate (%)"
                        value={stats.replyRate || 0}
                        icon={HomeReplyRateIcon()}
                    />
                    <StatCard
                        title="Active Chats"
                        value={stats.activeChats || 0}
                        icon={HomeActiveChatsIcon()}
                    />
                </div>

                {/* GRAPHS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <GenericAreaGraph
                        data={charts.applicantsPerWeek || []}
                        title="Applicants Per Week"
                    />
                    <GenericAreaGraph
                        data={charts.averageReplyTime || []}
                        title="Average Reply Time"
                    />
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full lg:w-[35%]">
                <VerticalMilestoneGraph
                    title="Applicants increase in last 6 months"
                    percentageText={stats.applicantsGrowthPercent}
                    data={charts.monthData || []}
                />
            </div>
        </div>
    );
}

