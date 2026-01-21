import { Download, FileText, FileJson, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TranscriptSegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface TranscriptDisplayProps {
  fullTranscript: string;
  segments: TranscriptSegment[];
  audioFileName: string;
  currentTime?: number;
  onSegmentClick?: (startTime: number) => void;
}

const TranscriptDisplay = ({
  fullTranscript,
  segments,
  audioFileName,
  currentTime = 0,
  onSegmentClick,
}: TranscriptDisplayProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  const isSegmentActive = (segment: TranscriptSegment): boolean => {
    return currentTime >= segment.start && currentTime < segment.end;
  };

  const downloadTxt = () => {
    const content = fullTranscript;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${audioFileName.replace(/\.[^/.]+$/, "")}_transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadJson = () => {
    const content = JSON.stringify(
      {
        fileName: audioFileName,
        segments: segments.map((seg) => ({
          id: seg.id,
          start: formatTime(seg.start),
          end: formatTime(seg.end),
          startSeconds: seg.start,
          endSeconds: seg.end,
          text: seg.text,
        })),
      },
      null,
      2
    );
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${audioFileName.replace(/\.[^/.]+$/, "")}_segments.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCsv = () => {
    const headers = "ID,Start,End,Start (seconds),End (seconds),Text\n";
    const rows = segments
      .map(
        (seg) =>
          `${seg.id},"${formatTime(seg.start)}","${formatTime(seg.end)}",${seg.start},${seg.end},"${seg.text.replace(/"/g, '""')}"`
      )
      .join("\n");
    const content = headers + rows;
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${audioFileName.replace(/\.[^/.]+$/, "")}_segments.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Download Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={downloadTxt} variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Download .txt
        </Button>
        <Button onClick={downloadJson} variant="outline" className="gap-2">
          <FileJson className="h-4 w-4" />
          Download .json
        </Button>
        <Button onClick={downloadCsv} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download .csv
        </Button>
      </div>

      {/* Full Transcript */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <FileText className="h-5 w-5 text-primary" />
          Full Transcript
        </h3>
        <div className="max-h-[300px] overflow-y-auto rounded-lg bg-muted p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {fullTranscript}
          </p>
        </div>
      </div>

      {/* Segmented Timestamps */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <Clock className="h-5 w-5 text-primary" />
          Segmented Timestamps
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            (Click to jump to segment)
          </span>
        </h3>
        <div className="max-h-[400px] space-y-3 overflow-y-auto">
          {segments.map((segment) => {
            const isActive = isSegmentActive(segment);
            return (
              <div
                key={segment.id}
                onClick={() => onSegmentClick?.(segment.start)}
                className={cn(
                  "flex cursor-pointer gap-4 rounded-lg border p-4 transition-all duration-300",
                  isActive
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-muted/50 hover:bg-muted hover:border-primary/50"
                )}
              >
                <div className="flex-shrink-0">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {formatTime(segment.start).slice(0, 5)} - {formatTime(segment.end).slice(0, 5)}
                  </span>
                </div>
                <p
                  className={cn(
                    "flex-1 text-sm transition-colors",
                    isActive ? "font-medium text-foreground" : "text-foreground"
                  )}
                >
                  {segment.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TranscriptDisplay;
