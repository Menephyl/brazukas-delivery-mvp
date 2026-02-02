import { motion } from "framer-motion";
import { Box, Palette, Database } from "lucide-react";

const pillars = [
    {
        id: "phase1",
        title: "Phase 1: Setup",
        progress: 100,
        icon: Box,
        color: "text-emerald-500",
        bg: "bg-emerald-500/20",
        description: "Infra & Base Code",
    },

    {
        id: "phase2",
        title: "Phase 2: UI/UX",
        progress: 80,
        icon: Palette,
        color: "text-blue-500",
        bg: "bg-blue-500/20",
        description: "Design System",
    },
    {
        id: "backend",
        title: "Backend Core",
        progress: 50,
        icon: Database,
        color: "text-amber-500",
        bg: "bg-amber-500/20",
        description: "API & Database",
    },
];

export const ProgressTracker = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map((pillar, index) => (
                <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="bg-[#161616] border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${pillar.bg} ${pillar.color}`}>
                            <pillar.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-2xl font-bold ${pillar.color}`}>
                            {pillar.progress}%
                        </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-1">
                        {pillar.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">{pillar.description}</p>

                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pillar.progress}%` }}
                            transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: "easeOut" }}
                            className={`h-full ${pillar.color.replace("text-", "bg-")}`}
                        />
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${pillar.bg} blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity`} />
                </motion.div>
            ))}
        </div>
    );
};
