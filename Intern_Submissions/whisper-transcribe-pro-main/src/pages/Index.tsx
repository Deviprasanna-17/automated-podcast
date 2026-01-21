import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import {
  Upload,
  FileText,
  Clock,
  Download,
  Zap,
  Globe,
  AlertTriangle,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description:
        "Simply drag and drop your audio files or click to browse. Supports MP3, WAV, and M4A formats up to 25MB.",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description:
        "Powered by OpenAI's Whisper Medium model for efficient transcription without GPU-heavy requirements.",
    },
    {
      icon: Globe,
      title: "Multilingual",
      description:
        "Automatic language detection and transcription support for 99+ languages out of the box.",
    },
    {
      icon: Clock,
      title: "Timestamp Segmentation",
      description:
        "Get precise timestamps for each segment of your audio, making navigation and editing effortless.",
    },
    {
      icon: FileText,
      title: "Multiple Formats",
      description:
        "Download your transcript as plain text or export segmented data as JSON or CSV for further processing.",
    },
    {
      icon: Download,
      title: "Instant Downloads",
      description:
        "All transcripts are processed locally on our servers. Download your files instantly upon completion.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Professional Audio{" "}
                <span className="text-primary">Transcription</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground lg:text-xl">
                Transform your audio files into accurate, timestamped transcripts
                using OpenAI's Whisper technology. Fast, reliable, and ready for
                production.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild variant="hero" size="xl">
                  <Link to="/upload">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Audio
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Model Info Banner */}
        <section className="border-b border-t border-border bg-accent/50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Using Whisper Medium Model:
                </span>{" "}
                Optimized for standard GPU configurations. For highest accuracy on
                complex audio, consider Whisper Large (requires dedicated GPU).
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Everything You Need
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                A complete transcription solution designed for clarity, usability,
                and production-readiness.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Upload your first audio file and experience professional-grade
                transcription in minutes.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Transcribing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
