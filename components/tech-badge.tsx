import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
	children: React.ReactNode;
	variant?: "default" | "secondary" | "outline" | "destructive";
	className?: string;
}

export function TechBadge({
	children,
	variant = "secondary",
	className,
}: TechBadgeProps) {
	return (
		<Badge
			variant={variant}
			className={cn("rounded-none font-mono text-xs", className)}
		>
			{children}
		</Badge>
	);
}
