create table user_profiles (
    user_id uuid primary key references auth.users (id) not null,
    username text unique not null,
    CONSTRAINT proper_username CHECK (username ~* '^[a-zA-Z0-9_]+$'),
    CONSTRAINT username_length CHECK (char_length(username) > 3 AND char_length(username) < 15)
);

alter table user_profiles enable row level security;

CREATE POLICY "all can see" ON "public"."user_profiles"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "users can insert" ON "public"."user_profiles"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owners can update" ON "public"."user_profiles"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

create table user_settings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users (id) not null,
    settings_name text not null,
    allocation_settings text[] DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

alter table user_settings enable row level security;

CREATE POLICY "owners can select" ON public.user_settings
    AS PERMISSIVE FOR SELECT
    TO public
    USING (auth.uid() = user_id);

CREATE POLICY "owners can insert" ON public.user_settings
    AS PERMISSIVE FOR INSERT
    TO public
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owners can update" ON public.user_settings
    AS PERMISSIVE FOR UPDATE
    TO public
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owners can delete" ON public.user_settings
    AS PERMISSIVE FOR DELETE
    TO public
    USING (auth.uid() = user_id);