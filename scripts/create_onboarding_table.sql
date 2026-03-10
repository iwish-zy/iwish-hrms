-- 创建入职管理表（线上 Offer、合同/保密/手册确认 + 多部门任务）
-- 在 Supabase SQL Editor 执行本脚本；如需多环境，请先调整 schema 名称（默认 public）

-- 依赖：pgcrypto 扩展用于 gen_random_uuid（Supabase 默认已开启）
CREATE TABLE IF NOT EXISTS onboarding_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  position_id uuid REFERENCES positions(id) ON DELETE SET NULL,
  employee_name text, -- 冗余快照，方便列表直接展示
  join_date date NOT NULL,

  status text NOT NULL DEFAULT '进行中' CHECK (status IN ('待确认','进行中','已完成','已取消')),
  progress integer NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),

  -- Offer 发送与确认
  offer_status text NOT NULL DEFAULT '待发送' CHECK (offer_status IN ('待发送','已发送','已确认','已拒绝')),
  offer_url text,
  offer_sent_at timestamptz,
  offer_confirmed_at timestamptz,

  -- 电子签署文件
  contract_url text,
  contract_status text NOT NULL DEFAULT '待签署' CHECK (contract_status IN ('待签署','已签署','已拒绝')),
  nda_url text,
  nda_status text NOT NULL DEFAULT '待签署' CHECK (nda_status IN ('待签署','已签署','已拒绝')),
  handbook_url text,
  handbook_status text NOT NULL DEFAULT '待确认' CHECK (handbook_status IN ('待确认','已确认')),

  -- 多部门并行动作的任务清单（IT/行政/HR），示例结构：
  -- [ {"name":"开通邮箱","assignee":"IT","status":"进行中"}, {"name":"发放工牌","assignee":"行政","status":"待办"} ]
  tasks jsonb NOT NULL DEFAULT '[]'::jsonb,

  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_tasks_join_date ON onboarding_tasks(join_date);
CREATE INDEX IF NOT EXISTS idx_onboarding_tasks_status ON onboarding_tasks(status);

-- 更新时间戳触发器
CREATE OR REPLACE FUNCTION set_onboarding_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_onboarding_tasks_updated_at ON onboarding_tasks;
CREATE TRIGGER trg_onboarding_tasks_updated_at
BEFORE UPDATE ON onboarding_tasks
FOR EACH ROW
EXECUTE FUNCTION set_onboarding_tasks_updated_at();

-- RLS 策略（按需调整）：允许已认证用户 CRUD；本地演示可开放 anon 只读
ALTER TABLE onboarding_tasks ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'onboarding_tasks' AND policyname = 'Allow authenticated read'
  ) THEN
    CREATE POLICY "Allow authenticated read" ON onboarding_tasks
      FOR SELECT TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'onboarding_tasks' AND policyname = 'Allow authenticated insert'
  ) THEN
    CREATE POLICY "Allow authenticated insert" ON onboarding_tasks
      FOR INSERT TO authenticated WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'onboarding_tasks' AND policyname = 'Allow authenticated update'
  ) THEN
    CREATE POLICY "Allow authenticated update" ON onboarding_tasks
      FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'onboarding_tasks' AND policyname = 'Allow authenticated delete'
  ) THEN
    CREATE POLICY "Allow authenticated delete" ON onboarding_tasks
      FOR DELETE TO authenticated USING (true);
  END IF;

  -- 可选：本地演示/未登录场景允许 anon 只读
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'onboarding_tasks' AND policyname = 'Allow anon read'
  ) THEN
    CREATE POLICY "Allow anon read" ON onboarding_tasks
      FOR SELECT TO anon USING (true);
  END IF;
END$$;


-- 示例种子数据：三部门并行任务 + 电子文件占位
INSERT INTO onboarding_tasks (
  department_id, position_id, employee_name, join_date,
  status, progress, offer_status, offer_url,
  contract_url, nda_url, handbook_url, tasks, notes
)
SELECT
  e.department_id,
  e.position_id,
  e.name,
  current_date + (g % 5),
  '进行中',
  45,
  '已发送',
  'https://example.com/offers/demo.pdf',
  'https://example.com/contracts/demo.pdf',
  'https://example.com/nda/demo.pdf',
  'https://example.com/handbook/demo.pdf',
  '[
    {"name":"开通邮箱/AD账号","assignee":"IT","status":"进行中"},
    {"name":"配发电脑与权限","assignee":"IT","status":"待办"},
    {"name":"座位/门禁/工牌","assignee":"行政","status":"进行中"},
    {"name":"办公用品&工装","assignee":"行政","status":"待办"},
    {"name":"社保/公积金开户","assignee":"HR","status":"待办"},
    {"name":"员工手册宣导与签收","assignee":"HR","status":"待办"}
  ]'::jsonb,
  '示例数据，可删除'
FROM employees e
JOIN generate_series(1,1) g ON true
LIMIT 1
ON CONFLICT DO NOTHING;
