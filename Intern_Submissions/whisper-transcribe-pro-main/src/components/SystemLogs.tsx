import { Terminal, Cpu, Layers, CheckCircle, XCircle } from "lucide-react";

export interface SystemLogData {
  hardware: {
    device: string;
    cuda: boolean;
    memory?: string;
  };
  model: {
    name: string;
    version: string;
    language: string;
  };
  processing: {
    chunksTotal: number;
    chunksProcessed: number;
    duration: string;
  };
  status: "SUCCESS" | "FAILED" | "PROCESSING";
  timestamp: string;
}

interface SystemLogsProps {
  logs: SystemLogData;
}

const SystemLogs = ({ logs }: SystemLogsProps) => {
  const getStatusIcon = () => {
    switch (logs.status) {
      case "SUCCESS":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "FAILED":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 animate-pulse rounded-full bg-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (logs.status) {
      case "SUCCESS":
        return "text-green-500";
      case "FAILED":
        return "text-destructive";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
        <Terminal className="h-5 w-5 text-primary" />
        System Logs
      </h3>
      <div className="max-h-[350px] overflow-y-auto rounded-lg bg-slate-900 p-4 font-mono text-xs">
        <div className="space-y-3 text-slate-300">
          {/* Timestamp */}
          <div className="text-slate-500">
            [{logs.timestamp}]
          </div>

          {/* Hardware Section */}
          <div className="border-l-2 border-primary/50 pl-3">
            <div className="mb-1 flex items-center gap-2 text-primary">
              <Cpu className="h-3 w-3" />
              <span className="font-semibold">HARDWARE</span>
            </div>
            <pre className="text-slate-400">
{`{
  "device": "${logs.hardware.device}",
  "cuda_enabled": ${logs.hardware.cuda},
  "memory": "${logs.hardware.memory || "N/A"}"
}`}
            </pre>
          </div>

          {/* Model Section */}
          <div className="border-l-2 border-blue-500/50 pl-3">
            <div className="mb-1 flex items-center gap-2 text-blue-400">
              <Layers className="h-3 w-3" />
              <span className="font-semibold">MODEL</span>
            </div>
            <pre className="text-slate-400">
{`{
  "name": "${logs.model.name}",
  "version": "${logs.model.version}",
  "language": "${logs.model.language}"
}`}
            </pre>
          </div>

          {/* Processing Section */}
          <div className="border-l-2 border-green-500/50 pl-3">
            <div className="mb-1 flex items-center gap-2 text-green-400">
              <Terminal className="h-3 w-3" />
              <span className="font-semibold">PROCESSING</span>
            </div>
            <pre className="text-slate-400">
{`{
  "chunks_total": ${logs.processing.chunksTotal},
  "chunks_processed": ${logs.processing.chunksProcessed},
  "duration": "${logs.processing.duration}"
}`}
            </pre>
          </div>

          {/* Status */}
          <div className="mt-4 flex items-center gap-2 border-t border-slate-700 pt-3">
            {getStatusIcon()}
            <span className={`font-semibold ${getStatusColor()}`}>
              STATUS: {logs.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
