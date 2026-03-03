-- 员工合同表
CREATE TABLE IF NOT EXISTS employee_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    contract_type TEXT NOT NULL, -- 如：劳动合同、保密协议等
    start_date DATE NOT NULL,
    end_date DATE,
    probation_months INTEGER DEFAULT 0,
    renew_count INTEGER DEFAULT 0,
    status TEXT DEFAULT '生效中',
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 员工档案/附件表
CREATE TABLE IF NOT EXISTS employee_archives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    category TEXT NOT NULL, -- 如：入职档案、签署协议、异动文件等
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 开启 Row Level Security (RLS)
ALTER TABLE employee_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_archives ENABLE ROW LEVEL SECURITY;

-- 创建基础访问策略（这里假设已认证用户可读写，实际建议根据角色调整）
CREATE POLICY "Enable all for authenticated users" ON employee_contracts FOR ALL USING (true);
CREATE POLICY "Enable all for authenticated users" ON employee_archives FOR ALL USING (true);
