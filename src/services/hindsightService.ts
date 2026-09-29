const HINDSIGHT_URL = 'http://localhost:3001';

export async function recallMemory(query: string) {
  const response = await fetch(`${HINDSIGHT_URL}/recall`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error(`Hindsight recall failed: ${response.status}`);
  }

  return response.json();
}