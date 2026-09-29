# I Used Hindsight to Find Similar Invoice Cases

An invoice exception is rarely interesting because it happened once. The useful question is whether the same kind of problem has happened before, what was discovered, and what action followed.

That question became the reason I added Hindsight to FinSight.

FinSight is an accounts-payable exception intelligence application. It brings invoice investigation, exception details, historical cases, recommendations, and prevention into one workflow. The existing interface already had a historical-case concept, but I wanted to connect that workflow to an actual memory system instead of relying only on predefined prototype data.

The specific problem I focused on was simple:

**When an invoice exception appears, can I retrieve relevant historical context instead of starting the investigation from zero?**

## The Existing Workflow Wasn't Enough

The FinSight UI already models historical exceptions. The Hindsight view contains prototype cases that can be filtered by exception type, case ID, vendor, root cause, and previous action.

That is useful for demonstrating the workflow, but it has a limitation: the dataset is static.

A real investigation does not always know the exact case ID or vendor name it needs to search for.

An investigator might instead have a question like:

```text
invoice price mismatch
```

or:

```text
recurring vendor pricing discrepancy
```

Those queries describe a situation rather than identify a specific database row.

That is where I wanted a memory layer.

Instead of replacing the existing workflow, I connected live Hindsight recall alongside it.

## The Architecture I Ended Up With
![FinSight + Hindsight Architecture](architecture.png)
The integration is intentionally small.

The browser does not communicate directly with Hindsight. The React application calls a small TypeScript service, which calls an Express backend. The backend owns the Hindsight client and the API credentials.

The resulting path is:

```text
React Hindsight View
        |
        v
hindsightService.ts
        |
        v
Express API :3001
        |
        v
HindsightClient
        |
        v
Hindsight Cloud
```

That separation was important for one practical reason: the API key should not live in browser-side code.

The server creates the Hindsight client using environment variables:

```javascript
const hindsight = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_BASE_URL,
  apiKey: process.env.HINDSIGHT_API_KEY,
});

const BANK_ID = "finsight-ap-memory";
```

I also gave the memory bank a domain-specific identity rather than using a generic store:

```javascript
async function ensureMemoryBank() {
  try {
    const bank = await hindsight.createBank(BANK_ID, {
      name: "FinSight AP Memory",
      background:
        "Memory bank for FinSight Accounts Payable exception investigation, resolution, and prevention.",
    });

    console.log(`Memory bank ready: ${bank.bank_id}`);
  } catch (error) {
    console.error("Memory bank setup error:", error.message);
  }
}
```

The result is a memory bank specifically associated with the FinSight AP workflow.

## The Interesting Part: Recall Is a Separate API Boundary

The server exposes a small recall endpoint:

```javascript
app.get("/api/memory/recall", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const result = await hindsight.recall(BANK_ID, query);

    res.json({
      success: true,
      memories: result.results,
    });
  } catch (error) {
    console.error("Hindsight recall error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to recall memory",
      details: error.message,
    });
  }
});
```

There are two things I like about this boundary.

First, the frontend does not need to know anything about the Hindsight SDK.

Second, the backend can validate the request and normalize the response before it reaches the UI.

The frontend therefore deals with an application-level concept—**recall memories**—rather than directly managing a third-party memory client.

## Keeping the Client-Side Service Small

The browser-side service is deliberately thin.

```typescript
const API_BASE = "http://localhost:3001";

export async function recallMemory(query: string) {
  const response = await fetch(
    `${API_BASE}/api/memory/recall?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to recall Hindsight memory");
  }

  return response.json();
}
```

This is probably the least interesting-looking piece of the integration, but it gives the application a clean boundary.

The React components don't need to construct URLs, encode queries, or know the backend port.

If the transport changes later, the component does not need to change with it.

## Connecting Recall to the Investigation UI

The Hindsight view keeps live memory state separately from the existing prototype case data:

```typescript
const [memories, setMemories] = useState<any[]>([]);
const [isRecalling, setIsRecalling] = useState(false);
const [recallError, setRecallError] = useState('');
```

The actual recall operation is similarly straightforward:

```typescript
const handleRecall = async () => {
  const query = searchQuery.trim() || 'invoice price mismatch';

  setIsRecalling(true);
  setRecallError('');

  try {
    const result = await recallMemory(query);

    setMemories(result.memories || []);
  } catch (error) {
    console.error('Hindsight recall failed:', error);

    setRecallError(
      'Unable to retrieve live Hindsight memories. Make sure the Hindsight server is running on port 3001.'
    );

    setMemories([]);
  } finally {
    setIsRecalling(false);
  }
};
```

I deliberately kept the existing prototype case filtering in place.

That means FinSight has two related but distinct paths:

```text
Existing prototype cases
        |
        v
Local filtering
        |
        v
Known historical cases


Live Hindsight memory
        |
        v
Natural-language query
        |
        v
Retrieved historical context
```

This was more useful than throwing away the existing UI and rebuilding everything around memory.

## What Happens When Recall Fails?

This was another small but important implementation detail.

A memory service is an external dependency. The UI should not simply freeze if it becomes unavailable.

The Hindsight view tracks loading and error states independently.

When recall starts, the interface shows that it is searching. If the request fails, the error is displayed and the previous live results are cleared.

That makes the dependency visible rather than pretending the system always has memory available.

The UI even gives a concrete example when no memories are found:

```text
No relevant memories found.

Try a more specific query such as
"invoice price mismatch".
```

That is a better failure mode than silently showing nothing and leaving the user wondering whether the search actually ran.

## Why I Didn't Replace the Existing Data

One of the easiest architectural mistakes here would have been to replace all of the prototype cases with Hindsight immediately.

I didn't.

The existing mock data still supports the parts of FinSight that demonstrate historical cases, filtering, case details, and precedent application.

The live Hindsight integration sits alongside that functionality.

That gives me a useful migration boundary:

```text
Prototype UI
      |
      +---- Existing case data
      |
      +---- Live Hindsight recall
```

It also makes the system easier to develop incrementally.

I can improve the memory integration without having to rewrite the entire exception interface.

## The Three Questions Behind the Integration

The Hindsight view is organized around three questions:

1. **Have we seen this before?**
2. **What happened before?**
3. **What should we do differently?**

Those questions map naturally onto the exception workflow.

The first is a retrieval problem.

The second is a context problem.

The third is a decision-support problem.

Hindsight primarily addresses the first two. The final decision remains part of the application's investigation and approval workflow.

That distinction matters.

I don't want historical memory to automatically decide whether an invoice should be approved or rejected. Previous cases provide context; they don't eliminate the need to examine the current case.

## What I Learned

### 1. The useful unit of memory is the investigation

I initially thought about memory in terms of storing cases.

The more useful abstraction is the investigation context around a case: what happened, what evidence was available, what action was taken, and what resulted from it.

That makes future retrieval more meaningful than simply storing another invoice record.

### 2. A memory layer doesn't need to own the application

Hindsight only needs to solve the memory problem.

FinSight remains responsible for the application workflow, UI, invoice context, exception handling, and user interaction.

That separation keeps the integration understandable.

### 3. The backend boundary matters

Putting the Hindsight client behind Express keeps credentials away from the browser and prevents the React application from becoming tightly coupled to the SDK.

The frontend only needs a small recall API.

### 4. Prototype data and live memory can coexist

I didn't need to throw away the existing interface to introduce real memory.

Keeping both allowed the existing experience to remain functional while adding a live retrieval path.

### 5. Recall quality matters more than simply having storage

The interesting problem isn't whether I can put information somewhere.

It's whether the information retrieved for a new exception is actually useful.

That is the part I would focus on as the system moves toward production.

## What I'd Build Next

The current integration has a live recall path and a backend retention endpoint. The next step would be to connect the resolution lifecycle more directly to retention.

The server already exposes:

```javascript
app.post("/api/memory/retain", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        error: "Memory content is required",
      });
    }

    await hindsight.retain(BANK_ID, content);

    res.json({
      success: true,
      message: "Memory stored successfully",
    });
  } catch (error) {
    console.error("Hindsight retain error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to store memory",
      details: error.message,
    });
  }
});
```

The service layer also exposes a corresponding `retainMemory` function.

The missing piece is connecting that capability to the right point in the application lifecycle.

The ideal loop is:

```text
Exception detected
       ↓
Investigation
       ↓
Historical recall
       ↓
Resolution
       ↓
Retain useful context
       ↓
Future exception
       ↓
Historical recall
```

That is the part I find most interesting about using Hindsight in FinSight.

The goal isn't to make every invoice depend on an AI system.

It's to make previous investigations available when they are relevant.

Hindsight gives FinSight a way to move from a system that merely records what happened to one that can retrieve useful context from what happened before.

For an exception workflow, that difference is small in code but significant in how the application can behave over time.

### References

* [Hindsight GitHub](https://github.com/vectorize-io/hindsight)
* [Hindsight Documentation](https://hindsight.vectorize.io/)
* [What Is Agent Memory?](https://vectorize.io/what-is-agent-memory)
