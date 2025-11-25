/* eslint-disable */

const funnyLoadingMessages = [
	"Brewing the digital brew",
	"Crafting the web with code",
	"Assembling the digital masterpiece",
	"Hold on to your hats, we're loading",
	"Just a sec, we're loading",
	"We're almost there, just a sec",
	"Loading the digital masterpiece",
];

const LoadingComponent = () => {
	return (
		<div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center">
			<div className="bg-background w-full py-10 flex flex-col items-center justify-center">
				<h1 className="text-4xl font-bold">
					{
						funnyLoadingMessages[
							Math.floor(Math.random() * funnyLoadingMessages.length)
						]
					}
					...
				</h1>
			</div>
		</div>
	);
};

export default LoadingComponent;
