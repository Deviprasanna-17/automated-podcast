import { AudioLines } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <AudioLines className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Whisper Transcribe
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Powered by OpenAI Whisper Medium Model
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
