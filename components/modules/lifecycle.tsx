"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock, AlertCircle, Plus, User, ArrowRight, ClipboardCheck, FileText, Loader2, Pencil } from "lucide-react"
import { resignationChecklist } from "@/lib/mock-data"
import useSWR, { mutate } from "swr"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    let message = "数据请求失败，请稍后重试"
    try {
      const info = await res.json()
      if (info?.error) message = info.error
    } catch (err) {
      // ignore parse errors
    }
    throw new Error(message)
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
  const { toast } = useToast()
  const { data: onboardingTasks = [], isLoading, error: onboardingError, mutate } = useSWR("/api/onboarding", fetcher)
  const { data: employees = [] } = useSWR("/api/employees", fetcher)
  const { data: departments = [] } = useSWR("/api/departments", fetcher)
  const { data: positions = [] } = useSWR("/api/positions", fetcher)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [form, setForm] = useState({
    employeeName: "",
    departmentId: "",
    positionId: "",
    joinDate: "",
    offerUrl: "",
    contractUrl: "",
    ndaUrl: "",
    handbookUrl: "",
    tasks: [] as any[],
    notes: "",
  })
  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    id: "",
    employeeName: "",
    departmentId: "",
    positionId: "",
    joinDate: "",
    status: "进行中",
    progress: 0,
    offerStatus: "待发送",
    contractStatus: "待签署",
    ndaStatus: "待签署",
    handbookStatus: "待确认",
    offerUrl: "",
    contractUrl: "",
    ndaUrl: "",
    handbookUrl: "",
    tasks: [] as any[],
    notes: "",
  })
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  const handleCreate = async () => {
    if (!form.employeeName || !form.joinDate) {
      toast({ title: "请补全必填项", description: "员工姓名和入职日期不能为空", variant: "destructive" })
      return
    }
    setIsSubmitting(true)
    const payload = {
      employee_name: form.employeeName,
      department_id: form.departmentId || null,
      position_id: form.positionId || null,
      join_date: form.joinDate,
      offer_url: form.offerUrl || null,
      contract_url: form.contractUrl || null,
      nda_url: form.ndaUrl || null,
      handbook_url: form.handbookUrl || null,
      notes: form.notes || null,
      tasks: form.tasks.length > 0 ? form.tasks : undefined, // 为空则由后端注入默认任务
    }
    try {
      const res = await fetch("/api/onboarding", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error((await res.json())?.error || "创建失败")
      toast({ title: "创建成功", description: "已创建入职记录" })
      await mutate()
      setForm({ employeeName: "", departmentId: "", positionId: "", joinDate: "", offerUrl: "", contractUrl: "", ndaUrl: "", handbookUrl: "", tasks: [], notes: "" })
      setCreateOpen(false)
    } catch (err: any) {
      toast({ title: "创建失败", description: err.message || "请稍后再试", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEdit = (ob: any) => {
    setEditForm({
      id: ob.id,
      employeeName: ob.employeeName,
      departmentId: ob.departmentId || "",
      positionId: ob.positionId || "",
      joinDate: ob.joinDate || "",
      status: ob.status || "进行中",
      progress: ob.progress ?? 0,
      offerStatus: ob.offerStatus || "待发送",
      contractStatus: ob.contractStatus || "待签署",
      ndaStatus: ob.ndaStatus || "待签署",
      handbookStatus: ob.handbookStatus || "待确认",
      offerUrl: ob.offerUrl || "",
      contractUrl: ob.contractUrl || "",
      ndaUrl: ob.ndaUrl || "",
      handbookUrl: ob.handbookUrl || "",
      tasks: ob.tasks || [],
      notes: ob.notes || "",
    })
    setEditOpen(true)
  }

  const handleUpdate = async () => {
    if (!editForm.id) {
      toast({ title: "未找到记录", description: "缺少入职记录 ID", variant: "destructive" })
      return
    }
    try {
      const res = await fetch("/api/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editForm.id,
          department_id: editForm.departmentId || null,
          position_id: editForm.positionId || null,
          employee_name: editForm.employeeName,
          join_date: editForm.joinDate,
          status: editForm.status,
          progress: Number(editForm.progress) || 0,
          offer_status: editForm.offerStatus,
          contract_status: editForm.contractStatus,
          nda_status: editForm.ndaStatus,
          handbook_status: editForm.handbookStatus,
          offer_url: editForm.offerUrl || null,
          contract_url: editForm.contractUrl || null,
          nda_url: editForm.ndaUrl || null,
          handbook_url: editForm.handbookUrl || null,
          tasks: editForm.tasks,
          notes: editForm.notes || null,
        }),
      })
      if (!res.ok) throw new Error((await res.json())?.error || "更新失败")
      toast({ title: "更新成功", description: "入职记录已保存" })
      setEditOpen(false)
      await mutate()
    } catch (err: any) {
      toast({ title: "更新失败", description: err.message || "请稍后再试", variant: "destructive" })
    }
  }

  const handleComplete = async (ob: any) => {
    try {
      const res = await fetch("/api/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ob.id,
          status: "已完成",
          progress: 100,
          join_date: ob.joinDate,
          department_id: ob.departmentId,
          position_id: ob.positionId,
          employee_name: ob.employeeName,
          offer_url: ob.offerUrl,
          contract_url: ob.contractUrl,
          nda_url: ob.ndaUrl,
          handbook_url: ob.handbookUrl,
        }),
      })
      if (!res.ok) throw new Error((await res.json())?.error || "更新失败")
      toast({ title: "已标记完成", description: ob.employeeName })
      await mutate()
    } catch (err: any) {
      toast({ title: "更新失败", description: err.message || "请稍后再试", variant: "destructive" })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/onboarding?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error((await res.json())?.error || "删除失败")
      toast({ title: "删除成功" })
      await mutate()
    } catch (err: any) {
      toast({ title: "删除失败", description: err.message || "请稍后再试", variant: "destructive" })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (onboardingError) {
    return (
      <div className="flex h-[400px] items-center justify-center text-destructive">
        加载入职数据失败：{onboardingError.message || "请稍后重试"}
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
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 size-4" />发起入职</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>发起入职流程</DialogTitle>
              <DialogDescription>输入员工姓名、部门、岗位，系统自动生成 IT/行政/HR 并行任务</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>员工姓名</Label>
                  <Input
                    placeholder="请输入员工姓名"
                    value={form.employeeName}
                    onChange={(e) => setForm((prev) => ({ ...prev, employeeName: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>部门</Label>
                  <Select
                    value={form.departmentId}
                    onValueChange={(val) => setForm((prev) => ({ ...prev, departmentId: val }))}
                  >
                    <SelectTrigger><SelectValue placeholder="选择部门" /></SelectTrigger>
                    <SelectContent>
                      {Array.isArray(departments) && departments.map((d: any) => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>岗位</Label>
                  <Select
                    value={form.positionId}
                    onValueChange={(val) => setForm((prev) => ({ ...prev, positionId: val }))}
                  >
                    <SelectTrigger><SelectValue placeholder="选择岗位" /></SelectTrigger>
                    <SelectContent>
                      {Array.isArray(positions) && positions.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>预计入职日期</Label>
                  <Input
                    type="date"
                    value={form.joinDate}
                    onChange={(e) => setForm((prev) => ({ ...prev, joinDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Offer 链接</Label>
                  <Input placeholder="https://..." value={form.offerUrl} onChange={(e) => setForm((prev) => ({ ...prev, offerUrl: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>劳动合同文件</Label>
                  <Input placeholder="https://..." value={form.contractUrl} onChange={(e) => setForm((prev) => ({ ...prev, contractUrl: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>保密协议文件</Label>
                  <Input placeholder="https://..." value={form.ndaUrl} onChange={(e) => setForm((prev) => ({ ...prev, ndaUrl: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>员工手册链接</Label>
                  <Input placeholder="https://..." value={form.handbookUrl} onChange={(e) => setForm((prev) => ({ ...prev, handbookUrl: e.target.value }))} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>备注</Label>
                <Textarea placeholder="输入额外说明..." value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>取消</Button>
              <Button disabled={isSubmitting} onClick={handleCreate}>
                {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}确认发起
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑入职记录</DialogTitle>
              <DialogDescription>调整状态、进度或文件链接</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>员工姓名</Label>
                  <Input
                    placeholder="请输入员工姓名"
                    value={editForm.employeeName}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, employeeName: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>入职日期</Label>
                  <Input type="date" value={editForm.joinDate} onChange={(e) => setEditForm((prev) => ({ ...prev, joinDate: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>状态</Label>
                  <Select value={editForm.status} onValueChange={(val) => setEditForm((prev) => ({ ...prev, status: val }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="待确认">待确认</SelectItem>
                      <SelectItem value="进行中">进行中</SelectItem>
                      <SelectItem value="已完成">已完成</SelectItem>
                      <SelectItem value="已取消">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>进度</Label>
                  <Input type="number" min={0} max={100} value={editForm.progress} onChange={(e) => setEditForm((prev) => ({ ...prev, progress: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Offer 状态</Label>
                  <Select value={editForm.offerStatus} onValueChange={(val) => setEditForm((prev) => ({ ...prev, offerStatus: val }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="待发送">待发送</SelectItem>
                      <SelectItem value="已发送">已发送</SelectItem>
                      <SelectItem value="已确认">已确认</SelectItem>
                      <SelectItem value="已拒绝">已拒绝</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Offer 链接</Label>
                  <Input value={editForm.offerUrl} onChange={(e) => setEditForm((prev) => ({ ...prev, offerUrl: e.target.value }))} placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>合同状态</Label>
                  <Select value={editForm.contractStatus} onValueChange={(val) => setEditForm((prev) => ({ ...prev, contractStatus: val }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="待签署">待签署</SelectItem>
                      <SelectItem value="已签署">已签署</SelectItem>
                      <SelectItem value="已拒绝">已拒绝</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>合同文件</Label>
                  <Input value={editForm.contractUrl} onChange={(e) => setEditForm((prev) => ({ ...prev, contractUrl: e.target.value }))} placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>NDA 状态</Label>
                  <Select value={editForm.ndaStatus} onValueChange={(val) => setEditForm((prev) => ({ ...prev, ndaStatus: val }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="待签署">待签署</SelectItem>
                      <SelectItem value="已签署">已签署</SelectItem>
                      <SelectItem value="已拒绝">已拒绝</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>NDA 文件</Label>
                  <Input value={editForm.ndaUrl} onChange={(e) => setEditForm((prev) => ({ ...prev, ndaUrl: e.target.value }))} placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>手册状态</Label>
                  <Select value={editForm.handbookStatus} onValueChange={(val) => setEditForm((prev) => ({ ...prev, handbookStatus: val }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="待确认">待确认</SelectItem>
                      <SelectItem value="已确认">已确认</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>手册链接</Label>
                  <Input value={editForm.handbookUrl} onChange={(e) => setEditForm((prev) => ({ ...prev, handbookUrl: e.target.value }))} placeholder="https://..." />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>备注</Label>
                <Textarea placeholder="输入额外说明..." value={editForm.notes} onChange={(e) => setEditForm((prev) => ({ ...prev, notes: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="flex items-center justify-between">
                  <span>并行任务管理</span>
                  <span className="text-xs font-normal text-muted-foreground">{editForm.tasks.filter((t: any) => t.status === "已完成").length}/{editForm.tasks.length} 已完成</span>
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-1 max-h-[200px] overflow-y-auto pr-2 border rounded-lg p-2 bg-muted/20">
                  {editForm.tasks.map((task: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 rounded-md border bg-card p-2 text-xs">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{task.name}</p>
                        <p className="text-[10px] text-muted-foreground">{task.assignee}</p>
                      </div>
                      <Select
                        value={task.status}
                        onValueChange={(val) => {
                          const newTasks = [...editForm.tasks]
                          newTasks[idx] = { ...task, status: val }
                          setEditForm(prev => ({ ...prev, tasks: newTasks }))
                        }}
                      >
                        <SelectTrigger className="h-6 w-[70px] text-[10px] px-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="待办">待办</SelectItem>
                          <SelectItem value="进行中">进行中</SelectItem>
                          <SelectItem value="已完成">已完成</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>取消</Button>
              <Button onClick={handleUpdate}>保存</Button>
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
              <p className="text-2xl font-bold text-foreground">
                {Array.isArray(onboardingTasks) 
                  ? onboardingTasks.filter((t: any) => {
                      const now = new Date();
                      const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                      return t.joinDate?.startsWith(prefix);
                    }).length 
                  : 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">入职任务列表</CardTitle>
          <CardDescription>Offer / 合同 / 保密 / 手册签署与多部门并行任务</CardDescription>
        </CardHeader>
        <CardContent>
          {Array.isArray(onboardingTasks) && onboardingTasks.length === 0 ? (
            <div className="flex h-24 items-center justify-center text-muted-foreground text-sm">暂无入职记录，点击右上角"发起入职"创建</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>员工</TableHead>
                  <TableHead>部门/岗位</TableHead>
                  <TableHead>入职日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>合同</TableHead>
                  <TableHead>NDA</TableHead>
                  <TableHead>手册</TableHead>
                  <TableHead className="text-right">进度</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(onboardingTasks) && onboardingTasks.map((ob: any) => (
                  <TableRow key={`table-${ob.id}`}>
                    <TableCell className="font-medium">{ob.employeeName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ob.department} / {ob.position}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ob.joinDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={ob.status === "已完成" ? "bg-success/10 text-success border-success/20" : ob.status === "进行中" ? "bg-primary/10 text-primary border-primary/20" : ""}>{ob.status}</Badge>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{ob.offerStatus}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{ob.contractStatus}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{ob.ndaStatus}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{ob.handbookStatus}</Badge></TableCell>
                    <TableCell className="text-right text-sm font-medium">{ob.progress}%</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(ob)}>
                        <Pencil className="mr-1 size-4" /> 编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={ob.status === "已完成"}
                        onClick={() => handleComplete(ob)}
                      >标记完成</Button>
                      <AlertDialog open={deleteTarget?.id === ob.id} onOpenChange={(open) => setDeleteTarget(open ? { id: ob.id, name: ob.employeeName } : null)}>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">删除</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除入职记录</AlertDialogTitle>
                            <AlertDialogDescription>删除后无法恢复：{ob.employeeName}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction onClick={() => ob.id ? handleDelete(ob.id) : toast({ title: "未找到记录", description: "缺少入职记录 ID", variant: "destructive" })} className="bg-destructive text-white hover:bg-destructive/90">确认删除</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Onboarding Tasks */}
      <div className="flex flex-col gap-4">
        <Accordion type="multiple" className="w-full space-y-4">
          {Array.isArray(onboardingTasks) && onboardingTasks.map((ob: any) => (
            <AccordionItem key={ob.id} value={ob.id} className="border rounded-xl bg-card overflow-hidden border-none">
              <div className="border rounded-xl">
                <AccordionTrigger className="hover:no-underline py-0 px-0 pr-6 focus-visible:ring-0">
                  <div className="flex flex-1 items-center justify-between p-6">
                    <div className="flex items-center gap-3 text-left">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-primary/10 text-primary">{ob.employeeName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-base font-semibold text-foreground leading-none mb-1">{ob.employeeName} - {ob.department}</h3>
                        <p className="text-sm text-muted-foreground">入职日期: {ob.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mr-6">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-medium text-muted-foreground">{ob.progress}%</span>
                          <Progress value={ob.progress} className="h-1.5 w-24" />
                        </div>
                      </div>
                      <Badge variant={ob.status === "已完成" ? "secondary" : "default"} className={ob.status === "已完成" ? "bg-success/10 text-success border-success/20" : ""}>
                        {ob.status}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-2">
                    {ob.tasks.map((task: any, idx: number) => {
                      const StatusIcon = taskStatusIcons[task.status] || AlertCircle
                      return (
                        <div key={idx} className="flex items-center gap-3 rounded-lg border border-border p-3 bg-muted/30">
                          <StatusIcon className={`size-4 ${taskStatusColors[task.status]}`} />
                          <div className="flex-1 min-w-0 text-left">
                            <span className="text-sm font-medium text-foreground">{task.name}</span>
                            <p className="text-xs text-muted-foreground">{task.assignee}</p>
                          </div>
                          <Select
                            value={task.status}
                            onValueChange={async (val) => {
                              if (!ob.id) {
                                toast({ title: "未找到记录", description: "缺少入职记录 ID", variant: "destructive" })
                                return
                              }
                              const newTasks = ob.tasks.map((t: any, i: number) => i === idx ? { ...t, status: val } : t)
                              const done = newTasks.filter((t: any) => t.status === "已完成").length
                              const progress = Math.round((done / newTasks.length) * 100)
                              try {
                                const res = await fetch("/api/onboarding", {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    id: ob.id,
                                    department_id: ob.departmentId,
                                    position_id: ob.positionId,
                                    employee_name: ob.employeeName,
                                    join_date: ob.joinDate,
                                    status: progress === 100 ? "已完成" : ob.status,
                                    progress,
                                    offer_status: ob.offerStatus,
                                    contract_status: ob.contractStatus,
                                    nda_status: ob.ndaStatus,
                                    handbook_status: ob.handbookStatus,
                                    offer_url: ob.offerUrl,
                                    contract_url: ob.contractUrl,
                                    nda_url: ob.ndaUrl,
                                    handbook_url: ob.handbookUrl,
                                    tasks: newTasks,
                                  }),
                                })
                                if (!res.ok) throw new Error((await res.json())?.error || "更新任务失败")
                                toast({ title: "任务已更新", description: `${task.name} → ${val}` })
                                await mutate()
                              } catch (err: any) {
                                toast({ title: "更新任务失败", description: err.message || "请稍后再试", variant: "destructive" })
                              }
                            }}
                          >
                            <SelectTrigger className={`h-7 w-[96px] text-[11px] ${task.status === "已完成" ? "bg-success/10 text-success border-success/20" : task.status === "进行中" ? "bg-primary/10 text-primary border-primary/20" : ""}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="待办">待办</SelectItem>
                              <SelectItem value="进行中">进行中</SelectItem>
                              <SelectItem value="已完成">已完成</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )
                    })}
                  </div>
                  {ob.notes && (
                    <div className="mt-4 rounded-lg bg-muted/50 p-3 text-left">
                      <p className="text-xs font-medium text-muted-foreground mb-1">备注说明</p>
                      <p className="text-sm text-foreground">{ob.notes}</p>
                    </div>
                  )}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

// =====================================================
// 试用期管理模块
// =====================================================
export function ProbationModule() {
  const { toast } = useToast()
  const { data: probationRecords = [], isLoading: recordsLoading, mutate: mutateRecords } = useSWR("/api/probation", fetcher)
  const { data: templates = [] } = useSWR("/api/probation/templates", fetcher)
  const { data: employees = [] } = useSWR("/api/employees", fetcher)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [evaluationData, setEvaluationData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editRecordOpen, setEditRecordOpen] = useState(false)
  const [editRecordForm, setEditRecordForm] = useState({
    id: "",
    employee_id: "",
    join_date: "",
    probation_months: 3,
    status: "进行中"
  })
  const [activeRecord, setActiveRecord] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [addRecordOpen, setAddRecordOpen] = useState(false)
  const [extendDialogOpen, setExtendDialogOpen] = useState(false)
  const [extendMonths, setExtendMonths] = useState(1)
  const [newRecord, setNewRecord] = useState({
    employee_id: "",
    join_date: new Date().toISOString().split('T')[0],
    probation_months: 3
  })
  const [templateManagerOpen, setTemplateManagerOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [templateTitle, setTemplateTitle] = useState("")
  const [templateContent, setTemplateContent] = useState<any[]>([])

  const [deleteRecordTarget, setDeleteRecordTarget] = useState<{ id: string; name: string } | null>(null)
  const [deleteTemplateTarget, setDeleteTemplateTarget] = useState<{ id: string; title: string } | null>(null)

  // 当模板改变时初始化表单数据
  useEffect(() => {
    if (selectedTemplate) {
      const initialData: Record<string, any> = {}
      selectedTemplate.content.forEach((field: any) => {
        initialData[field.id] = ""
      })
      setEvaluationData(initialData)
    }
  }, [selectedTemplate])

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template)
    setTemplateTitle(template.title)
    setTemplateContent(template.content)
    setTemplateManagerOpen(true)
  }

  const handleCreateTemplate = () => {
    setEditingTemplate(null)
    setTemplateTitle("新评估模板")
    setTemplateContent([
      { id: "field_1", label: "考核项 1", type: "textarea", required: true, placeholder: "请输入..." }
    ])
    setTemplateManagerOpen(true)
  }

  const handleSaveTemplate = async () => {
    try {
      const url = "/api/probation/templates"
      const method = editingTemplate ? "PUT" : "POST"
      const body = {
        id: editingTemplate?.id,
        title: templateTitle,
        content: templateContent,
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error("保存模板失败")
      toast({ title: "模板已保存" })
      setTemplateManagerOpen(false)
      // 重新加载模板列表
      mutate("/api/probation/templates")
    } catch (err: any) {
      toast({ title: "错误", description: err.message, variant: "destructive" })
    }
  }

  const handleDeleteRecord = async (id: string) => {
    try {
      const res = await fetch(`/api/probation?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("删除失败")
      toast({ title: "已删除记录" })
      setDeleteRecordTarget(null)
      mutateRecords()
    } catch (err: any) {
      toast({ title: "错误", description: err.message, variant: "destructive" })
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    try {
      const res = await fetch(`/api/probation/templates?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error("删除失败")
      toast({ title: "已删除模板" })
      setDeleteTemplateTarget(null)
      mutate("/api/probation/templates")
    } catch (err: any) {
      toast({ title: "错误", description: err.message, variant: "destructive" })
    }
  }

  const handleExtendProbation = async () => {
    if (!activeRecord) return
    setIsSubmitting(true)
    try {
      const currentEndDate = new Date(activeRecord.probationEnd)
      currentEndDate.setMonth(currentEndDate.getMonth() + Number(extendMonths))
      const newEndDate = currentEndDate.toISOString().split('T')[0]

      const res = await fetch("/api/probation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeRecord.id,
          probation_end_date: newEndDate,
          probation_months: activeRecord.probation_months + Number(extendMonths),
          status: "已延长"
        })
      })

      if (!res.ok) throw new Error("操作失败")
      toast({ title: "试用期已延长", description: `新转正日期: ${newEndDate}` })
      setExtendDialogOpen(false)
      mutateRecords()
    } catch (err: any) {
      toast({ title: "错误", description: err.message, variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditRecord = (record: any) => {
    setEditRecordForm({
      id: record.id,
      employee_id: record.employee_id,
      join_date: record.joinDate,
      probation_months: record.probation_months,
      status: record.status
    })
    setEditRecordOpen(true)
  }

  const handleUpdateRecord = async () => {
    if (!editRecordForm.id) return
    setIsSubmitting(true)
    try {
      const joinDate = new Date(editRecordForm.join_date)
      const endDate = new Date(joinDate)
      endDate.setMonth(endDate.getMonth() + Number(editRecordForm.probation_months))
      const probation_end_date = endDate.toISOString().split('T')[0]

      const res = await fetch("/api/probation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editRecordForm,
          probation_end_date
        })
      })

      if (!res.ok) throw new Error("更新失败")
      toast({ title: "已更新试用期记录" })
      setEditRecordOpen(false)
      mutateRecords()
    } catch (err: any) {
      toast({ title: "更新失败", description: err.message, variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddField = () => {
    const newId = `field_${templateContent.length + 1}`
    setTemplateContent([...templateContent, { id: newId, label: `新考核项 ${templateContent.length + 1}`, type: "textarea", required: false }])
  }

  const handleRemoveField = (id: string) => {
    setTemplateContent(templateContent.filter(f => f.id !== id))
  }

  const handleInitiate = (record: any) => {
    setActiveRecord(record)
    if (templates.length > 0) {
      setSelectedTemplate(templates[0])
    }
    setDialogOpen(true)
  }

  const handleAddRecord = async () => {
    if (!newRecord.employee_id || !newRecord.join_date) {
      toast({ title: "请填写完整信息", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      // 计算转正日期
      const joinDate = new Date(newRecord.join_date)
      const endDate = new Date(joinDate)
      endDate.setMonth(endDate.getMonth() + Number(newRecord.probation_months))
      const probation_end_date = endDate.toISOString().split('T')[0]

      const res = await fetch("/api/probation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newRecord,
          probation_end_date,
          status: "进行中"
        })
      })

      if (!res.ok) throw new Error("添加失败")
      
      toast({ title: "已添加试用期记录" })
      setAddRecordOpen(false)
      setNewRecord({ 
        employee_id: "", 
        join_date: new Date().toISOString().split('T')[0], 
        probation_months: 3 
      })
      mutateRecords()
    } catch (err: any) {
      toast({ title: "添加失败", description: err.message, variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitEvaluation = async () => {
    if (!activeRecord || !selectedTemplate) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/probation/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          probation_record_id: activeRecord.id,
          template_id: selectedTemplate.id,
          evaluation_data: evaluationData,
          status: "已提交"
        })
      })

      if (!res.ok) throw new Error("提交失败")
      
      // 更新试用期记录状态
      await fetch("/api/probation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeRecord.id,
          status: "已转正"
        })
      })

      toast({ title: "转正审批已发起", description: `${activeRecord.name} 的转正评估已提交系统` })
      setDialogOpen(false)
      mutateRecords()
    } catch (err: any) {
      toast({ title: "提交失败", description: err.message || "请稍后再试", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (recordsLoading) {
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
        <div className="flex gap-2">
          <Button onClick={() => setAddRecordOpen(true)}><Plus className="mr-2 size-4" />新增记录</Button>
          <Button variant="outline" onClick={handleCreateTemplate}><Plus className="mr-2 size-4" />新建模板</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><FileText className="mr-2 size-4" />管理模板</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>考核评估模板管理</DialogTitle>
                <DialogDescription>创建和修改不同职位的转正评估模板</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {templates.map((t: any) => (
                  <div key={t.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <div>
                      <h4 className="font-medium text-foreground">{t.title}</h4>
                      <p className="text-xs text-muted-foreground">{t.content.length} 个考核项</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditTemplate(t)}>编辑</Button>
                      <AlertDialog open={deleteTemplateTarget?.id === t.id} onOpenChange={(open) => setDeleteTemplateTarget(open ? { id: t.id, title: t.title } : null)}>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive">删除</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除评估模板</AlertDialogTitle>
                            <AlertDialogDescription>
                              确定要删除模板 "{t.title}" 吗？此操作不可撤销。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteTemplate(t.id)} className="bg-destructive text-white hover:bg-destructive/90">
                              确认删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Probation Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.isArray(probationRecords) && probationRecords.length === 0 ? (
          <div className="col-span-2 flex h-32 items-center justify-center text-muted-foreground border rounded-xl bg-card">暂无试用期记录</div>
        ) : (
          probationRecords.map((pr: any) => (
            <Card key={pr.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">{pr.name?.[0] || '员'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{pr.name}</h3>
                        <p className="text-sm text-muted-foreground">{pr.department} - {pr.position}</p>
                      </div>
                      <Badge variant="outline" className={pr.status === "已转正" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>{pr.status}</Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">入职日期</span>
                        <p className="font-medium text-foreground">{pr.joinDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">预计转正</span>
                        <p className="font-medium text-foreground">{pr.probationEnd}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">剩余天数</span>
                        <p className={cn("font-medium", pr.daysLeft <= 15 ? "text-destructive" : "text-warning")}>{pr.daysLeft}天</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>转正进度</span>
                        <span>{pr.progress}%</span>
                      </div>
                      <Progress value={pr.progress} className="h-2" />
                    </div>

                    {pr.managerComment && (
                      <div className="mt-3 rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground">转正评语</p>
                        <p className="text-sm text-foreground mt-1">{pr.managerComment}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-4">
                      <Button size="sm" onClick={() => handleInitiate(pr)} disabled={pr.status === "已转正"}>发起转正评估</Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        setActiveRecord(pr)
                        setExtendDialogOpen(true)
                      }} disabled={pr.status === "已转正"}>延长试用</Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditRecord(pr)}>编辑</Button>
                      <AlertDialog open={deleteRecordTarget?.id === pr.id} onOpenChange={(open) => setDeleteRecordTarget(open ? { id: pr.id, name: pr.name } : null)}>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive ml-auto hover:bg-destructive/10">
                            <Plus className="size-4 rotate-45" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除试用期记录</AlertDialogTitle>
                            <AlertDialogDescription>
                              确定要删除员工 "{pr.name}" 的试用期记录吗？此操作将永久删除相关数据。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteRecord(pr.id)} className="bg-destructive text-white hover:bg-destructive/90">
                              确认删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>转正考核评估 - {activeRecord?.name}</DialogTitle>
            <DialogDescription>请选择评估模板并填写考核内容</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="flex flex-col gap-2">
              <Label>选择评估模板</Label>
              <Select value={selectedTemplate?.id} onValueChange={(val) => setSelectedTemplate(templates.find((t: any) => t.id === val))}>
                <SelectTrigger><SelectValue placeholder="选择评估模板" /></SelectTrigger>
                <SelectContent>
                  {templates.map((t: any) => (
                    <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="mt-4 space-y-4 border-t pt-4">
                <h4 className="font-medium text-sm text-muted-foreground">评估表内容</h4>
                {selectedTemplate.content.map((field: any) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <Label className="flex items-center gap-1">
                      {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea 
                        placeholder={field.placeholder} 
                        value={evaluationData[field.id]}
                        onChange={(e) => setEvaluationData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      />
                    ) : field.type === "select" ? (
                      <Select value={evaluationData[field.id]} onValueChange={(val) => setEvaluationData(prev => ({ ...prev, [field.id]: val }))}>
                        <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
                        <SelectContent>
                          {field.options?.map((opt: string) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input 
                        placeholder={field.placeholder}
                        value={evaluationData[field.id]}
                        onChange={(e) => setEvaluationData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button disabled={isSubmitting || !selectedTemplate} onClick={handleSubmitEvaluation}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}提交评估
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新增试用期记录弹窗 */}
      <Dialog open={addRecordOpen} onOpenChange={setAddRecordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增试用期记录</DialogTitle>
            <DialogDescription>为新入职员工创建试用期跟踪</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>选择员工</Label>
              <Select 
                value={newRecord.employee_id} 
                onValueChange={(val) => {
                  setNewRecord(prev => ({
                    ...prev, 
                    employee_id: val
                  }))
                }}
              >
                <SelectTrigger><SelectValue placeholder="请选择员工" /></SelectTrigger>
                <SelectContent>
                  {employees.map((emp: any) => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name} ({emp.employee_id})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>入职日期</Label>
              <Input 
                type="date" 
                value={newRecord.join_date} 
                onChange={(e) => setNewRecord(prev => ({ ...prev, join_date: e.target.value }))} 
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>试用期月数</Label>
              <Select 
                value={newRecord.probation_months.toString()} 
                onValueChange={(val) => setNewRecord(prev => ({ ...prev, probation_months: Number(val) }))}
              >
                <SelectTrigger><SelectValue placeholder="选择月数" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1个月</SelectItem>
                  <SelectItem value="3">3个月</SelectItem>
                  <SelectItem value="6">6个月</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddRecordOpen(false)}>取消</Button>
            <Button onClick={handleAddRecord} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}保存记录
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑试用期记录弹窗 */}
      <Dialog open={editRecordOpen} onOpenChange={setEditRecordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑试用期记录</DialogTitle>
            <DialogDescription>修改员工试用期相关信息</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>员工</Label>
              <Select 
                value={editRecordForm.employee_id} 
                onValueChange={(val) => setEditRecordForm(prev => ({ ...prev, employee_id: val }))}
                disabled
              >
                <SelectTrigger><SelectValue placeholder="选择员工" /></SelectTrigger>
                <SelectContent>
                  {employees.map((emp: any) => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name} ({emp.employee_id})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>入职日期</Label>
                <Input 
                  type="date" 
                  value={editRecordForm.join_date} 
                  onChange={(e) => setEditRecordForm(prev => ({ ...prev, join_date: e.target.value }))} 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>状态</Label>
                <Select 
                  value={editRecordForm.status} 
                  onValueChange={(val) => setEditRecordForm(prev => ({ ...prev, status: val }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="进行中">进行中</SelectItem>
                    <SelectItem value="已延长">已延长</SelectItem>
                    <SelectItem value="已转正">已转正</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>试用期月数</Label>
              <Select 
                value={editRecordForm.probation_months.toString()} 
                onValueChange={(val) => setEditRecordForm(prev => ({ ...prev, probation_months: Number(val) }))}
              >
                <SelectTrigger><SelectValue placeholder="选择月数" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1个月</SelectItem>
                  <SelectItem value="3">3个月</SelectItem>
                  <SelectItem value="6">6个月</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRecordOpen(false)}>取消</Button>
            <Button onClick={handleUpdateRecord} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑试用期记录弹窗 */}
      <Dialog open={editRecordOpen} onOpenChange={setEditRecordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑试用期记录</DialogTitle>
            <DialogDescription>修改员工试用期相关信息</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>员工</Label>
              <Select 
                value={editRecordForm.employee_id} 
                onValueChange={(val) => setEditRecordForm(prev => ({ ...prev, employee_id: val }))}
                disabled
              >
                <SelectTrigger><SelectValue placeholder="选择员工" /></SelectTrigger>
                <SelectContent>
                  {employees.map((emp: any) => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name} ({emp.employee_id})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>入职日期</Label>
                <Input 
                  type="date" 
                  value={editRecordForm.join_date} 
                  onChange={(e) => setEditRecordForm(prev => ({ ...prev, join_date: e.target.value }))} 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>状态</Label>
                <Select 
                  value={editRecordForm.status} 
                  onValueChange={(val) => setEditRecordForm(prev => ({ ...prev, status: val }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="进行中">进行中</SelectItem>
                    <SelectItem value="已延长">已延长</SelectItem>
                    <SelectItem value="已转正">已转正</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>试用期月数</Label>
              <Select 
                value={editRecordForm.probation_months.toString()} 
                onValueChange={(val) => setEditRecordForm(prev => ({ ...prev, probation_months: Number(val) }))}
              >
                <SelectTrigger><SelectValue placeholder="选择月数" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1个月</SelectItem>
                  <SelectItem value="3">3个月</SelectItem>
                  <SelectItem value="6">6个月</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditRecordOpen(false)}>取消</Button>
            <Button onClick={handleUpdateRecord} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 延长试用期弹窗 */}
      <Dialog open={extendDialogOpen} onOpenChange={setExtendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>延长试用期 - {activeRecord?.name}</DialogTitle>
            <DialogDescription>设置延长的时间长度</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>延长月数</Label>
              <Select value={extendMonths.toString()} onValueChange={(val) => setExtendMonths(Number(val))}>
                <SelectTrigger><SelectValue placeholder="选择延长月数" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">延长 1 个月</SelectItem>
                  <SelectItem value="2">延长 2 个月</SelectItem>
                  <SelectItem value="3">延长 3 个月</SelectItem>
                  <SelectItem value="6">延长 6 个月</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">
              当前转正日期: {activeRecord?.probationEnd}<br />
              延长后转正日期: {activeRecord && (() => {
                const d = new Date(activeRecord.probationEnd)
                d.setMonth(d.getMonth() + extendMonths)
                return d.toISOString().split('T')[0]
              })()}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExtendDialogOpen(false)}>取消</Button>
            <Button onClick={handleExtendProbation} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}确认延长
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 考核模板管理弹窗 */}
      <Dialog open={templateManagerOpen} onOpenChange={setTemplateManagerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "编辑考核模板" : "新建考核模板"}</DialogTitle>
            <DialogDescription>配置评估表字段和选项</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="flex flex-col gap-2">
              <Label>模板名称</Label>
              <Input value={templateTitle} onChange={(e) => setTemplateTitle(e.target.value)} placeholder="如：销售人员转正模板" />
            </div>

            <div className="mt-4 space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-muted-foreground">字段配置</h4>
                <Button variant="ghost" size="sm" onClick={handleAddField} className="h-7 text-xs px-2"><Plus className="mr-1 size-3" />添加字段</Button>
              </div>
              
              {templateContent.map((field: any, idx: number) => (
                <div key={field.id} className="p-4 border rounded-lg bg-muted/20 relative group">
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveField(field.id)}
                    >
                      <Plus className="size-3 rotate-45 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[11px]">字段名称</Label>
                      <Input 
                        value={field.label} 
                        onChange={(e) => {
                          const newContent = [...templateContent]
                          newContent[idx].label = e.target.value
                          setTemplateContent(newContent)
                        }} 
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[11px]">字段类型</Label>
                      <Select 
                        value={field.type} 
                        onValueChange={(val) => {
                          const newContent = [...templateContent]
                          newContent[idx].type = val
                          if (val === 'select' && !newContent[idx].options) {
                            newContent[idx].options = ["选项1", "选项2"]
                          }
                          setTemplateContent(newContent)
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="input">单行文本</SelectItem>
                          <SelectItem value="textarea">多行文本</SelectItem>
                          <SelectItem value="select">下拉选择</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {field.type === 'select' && (
                    <div className="mt-3 space-y-2 pl-4 border-l-2 border-primary/20">
                      <Label className="text-[10px] text-muted-foreground">下拉选项配置</Label>
                      <div className="flex flex-wrap gap-2">
                        {field.options?.map((opt: string, optIdx: number) => (
                          <div key={optIdx} className="flex items-center gap-1 bg-background border rounded px-2 py-1">
                            <Input 
                              value={opt} 
                              onChange={(e) => {
                                const newContent = [...templateContent]
                                newContent[idx].options[optIdx] = e.target.value
                                setTemplateContent(newContent)
                              }}
                              className="h-6 w-20 text-[10px] border-none p-0 focus-visible:ring-0"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-4 w-4"
                              onClick={() => {
                                const newContent = [...templateContent]
                                newContent[idx].options.splice(optIdx, 1)
                                setTemplateContent(newContent)
                              }}
                            >
                              <Plus className="size-2 rotate-45 text-destructive" />
                            </Button>
                          </div>
                        ))}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 text-[10px] px-2 border-dashed"
                          onClick={() => {
                            const newContent = [...templateContent]
                            newContent[idx].options = [...(newContent[idx].options || []), "新选项"]
                            setTemplateContent(newContent)
                          }}
                        >
                          <Plus className="mr-1 size-2" />添加选项
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateManagerOpen(false)}>取消</Button>
            <Button onClick={handleSaveTemplate}>保存模板</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
