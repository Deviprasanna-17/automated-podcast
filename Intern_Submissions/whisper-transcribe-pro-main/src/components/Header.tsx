import { Link, useLocation } from "react-router-dom";
import { AudioLines } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <AudioLines className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            Whisper Transcribe
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/upload"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/upload" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Upload
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
