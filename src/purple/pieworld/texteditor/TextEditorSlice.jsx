import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function TextEditorSlice({ userId }) {
  const [docs, setDocs] = useState([]);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    async function fetchDocs() {
      const { data, error } = await supabase
        .from("editor_docs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error) setDocs(data);
    }
    fetchDocs();
  }, [userId]);

  const handleSave = async () => {
    if (!newContent) return;
    const { data, error } = await supabase.from("editor_docs").insert([
      {
        user_id: userId,
        content: newContent
      }
    ]);
    if (!error) {
      setDocs([data[0], ...docs]);
      setNewContent("");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Text Editor Slice</h2>
      <textarea
        rows={10}
        cols={50}
        value={newContent}
        onChange={e => setNewContent(e.target.value)}
        placeholder="Type something..."
      />
      <br />
      <button onClick={handleSave} style={{ marginTop: "0.5rem" }}>
        Save
      </button>

      <h3>Your Saved Docs:</h3>
      <ul>
        {docs.map(doc => (
          <li key={doc.id}>{doc.content}</li>
        ))}
      </ul>
    </div>
  );
}
