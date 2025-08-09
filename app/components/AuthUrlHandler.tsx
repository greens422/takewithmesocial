"use client";

import { useEffect } from "react";
import supabase from "@/app/lib/supabaseClient";

export default function AuthUrlHandler() {
  useEffect(() => {
    // Handle cases where Supabase redirects to the site's root with ?code=...
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (!code) return;

    (async () => {
      try {
        await supabase.auth.getSession();
      } finally {
        const next = url.searchParams.get("next") || "/welcome";
        // Clean the code params from the URL and navigate
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.replaceState({}, "", url.pathname + url.search);
        window.location.replace(next);
      }
    })();
  }, []);

  return null;
}


