import os


def get_supabase_settings():
    return {
        "url_configured": bool(os.getenv("SUPABASE_URL")),
        "anon_key_configured": bool(os.getenv("SUPABASE_ANON_KEY")),
    }
