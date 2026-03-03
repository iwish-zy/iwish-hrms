"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Users, Key, Bell, Database, Edit, Trash2, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const roles = [
  { id: "R001", name: "超级管理员", description: "拥有系统全部权限", users: 1, permissions: "全部", status: "启用" },
  { id: "R002", name: "HR管理员", description: "人事管理全部权限", users: 3, permissions: "人事/考勤/薪酬/绩效", status: "启用" },
  { id: "R003", name: "部门经理", description: "本部门员工管理权限", users: 8, permissions: "员工查看/考勤/绩效评分", status: "启用" },
  { id: "R004", name: "普通员工", description: "个人信息查看与申请", users: 127, permissions: "个人信息/请假申请/薪资查询", status: "启用" },
  { id: "R005", name: "财务专员", description: "薪酬与报表权限", users: 4, permissions: "薪酬管理/报表查看", status: "启用" },
]

const auditLogs = [
  { time: "2026-02-24 14:32", user: "管理员", action: "修改员工信息", detail: "修改了张三的联系电话", ip: "192.168.1.100" },
  { time: "2026-02-24 13:15", user: "钱七", action: "审批请假", detail: "批准了李四的请假申请", ip: "192.168.1.105" },
  { time: "2026-02-24 11:08", user: "管理员", action: "新增员工", detail: "添加了员工孙八", ip: "192.168.1.100" },
  { time: "2026-02-24 09:45", user: "管理员", action: "系统配置", detail: "修改了考勤规则", ip: "192.168.1.100" },
  { time: "2026-02-23 17:30", user: "赵六", action: "薪资核算", detail: "生成了2月份薪资表", ip: "192.168.1.108" },
]

export function SettingsModule() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">系统管理</h1>
        <p className="text-muted-foreground text-sm mt-1">权限管理、系统配置与操作日志</p>
      </div>

      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="roles">角色权限</TabsTrigger>
          <TabsTrigger value="system">系统配置</TabsTrigger>
          <TabsTrigger value="logs">操作日志</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">角色管理 (RBAC)</CardTitle>
                  <CardDescription>基于角色的访问控制，管理系统权限分配</CardDescription>
                </div>
                <Button size="sm"><Plus className="mr-2 size-4" />新增角色</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>角色名称</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>关联用户</TableHead>
                    <TableHead>权限范围</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="size-4 text-primary" />
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{role.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Users className="size-3.5 text-muted-foreground" />
                          <span>{role.users}人</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{role.permissions}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">{role.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="size-8"><Edit className="size-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="size-8 text-destructive"><Trash2 className="size-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Database className="size-4 text-primary" />
                  基本设置
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label>公司名称</Label>
                  <Input defaultValue="示例科技有限公司" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>系统语言</Label>
                  <Select defaultValue="zh">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh">简体中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>工作时间</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input defaultValue="09:00" type="time" />
                    <Input defaultValue="18:00" type="time" />
                  </div>
                </div>
                <Button className="w-fit">保存设置</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="size-4 text-primary" />
                  通知设置
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {[
                  { label: "请假审批通知", description: "有新的请假申请时通知相关审批人", checked: true },
                  { label: "考勤异常通知", description: "员工迟到、早退或缺勤时通知部门经理", checked: true },
                  { label: "合同到期提醒", description: "合同到期前30天自动提醒HR", checked: true },
                  { label: "生日祝福", description: "员工生日当天自动发送祝福", checked: false },
                  { label: "薪资发放通知", description: "薪资发放后通知所有员工", checked: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{setting.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{setting.description}</p>
                    </div>
                    <Switch defaultChecked={setting.checked} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">操作日志</CardTitle>
              <CardDescription>系统操作记录追踪</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>时间</TableHead>
                    <TableHead>操作人</TableHead>
                    <TableHead>操作类型</TableHead>
                    <TableHead>详情</TableHead>
                    <TableHead>IP地址</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-muted-foreground text-sm font-mono">{log.time}</TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.detail}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
