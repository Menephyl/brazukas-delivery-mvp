import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, ArrowRight, Circle } from "lucide-react";

interface Log {
    id: number;
    message: string;
    type: "info" | "success" | "warning";
    timestamp: string;
}

const MOCK_LOGS = [
    { message: "Carregando variáveis de ambiente (.env)...", type: "info" },
    { message: "Servidor Express iniciado (Porta 3000)", type: "success" },
    { message: "Conectando ao PostgreSQL (Docker)...", type: "info" },
    { message: "Connection Pool: 5/10 active connections", type: "warning" },
    { message: "Database Schema 'lojas' verificado", type: "success" },
    { message: "Seed Executado: 'Eletrônicos Paraguai' inserido", type: "success" },
    { message: "Rota GET /lojas inicializada", type: "info" },
    { message: "Middleware CORS configurado", type: "info" },
    { message: "[Warning] Autenticação ainda não implementada", type: "warning" },
    { message: "Sistema pronto para receber requisições", type: "success" },
];

export const LogIntegracao = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentIndex = 0;

        // Initial log
        addLog(MOCK_LOGS[0], 0);
        currentIndex++;

        const interval = setInterval(() => {
            if (currentIndex < MOCK_LOGS.length) {
                addLog(MOCK_LOGS[currentIndex], currentIndex);
                currentIndex++;
            } else {
                // Reset or loop logic if desired, or verify with random events
                const randomLog = MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)];
                addLog({ ...randomLog, message: `[Update] ${randomLog.message}` }, Date.now());
            }
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const addLog = (logData: { message: string, type: string }, id: number) => {
        const newLog: Log = {
            id,
            message: logData.message,
            type: logData.type as "info" | "success" | "warning",
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };

        setLogs(prev => [newLog, ...prev].slice(0, 8)); // Keep last 8 logs
    };

    return (
        <div className="bg-[#161616] border border-white/5 rounded-xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Terminal className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-white">Log de Integração</h3>
                    <p className="text-xs text-gray-400">Feedback do sistema em tempo real</p>
                </div>
            </div>

            <div className="space-y-4 overflow-hidden relative" ref={scrollRef}>
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: "auto" }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-start gap-3 text-sm"
                        >
                            <div className="mt-1">
                                {log.type === "success" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                {log.type === "warning" && <Circle className="w-3.5 h-3.5 text-amber-500" />}
                                {log.type === "info" && <ArrowRight className="w-3.5 h-3.5 text-blue-500" />}
                            </div>
                            <div className="flex-1">
                                <span className="text-xs text-gray-500 font-mono mr-2">[{log.timestamp}]</span>
                                <span className={`
                  ${log.type === "success" ? "text-gray-200" : ""}
                  ${log.type === "warning" ? "text-amber-200" : ""}
                  ${log.type === "info" ? "text-blue-200" : ""}
                `}>
                                    {log.message}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Gradient fade at bottom if needed, but since we add to top, no need */}
            </div>
        </div>
    );
};
