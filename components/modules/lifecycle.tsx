"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertCircle, Plus, Eye, Send, User, ArrowRight, ClipboardCheck, FileText, Loader2 } from "lucide-react"
import { resignationChecklist } from "@/lib/mock-data"
import useSWR from "swr"
import { useState } from "react"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    const info = await res.json()
    throw Object.assign(error, { info, status: res.status })
  }
  return res.json()
}

const taskStatusColors: Record<string, string> = {
  "已完成": "text-success",
  "进行中": "text-primary",
  "待办": "text-muted-foreground",
}

const taskStatusIcons: Record<string, typeof CheckCircle> = {
  "已完成": CheckCircle,
  "进行中": Clock,
  "待办": AlertCircle,
}

// =====================================================
// 入职管理模块
// =====================================================
export function OnboardingModule() {
  const { data: onboardingTasks = [], isLoading } = useSWR("/api/onboarding", fetcher)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoading) {
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
          <h1 className="text-2xl font-semibold text-foreground">入职管理</h1>
          <p className="text-muted-foreground text-sm mt-1">智能入职流程：线上Offer发送、自动生成入职任务清单（IT/行政/HR）、员工自助材料上传</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 size-4" />发起入职</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>发起入职流程</DialogTitle>
              <DialogDescription>填写新员工基本信息，系统将自动生成入职任务清单并发送通知</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>姓名</Label>
                  <Input placeholder="请输入姓名" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>部门</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="选择部门" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">技术部</SelectItem>
                      <SelectItem value="product">产品部</SelectItem>
                      <SelectItem value="sales">销售部</SelectItem>
                      <SelectItem value="design">设计部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>岗位</Label>
                  <Input placeholder="请输入岗位" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>预计入职日期</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>发送Offer</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="候选人邮箱" className="flex-1" />
                  <Button variant="outline" size="sm"><Send className="mr-2 size-4" />发送</Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button>确认发起</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">进行中</p>
              <p className="text-2xl font-bold text-foreground">{Array.isArray(onboardingTasks) ? onboardingTasks.filter((t: any) => t.status === "进行中").length : 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <CheckCircle className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">已完成</p>
              <p className="text-2xl font-bold text-foreground">{Array.isArray(onboardingTasks) ? onboardingTasks.filter((t: any) => t.status === "已完成").length : 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <User className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">本月入职</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Tasks */}
      <div className="flex flex-col gap-4">
        {Array.isArray(onboardingTasks) && onboardingTasks.map((ob: any) => (
          <Card key={ob.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10 text-primary">{ob.employeeName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{ob.employeeName} - {ob.department}</CardTitle>
                    <CardDescription>入职日期: {ob.joinDate}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Progress value={ob.progress} className="h-2 w-24" />
                    <span className="text-sm font-medium text-foreground">{ob.progress}%</span>
                  </div>
                  <Badge variant={ob.status === "已完成" ? "secondary" : "default"} className={ob.status === "已完成" ? "bg-success/10 text-success" : ""}>
                    {ob.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {ob.tasks.map((task, idx) => {
                  const StatusIcon = taskStatusIcons[task.status] || AlertCircle
                  return (
                    <div key={idx} className="flex items-center gap-3 rounded-lg border border-border p-3">
                      <StatusIcon className={`size-4 ${taskStatusColors[task.status]}`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground">{task.name}</span>
                        <p className="text-xs text-muted-foreground">{task.assignee}</p>
                      </div>
                      <Badge variant="outline" className={`text-[10px] h-5 ${task.status === "已完成" ? "bg-success/10 text-success border-success/20" : task.status === "进行中" ? "bg-primary/10 text-primary border-primary/20" : ""}`}>
                        {task.status}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// =====================================================
// 试用期管理模块
// =====================================================
export function ProbationModule() {
  const { data: probationRecords = [], isLoading } = useSWR("/api/probation", fetcher)

  if (isLoading) {
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
          <h1 className="text-2xl font-semibold text-foreground">试用期管理</h1>
          <p className="text-muted-foreground text-sm mt-1">自动跟踪试用期状态，到期提前提醒，支持正常/提前/延长转正，在线评估表单</p>
        </div>
      </div>

      {/* Probation Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.isArray(probationRecords) && probationRecords.map((pr: any) => (
          <Card key={pr.id}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">{pr.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{pr.name}</h3>
                      <p className="text-sm text-muted-foreground">{pr.department} - {pr.position}</p>
                    </div>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">{pr.status}</Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">入职日期</span>
                      <p className="font-medium text-foreground">{pr.joinDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">转正日期</span>
                      <p className="font-medium text-foreground">{pr.probationEnd}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">剩余天数</span>
                      <p className="font-medium text-warning">{pr.daysLeft}天</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>试用期进度</span>
                      <span>{Math.round(((90 - pr.daysLeft) / 90) * 100)}%</span>
                    </div>
                    <Progress value={((90 - pr.daysLeft) / 90) * 100} className="h-2" />
                  </div>

                  <div className="mt-3 rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">主管评语</p>
                    <p className="text-sm text-foreground mt-1">{pr.managerComment}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">评分:</span>
                      <span className="text-sm font-semibold text-foreground">{pr.score}/100</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">发起转正</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>发起转正审批 - {pr.name}</DialogTitle>
                          <DialogDescription>请填写转正评估信息</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 py-4">
                          <div className="flex flex-col gap-2">
                            <Label>转正类型</Label>
                            <Select>
                              <SelectTrigger><SelectValue placeholder="选择转正类型" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="normal">正常转正</SelectItem>
                                <SelectItem value="early">提前转正</SelectItem>
                                <SelectItem value="extend">延长试用</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>转正评估分数</Label>
                            <Input type="number" defaultValue={pr.score} />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>转正评语</Label>
                            <Textarea placeholder="请输入转正评语" defaultValue={pr.managerComment} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">取消</Button>
                          <Button>提交审批</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline">延长试用</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// =====================================================
// 异动管理模块（调岗/晋升/降级）
// =====================================================
export function TransferModule() {
  const { data: personnelChanges = [], isLoading } = useSWR("/api/personnel-changes", fetcher)
  const { data: employees = [] } = useSWR("/api/employees", fetcher)
  
  const transfers = Array.isArray(personnelChanges) ? personnelChanges.filter((c: any) => c.type === "调岗" || c.type === "晋升") : []

  if (isLoading) {
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
          <h1 className="text-2xl font-semibold text-foreground">异动管理</h1>
          <p className="text-muted-foreground text-sm mt-1">管理员工调岗、晋升、降级，支持跨部门、跨区域调动及批量处理</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 size-4" />发起异动</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>发起人事异动</DialogTitle>
              <DialogDescription>填写异动信息并提交审批</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>异动类型</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="选择类型" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transfer">调岗</SelectItem>
                    <SelectItem value="promote">晋升</SelectItem>
                    <SelectItem value="demote">降级</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>员工</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="选择员工" /></SelectTrigger>
                  <SelectContent>
                    {Array.isArray(employees) && employees.filter((e: any) => e.status !== "离职").map((e: any) => (
                      <SelectItem key={e.id} value={e.id}>{e.name} - {e.department}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>新部门</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="选择部门" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">技术部</SelectItem>
                      <SelectItem value="product">产品部</SelectItem>
                      <SelectItem value="market">市场部</SelectItem>
                      <SelectItem value="sales">销售部</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>新岗位</Label>
                  <Input placeholder="请输入新岗位" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>生效日期</Label>
                <Input type="date" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>备注</Label>
                <Textarea placeholder="请输入变动原因" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button>提交审批</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">异动记录</CardTitle>
          <CardDescription>审批流程: 原部门经理 &rarr; 新部门经理 &rarr; HR经理</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>编号</TableHead>
                <TableHead>员工</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>变动前</TableHead>
                <TableHead></TableHead>
                <TableHead>变动后</TableHead>
                <TableHead>生效日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{t.id}</TableCell>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={t.type === "晋升" ? "bg-primary/10 text-primary border-primary/20" : "bg-warning/10 text-warning border-warning/20"}>
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.fromDept} / {t.fromPosition}</TableCell>
                  <TableCell><ArrowRight className="size-4 text-muted-foreground" /></TableCell>
                  <TableCell className="text-sm font-medium">{t.toDept} / {t.toPosition}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.effectDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">{t.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[120px] truncate">{t.remark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// =====================================================
// 离职管理模块
// =====================================================
export function ResignationModule() {
  const { data: personnelChanges = [], isLoading } = useSWR("/api/personnel-changes", fetcher)
  const { data: employees = [] } = useSWR("/api/employees", fetcher)
  
  const resignations = Array.isArray(personnelChanges) ? personnelChanges.filter((c: any) => c.type === "离职") : []

  if (isLoading) {
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
          <h1 className="text-2xl font-semibold text-foreground">离职管理</h1>
          <p className="text-muted-foreground text-sm mt-1">标准化离职交接清单（部门/IT/财务/行政），自动计算最后工作日，一键生成离职证明</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive"><Plus className="mr-2 size-4" />发起离职</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>发起离职流程</DialogTitle>
              <DialogDescription>选择员工并填写离职信息</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>员工</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="选择员工" /></SelectTrigger>
                  <SelectContent>
                    {Array.isArray(employees) && employees.filter((e: any) => e.status !== "离职").map((e: any) => (
                      <SelectItem key={e.id} value={e.id}>{e.name} - {e.department}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>离职类型</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="选择类型" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resign">主动离职</SelectItem>
                      <SelectItem value="dismiss">辞退</SelectItem>
                      <SelectItem value="expire">合同到期不续签</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>预计最后工作日</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>离职原因</Label>
                <Textarea placeholder="请输入离职原因" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button variant="destructive">提交离职流程</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resignation Checklist Template */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardCheck className="size-4 text-primary" />
            标准离职交接清单
          </CardTitle>
          <CardDescription>所有离职员工需完成以下交接事项</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {resignationChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                  <span className="text-xs font-medium text-foreground">{idx + 1}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <p className="text-xs text-muted-foreground">{item.department}</p>
                </div>
                {item.required && <Badge variant="outline" className="ml-auto text-[10px] h-5 bg-destructive/10 text-destructive border-destructive/20">必选</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resignation Records */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">离职记录</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>员工</TableHead>
                <TableHead>原部门 / 岗位</TableHead>
                <TableHead>离职日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>备注</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(resignations) && resignations.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.fromDept} / {r.fromPosition}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.effectDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.remark}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="text-xs"><FileText className="mr-1 size-3" />离职证明</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
