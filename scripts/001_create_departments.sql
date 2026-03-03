CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT,
  parent_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  manager TEXT,
  sort_order INT DEFAULT 0,
  level INT DEFAULT 0,
  status TEXT DEFAULT '启用',
  headcount INT DEFAULT 0,
  approved INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_public_read_departments" ON departments;
CREATE POLICY "allow_public_read_departments" ON departments FOR SELECT USING (true);

DROP POLICY IF EXISTS "allow_public_insert_departments" ON departments;
CREATE POLICY "allow_public_insert_departments" ON departments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "allow_public_update_departments" ON departments;
CREATE POLICY "allow_public_update_departments" ON departments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "allow_public_delete_departments" ON departments;
CREATE POLICY "allow_public_delete_departments" ON departments FOR DELETE USING (true);
