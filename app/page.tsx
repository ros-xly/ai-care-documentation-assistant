"use client";

import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("care-plan");

  const generateDocument = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes,
          documentType,
        }),
      });

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      setResult("An error occurred whilst generating documentation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          AI Care Documentation Assistant
        </h1>

        <p className="text-slate-600 mb-6">
          Generate care plans, review summaries, risk assessments and meeting documentation from unstructured notes.
        </p>

        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="w-full p-3 border rounded-lg bg-white mb-4"
        >
          <option value="care-plan">Care Plan</option>
          <option value="review-summary">Review Summary</option>
          <option value="risk-assessment">Risk Assessment</option>
          <option value="meeting-notes">Meeting Summary</option>
        </select>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-4 border rounded-lg bg-white"
          rows={10}
          placeholder="Paste notes here..."
        />

        <button
          onClick={() =>
            setNotes(`John would like to travel independently.
        Needs support with budgeting.
        Attends football weekly.
        Would like more access to community activities.`)
           }
          className="ml-2 bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          Load Example
        </button>

        <button
          onClick={generateDocument}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Documentation"}
        </button>

        {result && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}