import type React from "react";

const Title = ({ title, icon }: { title: string; icon: React.ReactNode }) => {
	return (
		<div className="flex items-center gap-3 mb-6">
			<div className="bg-primary/10 p-2 rounded-md">{icon}</div>
			<h2 className="type-h2">{title}</h2>
		</div>
	);
};

export default Title;
