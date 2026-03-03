"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, UserPlus, UserMinus, Clock, TrendingUp, CalendarDays, Award, FileText, AlertTriangle, Timer, ArrowRight } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { employees, monthlyChanges, leaveRequests, probationRecords, contracts, onboardingTasks } from "@/lib/mock-data"

const statsCards = [
  { label: "在职员工", value: "139", change: "+3", changeLabel: "本月新增", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "试用期员工", value: "2", change: "41天", changeLabel: "最近转正", icon: Timer, color: "bg-warning/10 text-warning" },
  { label: "待审批事项", value: "5", change: "3请假+2其他", changeLabel: "需处理", icon: AlertTriangle, color: "bg-destructive/10 text-destructive" },
  { label: "本月入职", value: "3", change: "+50%", changeLabel: "较上月", icon: UserPlus, color: "bg-success/10 text-success" },
]

const departmentDistribution = [
  { name: "技术部", value: 45, color: "var(--chart-1)" },
  { name: "销售部", value: 25, color: "var(--chart-2)" },
  { name: "市场部", value: 18, color: "var(--chart-3)" },
  { name: "运营部", value: 15, color: "var(--chart-4)" },
  { name: "其他", value: 36, color: "var(--chart-5)" },
]

const todayAttendance = { onTime: 112, late: 8, absent: 5, leave: 14, total: 139 }

export function Dashboard() {
  const pendingLeaves = leaveRequests.filter((l) => l.status === "待审批")
  const expiringContracts = contracts.filter((c) => c.status === "即将到期")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground text-balance">工作台</h1>
        <p className="text-muted-foreground text-sm mt-1">
          欢迎回来，钱七。今日是 2026年2月24日，以下是人力资源概览。
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="size-5" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">{stat.change}</span>
                <span className="text-xs text-muted-foreground">{stat.changeLabel}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts + Attendance Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Employee Changes Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">员工变动趋势</CardTitle>
            <CardDescription>近6个月入职 / 离职 / 调动统计</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyChanges}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                <Bar dataKey="onboard" name="入职" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resign" name="离职" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="transfer" name="调动" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Today Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              今日考勤
            </CardTitle>
            <CardDescription>出勤率 {Math.round(((todayAttendance.onTime + todayAttendance.late) / todayAttendance.total) * 100)}%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center gap-1 rounded-lg bg-success/5 border border-success/10 p-3">
                  <span className="text-xl font-bold text-success">{todayAttendance.onTime}</span>
                  <span className="text-xs text-muted-foreground">准时</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-warning/5 border border-warning/10 p-3">
                  <span className="text-xl font-bold text-warning">{todayAttendance.late}</span>
                  <span className="text-xs text-muted-foreground">迟到</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-destructive/5 border border-destructive/10 p-3">
                  <span className="text-xl font-bold text-destructive">{todayAttendance.absent}</span>
                  <span className="text-xs text-muted-foreground">缺勤</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-primary/5 border border-primary/10 p-3">
                  <span className="text-xl font-bold text-primary">{todayAttendance.leave}</span>
                  <span className="text-xs text-muted-foreground">请假</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Pending Items + Department */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending Leave Approvals */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                待审批请假
              </CardTitle>
              <Badge variant="secondary" className="text-xs">{pendingLeaves.length}条</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{leave.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{leave.name}</span>
                      <Badge variant="outline" className="text-[10px] h-5">{leave.type}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {leave.startDate} ~ {leave.endDate} ({leave.days}天)
                    </span>
                  </div>
                </div>
              ))}
              {pendingLeaves.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">暂无待审批请假</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Probation & Contract Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="size-4 text-warning" />
              预警提醒
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {probationRecords.map((pr) => (
                <div key={pr.id} className="flex items-center gap-3 rounded-lg border border-warning/20 bg-warning/5 p-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-warning/10 text-warning text-xs">{pr.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">{pr.name} - 试用期</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={((90 - pr.daysLeft) / 90) * 100} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">剩{pr.daysLeft}天</span>
                    </div>
                  </div>
                </div>
              ))}
              {expiringContracts.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-destructive/10">
                    <FileText className="size-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">{c.name} - 合同到期</span>
                    <p className="text-xs text-muted-foreground mt-0.5">到期日: {c.endDate}</p>
                  </div>
                </div>
              ))}
              {onboardingTasks.filter(t => t.status === "进行中").map((ob) => (
                <div key={ob.id} className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{ob.employeeName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">{ob.employeeName} - 入职中</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={ob.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{ob.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">部门人数分布</CardTitle>
            <CardDescription>各部门在职员工占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={departmentDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-1.5">
                {departmentDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-medium text-foreground">{item.value}人</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
