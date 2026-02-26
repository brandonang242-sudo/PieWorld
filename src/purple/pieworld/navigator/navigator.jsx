import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SliceCard from "./components/SliceCard";

function App() {
    const [slices, setSlices] = useState([]);
    useEffect(() => {
      async function fetch() {
            const { data } = await supabase.from("slices").select();
            setSlices(data);
      }
    }, []);

    return (
          <div style={{ padding: "2rem" }}>
      <h1>Slice Navigator</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {slices.map(slice => (
          <SliceCard
            key={slice.id}
            title={slice.title}
            description={slice.description}
            onClick={() => handleLaunch(slice)}
          />
        ))}
      </div>
    </div>
   );
}
