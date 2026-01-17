-- Disable RLS temporarily to ensure we can fix it
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Remove all existing policies on the leads table
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads" ON leads;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON leads;

-- Re-enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create a fresh, working policy for anonymous inserts
-- This explicitly allows ANYONE to insert data into the leads table
CREATE POLICY "Enable insert for all users" ON "public"."leads"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Also allow everyone to read for now just to avoid metadata errors
CREATE POLICY "Enable select for all users" ON "public"."leads"
AS PERMISSIVE FOR SELECT
TO public
USING (true);
