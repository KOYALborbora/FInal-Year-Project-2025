"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ExplainabilityCard() {
	const [explanation, setExplanation] = useState<string | null>(null);
	const [limeData, setLimeData] = useState<{ key: string; importance: number }[] | null>(null);
  const [loading, setLoading] = useState(false);

	// Clear the image URLs initially to ensure old images disappear
	const [gradCamImageUrl, setGradCamImageUrl] = useState<string | null>(null);
	const [limeImageUrl, setLimeImageUrl] = useState<string | null>(null);
	const [crossAttentionImageUrl, setCrossAttentionImageUrl] = useState<string | null>(null);

	useEffect(() => {
		async function fetchExplanation() {
			try {

        setLoading(true);

				const response = await fetch("http://localhost:5000/explain");
				if (!response.ok) {
					throw new Error("Failed to fetch explanation data.");
				}
				const data = await response.json();
				setExplanation(data.cross_attention_ai_response);
				
        const fLimeData = data.lime.map((item: any[]) => {
          return { 
            key: item[0],
            importance: item[1],
          }
        })
        
        setLimeData(fLimeData);
			} catch (error) {
				console.error("Error fetching explanation:", error);
				setExplanation("Failed to load explanation.");
        setLoading(false);
			}
      finally {
        setLoading(false);
      }
		}

		fetchExplanation();

		// Clear the images first
		setGradCamImageUrl(null);
		setLimeImageUrl(null);
		setCrossAttentionImageUrl(null);

		// Set new image URLs after a short delay to ensure old images disappear
		const timeout = setTimeout(() => {
			setGradCamImageUrl(`http://localhost:5000/static/gradcam.png?timestamp=${Date.now()}`);
			setLimeImageUrl(`http://localhost:5000/static/lime_image.png?timestamp=${Date.now()}`);
			setCrossAttentionImageUrl(`http://localhost:5000/static/cross_attention.png?timestamp=${Date.now()}`);
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="w-full max-w-2xl bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
			<h2 className="text-2xl font-bold text-center text-foreground mb-2">Explainability</h2>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="explanation-1">
					<AccordionTrigger>Cross Attention Explanation</AccordionTrigger>
					<AccordionContent>
						<div className="mb-4 text-center text-muted-foreground">
							{explanation || "Loading explanation..."}
						</div>
            <div className="mt-4 flex justify-center">
							{crossAttentionImageUrl && !loading && (
								<img
									src={crossAttentionImageUrl}
									alt="Cross Attention Explanation"
									className="rounded-lg shadow-md max-w-[100%] h-auto"
								/>
							)}
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="gradcam-heatmap">
					<AccordionTrigger>Grad-CAM Heatmap</AccordionTrigger>
					<AccordionContent>
						<div className="mt-4 flex justify-center">
							{gradCamImageUrl && !loading ? (
								<img
									src={gradCamImageUrl}
									alt="Grad-CAM Heatmap"
									className="rounded-lg shadow-md max-w-[70%] h-auto"
								/>
							) : (<div className="text-muted-foreground">Loading GradCAM...</div>)}
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="lime-image">
					<AccordionTrigger>LIME Image Explanation</AccordionTrigger>
					<AccordionContent>
						<div className="mt-4 flex justify-center">
							{limeImageUrl && !loading ? (
								<img
									src={limeImageUrl}
									alt="LIME Image Explanation"
									className="rounded-lg shadow-md max-w-[50%] h-auto"
								/>
							) : (<div className="text-muted-foreground">Loading LIME Image...</div>)}
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="lime-text-plot">
					<AccordionTrigger>LIME Text Plot</AccordionTrigger>
					<AccordionContent>
						{limeData ? (
							<Card className="mt-4">
								<CardHeader>
									<CardTitle>LIME Text Plot</CardTitle>
								</CardHeader>
								<CardContent>
									<ResponsiveContainer width="100%" height={300}>
										<BarChart data={limeData} layout="vertical">
											<XAxis type="number" domain={[limeData.reduce((min, d) => Math.min(min, d.importance), 0), limeData.reduce((max, d) => Math.max(max, d.importance), 0)]} />
											<YAxis type="category" dataKey="key" width={80} />
											<Tooltip />
											<Bar dataKey="importance" fill="#6366f1" />
										</BarChart>
									</ResponsiveContainer>
								</CardContent>
							</Card>
						) : (
							<div className="text-center text-muted-foreground">Loading LIME data...</div>
						)}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="shap-plot">
					<AccordionTrigger>SHAP Plot</AccordionTrigger>
					<AccordionContent>
						{ !loading ? <div className="mt-4 flex justify-center">
							<a
								href="http://localhost:5000/static/shap_plots.html"
								target="_blank"
								rel="noopener noreferrer"
								className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							>
								Redirect to SHAP Plot
							</a>
						</div> : (<div className="text-muted-foreground text-center">Loading SHAP Plot...</div>)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}