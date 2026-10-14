"use client";

import { useState } from "react";

export default function Home() {
  const [documentType, setDocumentType] = useState("care-plan");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
    } catch {
      setResult("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setNotes(`John would like to travel independently.

Needs support with budgeting.

Attends football weekly.

Would like greater access to community activities.`);
  };

  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}

      <aside className="w-64 bg-purple-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">
          Care AI
        </h1>

        <nav className="space-y-3">
          <div className="bg-purple-700 p-3 rounded">
            Dashboard
          </div>

          <div className="hover:bg-purple-800 p-3 rounded cursor-pointer">
            Care Plans
          </div>

          <div className="hover:bg-purple-800 p-3 rounded cursor-pointer">
            Reviews
          </div>

          <div className="hover:bg-purple-800 p-3 rounded cursor-pointer">
            Risk Assessments
          </div>

          <div className="hover:bg-purple-800 p-3 rounded cursor-pointer">
            Meetings
          </div>
        </nav>
      </aside>

      {/* Main Content */}

      <section className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-2">
          AI Care Documentation Assistant
        </h1>

        <p className="text-slate-600 mb-6">
          Generate structured documentation from care notes.
        </p>

        <div className="grid grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              Document Generator
            </h2>

            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="care-plan">Care Plan</option>
              <option value="review-summary">
                Review Summary
              </option>
              <option value="risk-assessment">
                Risk Assessment
              </option>
              <option value="meeting-notes">
                Meeting Summary
              </option>
            </select>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={10}
              className="w-full border p-4 rounded"
              placeholder="Paste notes here..."
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={generateDocument}
                className="bg-purple-700 text-white px-5 py-3 rounded"
              >
                {loading
                  ? "Generating..."
                  : "Generate"}
              </button>

              <button
                onClick={loadExample}
                className="bg-slate-600 text-white px-5 py-3 rounded"
              >
                Example
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              Generated Documentation
            </h2>

            <div className="whitespace-pre-wrap text-sm">
              {result ||
                "Your generated documentation will appear here."}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}