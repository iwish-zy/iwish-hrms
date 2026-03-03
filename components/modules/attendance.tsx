"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Search, Download, Clock, CheckCircle, AlertTriangle, XCircle, CalendarDays, Plus, Settings, Loader2 } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const attendanceStatusColors: Record<string, string> = {
  "正常": "bg-success/10 text-success border-success/20",
  "迟到": "bg-warning/10 text-warning border-warning/20",
  "早退": "bg-warning/10 text-warning border-warning/20",
  "缺勤": "bg-destructive/10 text-destructive border-destructive/20",
  "请假": "bg-primary/10 text-primary border-primary/20",
  "加班": "bg-chart-2/10 text-chart-2 border-chart-2/20",
}

const leaveStatusColors: Record<string, string> = {
  "已批准": "bg-success/10 text-success border-success/20",
  "待审批": "bg-warning/10 text-warning border-warning/20",
  "已驳回": "bg-destructive/10 text-destructive border-destructive/20",
}

const weeklyData = [
  { day: "周一", normal: 125, abnormal: 14 },
  { day: "周二", normal: 130, abnormal: 9 },
  { day: "周三", normal: 128, abnormal: 11 },
  { day: "周四", normal: 132, abnormal: 7 },
  { day: "周五", normal: 120, abnormal: 19 },
]

export function AttendanceModule() {
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const { data: attendanceRecords = [], isLoading: isAttendanceLoading } = useSWR(`/api/attendance?date=${date}`, fetcher)
  const { data: leaveRequests = [], isLoading: isLeaveLoading } = useSWR("/api/leave", fetcher)
  const { data: leaveBalances = [], isLoading: isBalanceLoading } = useSWR("/api/leave-balances", fetcher)
  const { data: shiftTypes = [], isLoading: isShiftsLoading } = useSWR("/api/shifts", fetcher)

  const attendanceList = Array.isArray(attendanceRecords) ? attendanceRecords : []
  const leaveList = Array.isArray(leaveRequests) ? leaveRequests : []
  const leaveBalanceList = Array.isArray(leaveBalances) ? leaveBalances : []
  const shiftTypeList = Array.isArray(shiftTypes) ? shiftTypes : []

  if (isAttendanceLoading || isLeaveLoading || isBalanceLoading || isShiftsLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">考勤管理</h1>
          <p className="text-muted-foreground text-sm mt-1">支持标准班 / 弹性班 / 排班制三大班次，考勤异常提醒，加班审批关联调休或加班费</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 size-4" />导出月报</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "今日正常", value: "112", icon: CheckCircle, color: "text-success bg-success/10" },
          { label: "迟到/早退", value: "8", icon: AlertTriangle, color: "text-warning bg-warning/10" },
          { label: "缺勤", value: "5", icon: XCircle, color: "text-destructive bg-destructive/10" },
          { label: "请假中", value: "14", icon: CalendarDays, color: "text-primary bg-primary/10" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="records">
        <TabsList>
          <TabsTrigger value="records">考勤记录</TabsTrigger>
          <TabsTrigger value="leave">假期管理</TabsTrigger>
          <TabsTrigger value="balance">假期额度</TabsTrigger>
          <TabsTrigger value="shifts">班次配置</TabsTrigger>
          <TabsTrigger value="stats">考勤统计</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input placeholder="搜索员工姓名..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Input type="date" className="w-40" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>员工姓名</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>班次</TableHead>
                    <TableHead>上班打卡</TableHead>
                    <TableHead>下班打卡</TableHead>
                    <TableHead>工作时长</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceList
                    .filter((r) => (r.employeeName || "").includes(search))
                    .map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.employeeName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{record.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{record.shiftType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-muted-foreground" />
                            {record.checkIn}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-muted-foreground" />
                            {record.checkOut}
                          </div>
                        </TableCell>
                        <TableCell>{record.hours > 0 ? `${record.hours}h` : "--"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={attendanceStatusColors[record.status] || ""}>{record.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">请假申请列表</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm"><Plus className="mr-2 size-4" />新建请假</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新建请假申请</DialogTitle>
                      <DialogDescription>审批流程: 直属上级 &rarr; 部门经理 &rarr; HR确认</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex flex-col gap-2">
                        <Label>请假类型</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="选择请假类型" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annual">年假</SelectItem>
                            <SelectItem value="sick">病假</SelectItem>
                            <SelectItem value="personal">事假</SelectItem>
                            <SelectItem value="compensatory">调休</SelectItem>
                            <SelectItem value="marriage">婚假</SelectItem>
                            <SelectItem value="maternity">产假/陪产假</SelectItem>
                            <SelectItem value="bereavement">丧假</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>开始日期</Label>
                          <Input type="date" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>结束日期</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>请假原因</Label>
                        <Textarea placeholder="请输入请假原因" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">取消</Button>
                      <Button>提交申请</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>申请人</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead>天数</TableHead>
                    <TableHead>原因</TableHead>
                    <TableHead>审批人</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveList.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">{leave.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{leave.department}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{leave.type}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{leave.startDate} ~ {leave.endDate}</TableCell>
                      <TableCell>{leave.days}天</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[100px] truncate">{leave.reason}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{leave.approver || "--"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={leaveStatusColors[leave.status] || ""}>{leave.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {leave.status === "待审批" && (
                          <div className="flex items-center justify-end gap-1">
                            <Button size="sm" variant="outline" className="h-7 text-xs text-success border-success/30">批准</Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs text-destructive border-destructive/30">驳回</Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">假期额度管理</CardTitle>
              <CardDescription>查看和管理每位员工的各类假期余额，自动关联员工工龄计算年假</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>员工</TableHead>
                    <TableHead>年假总额 / 已用 / 剩余</TableHead>
                    <TableHead>病假总额 / 已用</TableHead>
                    <TableHead>调休总额 / 已用</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveBalanceList.map((lb) => (
                    <TableRow key={lb.employeeId}>
                      <TableCell className="font-medium">{lb.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{lb.annual} / {lb.annualUsed} / <span className="font-semibold text-primary">{lb.annualRemaining}</span></span>
                          <Progress value={(lb.annualUsed / lb.annual) * 100} className="h-1.5 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{lb.sick} / {lb.sickUsed}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{lb.compensatory} / {lb.compensatoryUsed}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="size-4 text-primary" />
                    班次配置
                  </CardTitle>
                  <CardDescription>支持标准工时制、弹性工时制和排班制三大班次</CardDescription>
                </div>
                <Button size="sm" variant="outline"><Plus className="mr-2 size-4" />新增班次</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {shiftTypeList.map((shift) => (
                  <Card key={shift.id} className="border-2">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-foreground">{shift.name}</h3>
                        <Badge variant="outline" className="text-xs">{shift.id}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{shift.description}</p>
                      {shift.workStart !== "--" && (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">上班时间</span>
                            <p className="font-medium text-foreground">{shift.workStart}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">下班时间</span>
                            <p className="font-medium text-foreground">{shift.workEnd}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">午休时间</span>
                            <p className="font-medium text-foreground">{shift.lunchStart}-{shift.lunchEnd}</p>
                          </div>
                          {shift.flexMinutes > 0 && (
                            <div>
                              <span className="text-muted-foreground">弹性范围</span>
                              <p className="font-medium text-foreground">{shift.flexMinutes}分钟</p>
                            </div>
                          )}
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="mt-4 w-full">编辑班次</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">本周考勤统计</CardTitle>
              <CardDescription>正常出勤与异常情况对比</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                  <Bar dataKey="normal" name="正常" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="abnormal" name="异常" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
