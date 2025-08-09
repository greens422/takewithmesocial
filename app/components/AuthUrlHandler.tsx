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
        // If next points to the current location, do not navigate (avoid visible refresh)
        try {
          const nextUrl = new URL(next, window.location.origin);
          const current = window.location;
          const same =
            nextUrl.origin === current.origin &&
            nextUrl.pathname + nextUrl.search + nextUrl.hash ===
              current.pathname + current.search + current.hash;
          if (!same) {
            window.location.replace(next);
          }
        } catch {
          // Fallback navigate if parsing fails
          window.location.replace(next);
        }
      }
    })();
  }, []);

  return null;
}


