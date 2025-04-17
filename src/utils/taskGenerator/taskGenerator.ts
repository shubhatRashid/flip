const HF_API_KEY = process.env.HF_API_KEY!;
export default async function generateTasks(prompt: string) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', 
            content: "You are a productivity assistant that breaks down work into a to-do list and returns the result only and nothing else the result should be in stringified JSON format which can be parsed to json. Use the following JSON structure: { \"category\": \"string - category or topic of the task\", \"tasks\": [ { \"task\": \"string - individual to-do item\", \"completed\": false",
          },
          { role: 'user', content: prompt}
        ]
      }),
    });
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error generating tasks:", error);
    return {
      tasks: "An error occurred while generating tasks.",
    };
  }
}
