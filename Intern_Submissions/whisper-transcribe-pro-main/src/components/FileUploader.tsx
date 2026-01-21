import { useCallback, useState } from "react";
import { Upload, File, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

const FileUploader = ({
  onFileSelect,
  isProcessing,
  acceptedFormats = [".mp3", ".wav", ".m4a"],
  maxSizeMB = 25,
}: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!acceptedFormats.includes(extension)) {
      return `Invalid file format. Accepted: ${acceptedFormats.join(", ")}`;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File too large. Maximum size: ${maxSizeMB}MB`;
    }
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }
    setError(null);
    setSelectedFile(file);
  }, [acceptedFormats, maxSizeMB]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200",
          dragActive
            ? "border-primary bg-accent"
            : "border-border bg-card hover:border-primary/50 hover:bg-accent/50",
          isProcessing && "pointer-events-none opacity-50"
        )}
      >
        <input
          type="file"
          accept={acceptedFormats.join(",")}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={isProcessing}
        />
        <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="mb-2 text-center text-sm font-medium text-foreground">
          Drag and drop your audio file here
        </p>
        <p className="text-center text-xs text-muted-foreground">
          or click to browse
        </p>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Supported formats: {acceptedFormats.join(", ")} • Max size: {maxSizeMB}MB
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {selectedFile && !error && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <File className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFile}
              disabled={isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {selectedFile && !error && (
        <Button
          onClick={handleUpload}
          disabled={isProcessing}
          className="w-full"
          size="lg"
          variant="hero"
        >
          {isProcessing ? "Processing..." : "Start Transcription"}
        </Button>
      )}
    </div>
  );
};

export default FileUploader;
