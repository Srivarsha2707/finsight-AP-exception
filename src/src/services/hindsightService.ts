const API_BASE = "http://localhost:3001";

export async function retainMemory(content: string) {
  const response = await fetch(`${API_BASE}/api/memory/retain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Failed to store Hindsight memory");
  }

  return response.json();
}

export async function recallMemory(query: string) {
  const response = await fetch(
    `${API_BASE}/api/memory/recall?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to recall Hindsight memory");
  }

  return response.json();
}