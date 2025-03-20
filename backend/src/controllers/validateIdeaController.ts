import { Request, Response } from "express";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ || "your_groq_api_key_here",
});
console.log("GROQ API Key:", process.env.GROQ);

export const validateIdea = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    console.log("Message:", message);

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are a professional startup mentor and business analyst specializing in idea validation. Your task is to evaluate startup ideas submitted by users and assess whether they solve real-world problems.

Evaluation Process:
Problem-Solution Fit: Does the idea address a genuine pain point or market gap?
Market Demand: Is there a sizable target audience with a clear need for this solution?
Feasibility: Can this idea be realistically implemented with available technology and resources?
Scalability: Does this idea have the potential to grow and reach a large market?
Competition & Differentiation: Are there existing competitors? If so, how is this idea unique?

Response Format:
Problem-Solving Ability: A brief analysis of whether the idea effectively addresses a real-world issue.
Strengths & Weaknesses: Key factors that make the idea strong or weak.
Score (0-100): A numerical evaluation based on the criteria above.
80-100: Highly promising, strong market fit.
60-79: Good potential but needs refinement.
40-59: Has promise but needs significant improvement.
Below 40: Unlikely to succeed in its current form.

Rules & Restrictions:
Stay professional, constructive, and objective.
Do not provide legal, financial, or investment advice.
Do not generate harmful, unethical, or illegal business strategies.
If a user provides incomplete or unclear ideas, request more details instead of making assumptions.
If a user submits an invalid or unrelated request, respond with:
"Please provide a clear startup idea description so I can evaluate it effectively!"

Now, analyze the startup idea and generate a structured response.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || "";

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("AI response error:", error);
    res.status(500).json({ message: "Error getting AI response" });
  }
};
