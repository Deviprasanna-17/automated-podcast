import { FileCode, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface RawTranscriptProps {
  transcript: string;
  fileName: string;
}

const RawTranscript = ({ transcript, fileName }: RawTranscriptProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      toast.success("Transcript copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <FileCode className="h-5 w-5 text-primary" />
          Raw Transcript
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="gap-2 text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </Button>
      </div>
      
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded bg-muted px-2 py-0.5 font-mono">
          {fileName}
        </span>
        <span>•</span>
        <span>{transcript.split(/\s+/).length} words</span>
        <span>•</span>
        <span>{transcript.length} characters</span>
      </div>

      <div className="max-h-[300px] overflow-y-auto rounded-lg bg-slate-900 p-4">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
          {transcript}
        </pre>
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        <span className="font-medium">Note:</span> Raw output from Whisper Medium model. 
        Punctuation and formatting are auto-generated.
      </div>
    </div>
  );
};

export default RawTranscript;
