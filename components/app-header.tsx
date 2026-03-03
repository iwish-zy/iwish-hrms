"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search, Settings, LogOut, User, HelpCircle } from "lucide-react"

const moduleLabels: Record<string, string> = {
  dashboard: "工作台",
  organization: "组织架构",
  position: "岗位管理",
  employee: "员工花名册",
  onboarding: "入职管理",
  probation: "试用期管理",
  transfer: "异动管理",
  resignation: "离职管理",
  contract: "合同管理",
  attendance: "考勤管理",
  leave: "假期管理",
  salary: "薪酬管理",
  performance: "绩效考核",
  benefits: "福利管理",
  "self-service": "员工自助",
  "manager-service": "经理自助",
  analytics: "决策看板",
  reports: "报表中心",
  permissions: "权限管理",
  settings: "系统配置",
  recruitment: "招聘管理",
}

const moduleParents: Record<string, string> = {
  organization: "组织与主数据",
  position: "组织与主数据",
  employee: "员工全生命周期",
  onboarding: "员工全生命周期",
  probation: "员工全生命周期",
  transfer: "员工全生命周期",
  resignation: "员工全生命周期",
  contract: "员工全生命周期",
  attendance: "考勤与假期",
  leave: "考勤与假期",
  salary: "薪绩激励",
  performance: "薪绩激励",
  benefits: "薪绩激励",
  "self-service": "自助平台",
  "manager-service": "自助平台",
  analytics: "数据与决策",
  reports: "数据与决策",
  permissions: "系统管理",
  settings: "系统管理",
}

export function AppHeader({ activeModule }: { activeModule: string }) {
  const parent = moduleParents[activeModule]

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />

      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-muted-foreground">艾维人事</span>
        {parent && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{parent}</span>
          </>
        )}
        <span className="text-muted-foreground">/</span>
        <span className="font-medium text-foreground">{moduleLabels[activeModule] || "工作台"}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="搜索员工、功能..." className="w-56 pl-9 h-8 text-sm" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative size-8">
              <Bell className="size-4" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium" style={{ color: "white" }}>
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>待办通知</span>
              <Badge variant="secondary" className="text-xs">5条未读</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 w-full">
                <Badge variant="outline" className="text-[10px] h-5 bg-warning/10 text-warning border-warning/20">请假</Badge>
                <span className="text-sm font-medium">李四提交了病假申请</span>
              </div>
              <span className="text-xs text-muted-foreground">2分钟前 - 待审批</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 w-full">
                <Badge variant="outline" className="text-[10px] h-5 bg-warning/10 text-warning border-warning/20">请假</Badge>
                <span className="text-sm font-medium">王五提交了事假申请</span>
              </div>
              <span className="text-xs text-muted-foreground">15分钟前 - 待审批</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 w-full">
                <Badge variant="outline" className="text-[10px] h-5 bg-warning/10 text-warning border-warning/20">请假</Badge>
                <span className="text-sm font-medium">周九提交了婚假申请</span>
              </div>
              <span className="text-xs text-muted-foreground">1小时前 - 待审批</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 w-full">
                <Badge variant="outline" className="text-[10px] h-5 bg-destructive/10 text-destructive border-destructive/20">合同</Badge>
                <span className="text-sm font-medium">李四合同将于4个月后到期</span>
              </div>
              <span className="text-xs text-muted-foreground">今天 - 需处理</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2 w-full">
                <Badge variant="outline" className="text-[10px] h-5 bg-primary/10 text-primary border-primary/20">试用期</Badge>
                <span className="text-sm font-medium">孙八试用期将于41天后到期</span>
              </div>
              <span className="text-xs text-muted-foreground">今天 - 需关注</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary text-sm">
              查看全部通知
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">钱</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>钱七</span>
                <span className="text-xs font-normal text-muted-foreground">HR经理 / 系统管理员</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="mr-2 size-4" />个人信息</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 size-4" />系统配置</DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="mr-2 size-4" />帮助中心</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><LogOut className="mr-2 size-4" />退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
