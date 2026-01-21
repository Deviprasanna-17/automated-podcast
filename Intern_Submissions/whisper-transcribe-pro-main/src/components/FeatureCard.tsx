import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
        <Icon className="h-6 w-6 text-accent-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
