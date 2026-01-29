import { Activity, Database, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const SystemHealthMonitor = () => {
    return (
        <div className="flex flex-wrap items-center gap-4 bg-[#161616] border border-white/5 rounded-full px-6 py-2 w-fit mx-auto md:mx-0">
            <div className="flex items-center gap-2">
                <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-medium text-emerald-500 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    API Online
                </span>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-500 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    DB Connected
                </span>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-medium text-amber-500 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Socket Waiting
                </span>
            </div>
        </div>
    );
};
