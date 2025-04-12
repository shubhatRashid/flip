const HF_API_KEY = process.env.HF_API_KEY!;

export default async function generateTasks(prompt: string) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are a productivity assistant that breaks down work into a to-do list. Break the following into tasks.: ${prompt}`,
        }),
      }
    );

    const data = await response.json();

    const generated = data?.[0]?.generated_text;

    return {
      tasks: generated || "Sorry, couldn't generate tasks.",
    };
  } catch (error) {
    console.error("Error generating tasks:", error);
    return {
      tasks: "An error occurred while generating tasks.",
    };
  }
}
