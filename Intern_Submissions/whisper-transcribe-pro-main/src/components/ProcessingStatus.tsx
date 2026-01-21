import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProcessingStep = "uploading" | "transcribing" | "segmenting" | "completed";

interface ProcessingStatusProps {
  currentStep: ProcessingStep;
  className?: string;
}

const steps: { key: ProcessingStep; label: string }[] = [
  { key: "uploading", label: "Uploading" },
  { key: "transcribing", label: "Transcribing" },
  { key: "segmenting", label: "Segmenting" },
  { key: "completed", label: "Completed" },
];

const ProcessingStatus = ({ currentStep, className }: ProcessingStatusProps) => {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex || currentStep === "completed";
          const isCurrent = index === currentIndex && currentStep !== "completed";
          const isPending = index > currentIndex;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted && "border-success bg-success",
                    isCurrent && "border-primary bg-primary",
                    isPending && "border-border bg-card"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-success-foreground" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary-foreground" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isCompleted && "text-success",
                    isCurrent && "text-primary",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 transition-colors duration-300",
                    index < currentIndex || currentStep === "completed"
                      ? "bg-success"
                      : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingStatus;
