import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import ProcessingStatus, { ProcessingStep } from "@/components/ProcessingStatus";
import TranscriptDisplay, { TranscriptSegment } from "@/components/TranscriptDisplay";
import AudioPlayer from "@/components/AudioPlayer";
import RawTranscript from "@/components/RawTranscript";
import SystemLogs, { SystemLogData } from "@/components/SystemLogs";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessingStep | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [segments, setSegments] = useState<TranscriptSegment[] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [systemLogs, setSystemLogs] = useState<SystemLogData | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle time updates from audio player
  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  // Handle segment click to seek audio
  const handleSegmentClick = useCallback((startTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      audioRef.current.play();
    }
    setCurrentTime(startTime);
  }, []);

  // Simulated processing - replace with actual API call when backend is connected
  const simulateProcessing = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setFileName(file.name);

    // Create audio URL for playback
    const url = URL.createObjectURL(file);
    setAudioUrl(url);

    try {
      // Step 1: Uploading
      setCurrentStep("uploading");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 2: Transcribing
      setCurrentStep("transcribing");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Step 3: Segmenting
      setCurrentStep("segmenting");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Completed
      setCurrentStep("completed");

      // Simulated transcript data - replace with actual API response
      const mockTranscript = `Welcome to this audio transcription demonstration. This is a sample transcript generated to show how the system works. 

The Whisper Medium model provides a good balance between accuracy and processing speed, making it ideal for production environments where GPU resources are limited.

Each segment of the audio is processed and timestamped, allowing users to navigate through the content efficiently. The transcription supports multiple languages and can handle various audio qualities.

Thank you for using our transcription service. We hope this tool helps you in your work.`;

      const mockSegments: TranscriptSegment[] = [
        {
          id: 1,
          start: 0.0,
          end: 4.5,
          text: "Welcome to this audio transcription demonstration.",
        },
        {
          id: 2,
          start: 4.5,
          end: 9.2,
          text: "This is a sample transcript generated to show how the system works.",
        },
        {
          id: 3,
          start: 9.2,
          end: 18.8,
          text: "The Whisper Medium model provides a good balance between accuracy and processing speed, making it ideal for production environments where GPU resources are limited.",
        },
        {
          id: 4,
          start: 18.8,
          end: 28.5,
          text: "Each segment of the audio is processed and timestamped, allowing users to navigate through the content efficiently.",
        },
        {
          id: 5,
          start: 28.5,
          end: 35.2,
          text: "The transcription supports multiple languages and can handle various audio qualities.",
        },
        {
          id: 6,
          start: 35.2,
          end: 42.0,
          text: "Thank you for using our transcription service. We hope this tool helps you in your work.",
        },
      ];

      // Simulated system logs - replace with actual API response
      const mockSystemLogs: SystemLogData = {
        hardware: {
          device: "NVIDIA RTX 4060",
          cuda: true,
          memory: "8GB VRAM",
        },
        model: {
          name: "Whisper Medium",
          version: "v20231117",
          language: "multilingual",
        },
        processing: {
          chunksTotal: 6,
          chunksProcessed: 6,
          duration: "6.5s",
        },
        status: "SUCCESS",
        timestamp: new Date().toISOString(),
      };

      setTranscript(mockTranscript);
      setSegments(mockSegments);
      setSystemLogs(mockSystemLogs);
      toast.success("Transcription completed successfully!");
    } catch (err) {
      setError("An error occurred during processing. Please try again.");
      setCurrentStep(null);
      toast.error("Processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (file: File) => {
    simulateProcessing(file);
  };

  const handleReset = () => {
    // Clean up audio URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setIsProcessing(false);
    setCurrentStep(null);
    setTranscript(null);
    setSegments(null);
    setFileName("");
    setAudioUrl(null);
    setCurrentTime(0);
    setError(null);
    setSystemLogs(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Upload Audio File
              </h1>
              <p className="text-muted-foreground">
                Upload your audio file and get accurate transcription with
                timestamps
              </p>
            </div>

            {/* Model Notice */}
            <div className="mb-8 rounded-lg border border-border bg-accent/50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">
                    Using Whisper Medium Model
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    This model offers ~85-90% accuracy for clear audio. For
                    noisy recordings or specialized vocabulary, accuracy may
                    vary. Consider Whisper Large for critical applications
                    requiring higher precision.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            {!currentStep && !transcript && (
              <div className="mx-auto max-w-3xl">
                <FileUploader
                  onFileSelect={handleFileSelect}
                  isProcessing={isProcessing}
                />
              </div>
            )}

            {/* Processing Status */}
            {currentStep && currentStep !== "completed" && (
              <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-8 shadow-card">
                <h2 className="mb-6 text-center text-lg font-semibold text-foreground">
                  Processing Your Audio
                </h2>
                <ProcessingStatus currentStep={currentStep} />
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Please wait while we process your file. This may take a few
                  minutes depending on the audio length.
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mx-auto max-w-3xl rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  Processing Error
                </h2>
                <p className="mb-4 text-muted-foreground">{error}</p>
                <Button onClick={handleReset} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            )}

            {/* Results */}
            {transcript && segments && currentStep === "completed" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Transcription Complete
                    </h2>
                    <p className="text-sm text-muted-foreground">{fileName}</p>
                  </div>
                  <Button onClick={handleReset} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Transcription
                  </Button>
                </div>

                {/* Audio Player */}
                {audioUrl && (
                  <div className="sticky top-20 z-40">
                    <AudioPlayer
                      audioUrl={audioUrl}
                      fileName={fileName}
                      onTimeUpdate={handleTimeUpdate}
                    />
                    {/* Hidden audio element for segment click control */}
                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      className="hidden"
                      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    />
                  </div>
                )}

                {/* Raw Transcript Panel */}
                <RawTranscript transcript={transcript} fileName={fileName} />

                {/* System Logs Panel */}
                {systemLogs && <SystemLogs logs={systemLogs} />}

                <TranscriptDisplay
                  fullTranscript={transcript}
                  segments={segments}
                  audioFileName={fileName}
                  currentTime={currentTime}
                  onSegmentClick={handleSegmentClick}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
