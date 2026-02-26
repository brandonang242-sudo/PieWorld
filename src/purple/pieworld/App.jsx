import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import TextEditorSlice from "./components/TextEditorSlice";
import { supabase } from "./supabaseClient";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
      else setUser(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);
  if (!user) return <Auth onLogin={setUser} />;
  return <TextEditorSlice userId={user.id} />;
}
