
-- 创建菜单数据表
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT,
  parent_id TEXT,
  sort_order INT DEFAULT 0,
  badge TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 启用行级安全
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取菜单（公开数据）
DROP POLICY IF EXISTS "Allow public read on menu_items" ON menu_items;
CREATE POLICY "Allow public read on menu_items" ON menu_items FOR SELECT USING (true);

-- 插入初始菜单数据
INSERT INTO menu_items (id, label, icon, parent_id, sort_order) VALUES
('dashboard', '工作台', 'LayoutDashboard', NULL, 0),
('organization', '组织架构', 'Building2', 'organization_group', 1),
('position', '岗位管理', 'Briefcase', 'organization_group', 2),
('employee', '员工花名册', 'Users', 'employee_group', 3),
('onboarding', '入职管理', 'LogIn', 'employee_group', 4),
('probation', '试用期管理', 'Timer', 'employee_group', 5),
('transfer', '异动管理', 'ArrowRightLeft', 'employee_group', 6),
('resignation', '离职管理', 'LogOut', 'employee_group', 7),
('contract', '合同管理', 'FileText', 'employee_group', 8),
('attendance', '考勤管理', 'Clock', 'attendance_group', 9),
('leave', '假期管理', 'CalendarDays', 'attendance_group', 10),
('salary', '薪酬管理', 'Wallet', 'salary_group', 11),
('performance', '绩效考核', 'Target', 'salary_group', 12),
('benefits', '福利管理', 'Gift', 'salary_group', 13),
('self-service', '员工自助', 'User', 'service_group', 14),
('manager-service', '经理自助', 'UserCog', 'service_group', 15),
('analytics', '决策看板', 'PieChart', 'data_group', 16),
('reports', '报表中心', 'BarChart3', 'data_group', 17),
('permissions', '权限管理', 'Shield', 'system_group', 18),
('settings', '系统配置', 'Wrench', 'system_group', 19)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  icon = EXCLUDED.icon,
  parent_id = EXCLUDED.parent_id,
  sort_order = EXCLUDED.sort_order;
