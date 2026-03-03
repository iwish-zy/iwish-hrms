"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Plus, Search, ChevronRight, Users, Edit, Trash2, Briefcase, Loader2, FolderTree, Building, FileText, ClipboardCheck, GraduationCap, Eye, Upload, File, X, Download, FileImage, FileBarChart, FileArchive, FileSearch } from "lucide-react"
import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import useSWR from "swr"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { supabase } from "@/lib/supabase"

// Types
interface Department {
  id: string
  name: string
  code: string | null
  parent_id: string | null
  manager: string | null
  sort_order: number
  level: number
  status: string
  headcount: number
  created_at: string
  updated_at: string
}

interface TreeNode extends Department {
  children: TreeNode[]
}

interface Position {
  id: string
  name: string
  code: string | null
  family: string
  level: string | null
  department_id: string | null
  department_name: string | null
  headcount: number
  filled: number
  salary: string | null
  status: string
  job_description?: string
  probation_criteria?: string
  professional_training?: string
  job_description_files?: string[]
  probation_criteria_files?: string[]
  professional_training_files?: string[]
  created_at: string
  updated_at: string
}

// Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json())

function getPositionCodeFromName(name: string) {
  const trimmed = name.trim()
  if (!trimmed) return null
  const letters = trimmed.match(/[A-Za-z0-9]+/g)?.join("") || ""
  const chinese = trimmed.replace(/[A-Za-z0-9\s]/g, "")
  const mappings: Array<{ keyword: string; abbr: string }> = [
    { keyword: "客户经理", abbr: "AM" },
    { keyword: "项目经理", abbr: "PM" },
    { keyword: "效果营销", abbr: "SEM" },
    { keyword: "优化师", abbr: "OPT" },
    { keyword: "高级", abbr: "SR" },
    { keyword: "资深", abbr: "SR" },
    { keyword: "中级", abbr: "MID" },
    { keyword: "初级", abbr: "JR" },
    { keyword: "经理", abbr: "MGR" },
    { keyword: "专家", abbr: "EXP" },
    { keyword: "助理", abbr: "ASST" },
    { keyword: "储备", abbr: "RSV" },
  ]

  let suffix = ""
  const matchedAbbrs: string[] = []
  for (const { keyword, abbr } of mappings) {
    if (chinese.includes(keyword)) {
      matchedAbbrs.push(abbr)
    }
  }
  // Remove duplicates and join
  suffix = Array.from(new Set(matchedAbbrs)).join("")

  const code = `${letters}${suffix}`.toUpperCase()
  if (code) return code
  const compact = trimmed.replace(/\s+/g, "")
  return compact ? compact.slice(0, 4).toUpperCase() : null
}

// Build tree from flat array
function buildTree(departments: Department[]): TreeNode[] {
  const map = new Map<string, TreeNode>()
  const roots: TreeNode[] = []

  // First pass: create nodes with children array
  departments.forEach((dept) => {
    map.set(dept.id, { ...dept, children: [] })
  })

  // Second pass: link parent-child
  departments.forEach((dept) => {
    const node = map.get(dept.id)!
    if (dept.parent_id && map.has(dept.parent_id)) {
      map.get(dept.parent_id)!.children.push(node)
    } else if (!dept.parent_id) {
      roots.push(node)
    }
  })

  // Sort children by sort_order
  function sortChildren(nodes: TreeNode[]) {
    nodes.sort((a, b) => a.sort_order - b.sort_order)
    nodes.forEach((n) => sortChildren(n.children))
  }
  sortChildren(roots)

  return roots
}

// Count total descendants
function countDescendants(node: TreeNode): number {
  let count = node.children.length
  node.children.forEach((child) => {
    count += countDescendants(child)
  })
  return count
}

// Tree Node Component
function OrgTreeNode({
  node,
  level = 0,
  onEdit,
  onDelete,
  allDepartments,
}: {
  node: TreeNode
  level?: number
  onEdit: (dept: Department) => void
  onDelete: (id: string, name: string) => void
  allDepartments: Department[]
}) {
  const [expanded, setExpanded] = useState(level < 2)
  const hasChildren = node.children.length > 0
  const childCount = countDescendants(node)
  const isCompany = level === 0

  return (
    <div>
      <div
        className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent ${level > 0 ? "ml-6" : ""}`}
      >
        <button
          className="flex items-center gap-2 flex-1 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          {hasChildren ? (
            <ChevronRight
              className={`size-4 text-muted-foreground transition-transform shrink-0 ${expanded ? "rotate-90" : ""}`}
            />
          ) : (
            <div className="size-4 shrink-0" />
          )}
          {isCompany ? (
            <Building className="size-4 text-primary shrink-0" />
          ) : (
            <FolderTree className="size-4 text-primary/70 shrink-0" />
          )}
          <span
            className={`text-sm ${isCompany ? "font-bold text-foreground" : "font-medium text-foreground"} cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation()
              onEdit(node)
            }}
          >
            {node.name}
          </span>
          {node.code && (
            <span
              className="text-[11px] text-muted-foreground font-mono cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(node)
              }}
            >
              {node.code}
            </span>
          )}
          {node.manager && (
            <Badge
              variant="outline"
              className="text-[10px] h-5 ml-1 font-normal cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(node)
              }}
            >
              {node.manager}
            </Badge>
          )}
          {hasChildren && (
            <span className="text-[11px] text-muted-foreground">
              ({childCount} 个子部门)
            </span>
          )}
        </button>
        <div className="flex items-center gap-2 shrink-0">
          {node.headcount > 0 && (
            <span className="text-xs text-muted-foreground">
              编制 {node.headcount} 人
            </span>
          )}
          <Badge
            variant="outline"
            className={`text-[10px] h-5 ${node.status === "启用" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}`}
          >
            {node.status}
          </Badge>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="size-7" onClick={() => onEdit(node)}>
              <Edit className="size-3" />
            </Button>
            {!isCompany && (
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-destructive"
                onClick={() => onDelete(node.id, node.name)}
              >
                <Trash2 className="size-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
      {expanded && hasChildren && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <OrgTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              allDepartments={allDepartments}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Add/Edit Department Dialog
function DepartmentDialog({
  open,
  onOpenChange,
  departments,
  editingDept,
  onSave,
  saving,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  departments: Department[]
  editingDept: Department | null
  onSave: (data: Record<string, unknown>) => void
  saving: boolean
}) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [parentId, setParentId] = useState<string>("")
  const [manager, setManager] = useState("")
  const [headcount, setHeadcount] = useState("")

  const handleOpenChange = (val: boolean) => {
    onOpenChange(val)
  }

  useEffect(() => {
    if (!open) return
    if (editingDept) {
      setName(editingDept.name)
      setCode(editingDept.code || "")
      setParentId(editingDept.parent_id || "none")
      setManager(editingDept.manager || "")
      setHeadcount(String(editingDept.headcount || 0))
      return
    }
    setName("")
    setCode("")
    setParentId("none")
    setManager("")
    setHeadcount("0")
  }, [open, editingDept])

  const handleSubmit = () => {
    const parentDept = departments.find((d) => d.id === parentId)
    const newLevel = parentDept ? parentDept.level + 1 : 0

    onSave({
      ...(editingDept ? { id: editingDept.id } : {}),
      name,
      code: code || null,
      parent_id: parentId || null,
      manager: manager || null,
      headcount: parseInt(headcount) || 0,
      level: newLevel,
      sort_order: editingDept?.sort_order || 0,
      status: editingDept?.status || "启用",
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingDept ? "编辑部门" : "新增部门"}</DialogTitle>
          <DialogDescription>
            {editingDept ? "修改部门信息" : "填写部门信息以创建新部门"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>部门名称 *</Label>
            <Input
              placeholder="请输入部门名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>部门编码</Label>
            <Input
              placeholder="如: TECH-FE"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>上级部门</Label>
            <Select value={parentId} onValueChange={setParentId}>
              <SelectTrigger>
                <SelectValue placeholder="选择上级部门（顶级则留空）" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">无（顶级部门）</SelectItem>
                {departments
                  .filter((d) => d.id !== editingDept?.id)
                  .map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {"　".repeat(d.level)}{d.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>部门负责人</Label>
              <Input
                placeholder="请输入负责人"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>编制人数</Label>
              <Input
                type="number"
                placeholder="0"
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || saving}>
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            {editingDept ? "保存修改" : "确认创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Organization Module
export function OrganizationModule() {
  const { data: departments = [], error, isLoading, mutate } = useSWR<Department[]>("/api/departments", fetcher)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDept, setEditingDept] = useState<Department | null>(null)
  const [saving, setSaving] = useState(false)

  // Build tree
  const tree = useMemo(() => buildTree(departments), [departments])

  // Filtered list for table view
  const filteredDepts = useMemo(() => {
    if (!search) return departments.filter((d) => d.level > 0) // exclude root for table
    return departments.filter(
      (d) =>
        d.name.includes(search) ||
        (d.manager && d.manager.includes(search)) ||
        (d.code && d.code.includes(search))
    )
  }, [departments, search])

  // Stats
  const stats = useMemo(() => {
    const level1 = departments.filter((d) => d.level === 1)
    const level2 = departments.filter((d) => d.level === 2)
    const totalHeadcount = departments.reduce((sum, d) => sum + d.headcount, 0)
    return {
      total: departments.length,
      level1: level1.length,
      level2: level2.length,
      totalHeadcount,
    }
  }, [departments])

  // CRUD handlers
  const handleSave = useCallback(
    async (data: Record<string, unknown>) => {
      setSaving(true)
      try {
        const isEdit = !!data.id
        // Fix: if parent_id is "none", set to null
        if (data.parent_id === "none") data.parent_id = null
        const res = await fetch("/api/departments", {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (res.ok) {
          mutate()
          setDialogOpen(false)
          setEditingDept(null)
        }
      } finally {
        setSaving(false)
      }
    },
    [mutate]
  )

  const handleEdit = useCallback((dept: Department) => {
    setEditingDept(dept)
    setDialogOpen(true)
  }, [])

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      if (!confirm(`确定删除「${name}」？此操作不可撤销，且子部门的上级关系会被置空。`)) return
      await fetch(`/api/departments?id=${id}`, { method: "DELETE" })
      mutate()
    },
    [mutate]
  )

  const handleAdd = useCallback(() => {
    setEditingDept(null)
    setDialogOpen(true)
  }, [])

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-destructive font-medium">加载组织架构失败</p>
          <p className="text-sm text-muted-foreground">{error.message || "请检查网络连接和 Supabase 配置"}</p>
          <Button variant="outline" onClick={() => mutate()}>重试</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">组织架构</h1>
          <p className="text-muted-foreground text-sm mt-1">
            管理公司组织结构、部门层级和编制，数据实时同步 Supabase
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 size-4" />新增部门
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">部门总数</p>
              <p className="text-2xl font-bold text-foreground">{isLoading ? "-" : stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
              <FolderTree className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">一级部门</p>
              <p className="text-2xl font-bold text-foreground">{isLoading ? "-" : stats.level1}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-chart-3/10 text-chart-3">
              <FolderTree className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">二级部门</p>
              <p className="text-2xl font-bold text-foreground">{isLoading ? "-" : stats.level2}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-chart-4/10 text-chart-4">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">总编制</p>
              <p className="text-2xl font-bold text-foreground">{isLoading ? "-" : stats.totalHeadcount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tree">
        <TabsList>
          <TabsTrigger value="tree">
            <FolderTree className="mr-1.5 size-4" />
            组织树
          </TabsTrigger>
          <TabsTrigger value="list">
            <Building2 className="mr-1.5 size-4" />
            部门列表
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tree" className="mt-4">
          <Card>
            <CardContent className="p-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">加载中...</span>
                </div>
              ) : tree.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Building2 className="size-10 mb-3 opacity-50" />
                  <p>暂无组织数据</p>
                  <Button variant="link" className="mt-2" onClick={handleAdd}>
                    点击新增部门
                  </Button>
                </div>
              ) : (
                tree.map((node) => (
                  <OrgTreeNode
                    key={node.id}
                    node={node}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    allDepartments={departments}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索部门名称、编码或负责人..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">加载中...</span>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>部门编码</TableHead>
                      <TableHead>部门名称</TableHead>
                      <TableHead>层级</TableHead>
                      <TableHead>上级部门</TableHead>
                      <TableHead>负责人</TableHead>
                      <TableHead>编制</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDepts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          {search ? "未找到匹配部门" : "暂无部门数据"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDepts.map((dept) => {
                        const parent = departments.find((d) => d.id === dept.parent_id)
                        return (
                          <TableRow
                            key={dept.id}
                            className="cursor-pointer"
                            onClick={() => handleEdit(dept)}
                          >
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {dept.code || "-"}
                            </TableCell>
                            <TableCell className="font-medium">{dept.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-[10px]">
                                {dept.level === 1 ? "一级" : dept.level === 2 ? "二级" : `${dept.level}级`}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {parent?.name || "-"}
                            </TableCell>
                            <TableCell>{dept.manager || "-"}</TableCell>
                            <TableCell>
                              <span className="text-sm">{dept.headcount} 人</span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${dept.status === "启用" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}`}
                              >
                                {dept.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEdit(dept)
                                  }}
                                >
                                  <Edit className="size-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(dept.id, dept.name)
                                  }}
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog */}
      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        departments={departments}
        editingDept={editingDept}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  )
}

// Position Dialog
function PositionDialog({
  open,
  onOpenChange,
  departments,
  editingPosition,
  onSave,
  saving,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  departments: Department[]
  editingPosition: Position | null
  onSave: (data: Record<string, unknown>) => void
  saving: boolean
}) {
  const [name, setName] = useState("")
  const [family, setFamily] = useState("运营体系")
  const [level, setLevel] = useState("")
  const [departmentId, setDepartmentId] = useState<string>("none")
  const [headcount, setHeadcount] = useState("0")
  const [filled, setFilled] = useState("0")
  const [salary, setSalary] = useState("")
  const [status, setStatus] = useState("启用")

  useEffect(() => {
    if (!open) return
    if (editingPosition) {
      setName(editingPosition.name)
      setFamily(editingPosition.family)
      setLevel(editingPosition.level || "")
      setDepartmentId(editingPosition.department_id || "none")
      setHeadcount(String(editingPosition.headcount || 0))
      setFilled(String(editingPosition.filled || 0))
      setSalary(editingPosition.salary || "")
      setStatus(editingPosition.status || "启用")
      return
    }
    setName("")
    setFamily("运营体系")
    setLevel("")
    setDepartmentId("none")
    setHeadcount("0")
    setFilled("0")
    setSalary("")
    setStatus("启用")
  }, [open, editingPosition])

  const codePreview = useMemo(() => getPositionCodeFromName(name) || "-", [name])

  const handleSubmit = () => {
    onSave({
      ...(editingPosition ? { id: editingPosition.id } : {}),
      name,
      family,
      level: level || null,
      department_id: departmentId === "none" ? null : departmentId,
      headcount: parseInt(headcount) || 0,
      filled: parseInt(filled) || 0,
      salary: salary || null,
      status,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingPosition ? "编辑岗位" : "新增岗位"}</DialogTitle>
          <DialogDescription>{editingPosition ? "修改岗位基本信息" : "填写岗位信息"}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>岗位名称 *</Label>
              <Input placeholder="请输入岗位名称" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>岗位编码</Label>
              <Input value={codePreview} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>所属体系</Label>
              <Select value={family} onValueChange={setFamily}>
                <SelectTrigger>
                  <SelectValue placeholder="选择体系" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="运营体系">运营体系</SelectItem>
                  <SelectItem value="市场营销体系">市场营销体系</SelectItem>
                  <SelectItem value="职能体系">职能体系</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>职级范围</Label>
              <Input placeholder="如: P5-P7" value={level} onChange={(e) => setLevel(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>所属部门</Label>
              <Select value={departmentId} onValueChange={setDepartmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="选择所属部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">无</SelectItem>
                  {departments
                    .filter((d) => d.level > 0)
                    .map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {"　".repeat(d.level)}{d.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>状态</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="启用">启用</SelectItem>
                  <SelectItem value="停用">停用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>编制人数</Label>
              <Input type="number" placeholder="0" value={headcount} onChange={(e) => setHeadcount(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>在岗人数</Label>
              <Input type="number" placeholder="0" value={filled} onChange={(e) => setFilled(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>薪资范围</Label>
            <Input placeholder="如: 18K-28K" value={salary} onChange={(e) => setSalary(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || saving}>
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            {editingPosition ? "保存修改" : "确认创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Position Detail Dialog Component
function PositionDetailDialog({
  open,
  onOpenChange,
  position,
  onSave,
  saving,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  position: Position | null
  onSave: (data: Record<string, unknown>) => void
  saving: boolean
}) {
  const [activeTab, setActiveTab] = useState("job_description")
  const [editMode, setEditMode] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState({
    job_description: "",
    probation_criteria: "",
    professional_training: "",
    job_description_files: [] as string[],
    probation_criteria_files: [] as string[],
    professional_training_files: [] as string[],
  })

  useEffect(() => {
    if (position) {
      setContent({
        job_description: position.job_description || "",
        probation_criteria: position.probation_criteria || "",
        professional_training: position.professional_training || "",
        job_description_files: position.job_description_files || [],
        probation_criteria_files: position.probation_criteria_files || [],
        professional_training_files: position.professional_training_files || [],
      })
    }
    setEditMode(false)
  }, [position, open])

  if (!position) return null

  const getFileInfo = (url: string) => {
    const name = decodeURIComponent(url.split('/').pop()?.split('-').slice(1).join('-') || '未知文件')
    const ext = name.split('.').pop()?.toLowerCase() || ''
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return { icon: <FileImage className="size-4" />, color: 'text-blue-500', bgColor: 'bg-blue-50', isImage: true, name }
    }
    if (['pdf'].includes(ext)) {
      return { icon: <FileText className="size-4" />, color: 'text-red-500', bgColor: 'bg-red-50', isImage: false, name }
    }
    if (['doc', 'docx'].includes(ext)) {
      return { icon: <FileText className="size-4" />, color: 'text-blue-600', bgColor: 'bg-blue-50', isImage: false, name }
    }
    if (['xls', 'xlsx'].includes(ext)) {
      return { icon: <FileBarChart className="size-4" />, color: 'text-green-600', bgColor: 'bg-green-50', isImage: false, name }
    }
    if (['zip', 'rar', '7z'].includes(ext)) {
      return { icon: <FileArchive className="size-4" />, color: 'text-orange-500', bgColor: 'bg-orange-50', isImage: false, name }
    }
    return { icon: <File className="size-4" />, color: 'text-gray-500', bgColor: 'bg-gray-50', isImage: false, name }
  }

  const handleSave = () => {
    onSave({
      ...position,
      ...content,
    })
    setEditMode(false)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, tab: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(tab)
    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `Files/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('positions') // 假设存储桶名为 positions
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('positions')
        .getPublicUrl(filePath)

      // 3. Update State
      setContent(prev => ({
        ...prev,
        [`${tab}_files`]: [...(prev[`${tab}_files` as keyof typeof prev] as string[]), publicUrl]
      }))
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('文件上传失败，请确保 Storage 中已创建名为 "positions" 的存储桶')
    } finally {
      setUploading(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeFile = (tab: string, index: number) => {
    setContent(prev => ({
      ...prev,
      [`${tab}_files`]: (prev[`${tab}_files` as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const renderContent = (type: "job_description" | "probation_criteria" | "professional_training") => {
    const icons = {
      job_description: <FileText className="size-5 text-primary" />,
      probation_criteria: <ClipboardCheck className="size-5 text-success" />,
      professional_training: <GraduationCap className="size-5 text-warning" />,
    }
    const titles = {
      job_description: "岗位职责书",
      probation_criteria: "试用期考核",
      professional_training: "岗位专业培训",
    }

    const files = content[`${type}_files`]

    return (
      <div className="flex flex-col gap-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg text-foreground/90">
            {icons[type]}
            {titles[type]}
          </div>
          <div className="flex gap-2">
            {!editMode ? (
              <Button variant="outline" size="sm" onClick={() => setEditMode(true)} className="h-9 px-4 hover:bg-primary/5 hover:text-primary transition-all">
                <Edit className="size-4 mr-2" />
                编辑文本
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setEditMode(false)} className="h-9 px-4">
                取消编辑
              </Button>
            )}
            <Button size="sm" onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 h-9 px-6 shadow-md shadow-primary/20">
              {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
              保存全部修改
            </Button>
          </div>
        </div>

        {editMode ? (
          <Textarea
            value={content[type]}
            onChange={(e) => setContent(prev => ({ ...prev, [type]: e.target.value }))}
            placeholder={`请输入${titles[type]}详细内容...`}
            className="min-h-[300px] text-base leading-relaxed p-6 focus-visible:ring-primary/20 transition-shadow bg-background"
          />
        ) : (
          <div className="min-h-[200px] p-6 bg-muted/20 rounded-xl whitespace-pre-wrap text-base leading-relaxed text-foreground/80 border border-muted-foreground/10 shadow-sm">
            {content[type] || <span className="text-muted-foreground/60 italic">暂无详细内容</span>}
          </div>
        )}

        <div className="flex flex-col gap-4 pt-4 border-t border-muted-foreground/10">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/70 uppercase tracking-wider">
              <Upload className="size-3.5 text-muted-foreground" />
              相关附件 <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px] bg-muted-foreground/10">{files.length}</Badge>
            </h4>
            <div className="relative">
              <input
                type="file"
                id={`file-upload-${type}`}
                title="选择文件"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e, type)}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs border-dashed hover:border-primary hover:bg-primary/5 transition-all group" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading === type}
              >
                {uploading === type ? <Loader2 className="size-3 mr-1.5 animate-spin" /> : <Plus className="size-3 mr-1.5 group-hover:scale-110 transition-transform" />}
                添加附件
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {files.map((file, idx) => {
              const fileInfo = getFileInfo(file)
              return (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-card/50 backdrop-blur-sm group hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`${fileInfo.bgColor} ${fileInfo.color} p-2.5 rounded-lg shadow-inner group-hover:scale-105 transition-transform`}>
                      {fileInfo.icon}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium truncate pr-2 group-hover:text-primary transition-colors">
                        {fileInfo.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-tight">
                        {file.split('.').pop()?.toLowerCase()} File
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-primary/10 hover:text-primary" onClick={() => setPreviewUrl(file)}>
                      <FileSearch className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-primary/10 hover:text-primary" asChild>
                      <a href={file} target="_blank" rel="noreferrer" title="下载文件">
                        <Download className="size-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-destructive/10 hover:text-destructive" onClick={() => removeFile(type, idx)}>
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
            {files.length === 0 && (
              <div className="col-span-full py-8 flex flex-col items-center justify-center border border-dashed rounded-xl bg-muted/5 text-muted-foreground/40 gap-2">
                <Upload className="size-8 opacity-20" />
                <p className="text-xs italic">暂无相关附件，请点击右上角上传</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-8 pb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/10">
                    <Briefcase className="size-7" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">{position.name}</DialogTitle>
                    <div className="flex items-center gap-3 mt-1.5">
                      <Badge variant="outline" className="font-mono text-[10px] uppercase bg-background/50 border-muted-foreground/20 px-2 py-0.5">{position.code}</Badge>
                      <span className="h-3 w-[1px] bg-muted-foreground/30"></span>
                      <span className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                        <FolderTree className="size-3.5" />
                        {position.family}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2.5">
                <Badge className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors shadow-sm">
                  {position.department_name || "未分配部门"}
                </Badge>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground/80 bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-muted-foreground/10">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-primary/70" />
                    职级: <span className="text-foreground">{position.level || "未设定"}</span>
                  </div>
                  <span className="h-3 w-[1px] bg-muted-foreground/20"></span>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5 text-primary/70" />
                    薪资: <span className="text-foreground">{position.salary || "保密"}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-1 overflow-hidden bg-background">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full h-full">
              <div className="px-8 bg-muted/10">
                <TabsList className="w-full justify-start h-14 bg-transparent gap-10 p-0 border-b-0">
                  <TabsTrigger 
                    value="job_description" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-semibold text-sm transition-all relative data-[state=active]:text-primary"
                  >
                    岗位职责书
                  </TabsTrigger>
                  <TabsTrigger 
                    value="probation_criteria" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-semibold text-sm transition-all relative data-[state=active]:text-primary"
                  >
                    试用期考核
                  </TabsTrigger>
                  <TabsTrigger 
                    value="professional_training" 
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-semibold text-sm transition-all relative data-[state=active]:text-primary"
                  >
                    岗位专业培训
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <ScrollArea className="flex-1 bg-gradient-to-b from-muted/5 to-background">
                <div className="px-8 py-6 pb-12">
                  <TabsContent value="job_description" className="mt-0 focus-visible:outline-none">
                    {renderContent("job_description")}
                  </TabsContent>
                  <TabsContent value="probation_criteria" className="mt-0 focus-visible:outline-none">
                    {renderContent("probation_criteria")}
                  </TabsContent>
                  <TabsContent value="professional_training" className="mt-0 focus-visible:outline-none">
                    {renderContent("professional_training")}
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={(open) => !open && setPreviewUrl(null)}>
        <DialogContent className="sm:max-w-[95vw] sm:w-[1400px] h-[95vh] p-0 flex flex-col overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-4 border-b bg-muted/10 flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                {previewUrl && getFileInfo(previewUrl).icon}
              </div>
              <DialogTitle className="text-sm font-medium truncate max-w-[400px]">
                预览: {previewUrl && getFileInfo(previewUrl).name}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2 pr-8">
              <Button variant="outline" size="sm" className="h-8 gap-1.5" asChild>
                <a href={previewUrl || '#'} target="_blank" rel="noreferrer" title="下载原文件">
                  <Download className="size-3.5" />
                  下载原文件
                </a>
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 bg-muted/20 relative overflow-hidden flex items-center justify-center p-4">
            {previewUrl && (
              <>
                {getFileInfo(previewUrl).isImage ? (
                  <div className="relative group flex items-center justify-center w-full h-full">
                    <img 
                      src={previewUrl} 
                      alt="预览图片" 
                      className="max-w-full max-h-full object-contain shadow-xl rounded-lg bg-white" 
                    />
                  </div>
                ) : previewUrl.toLowerCase().endsWith('.pdf') ? (
                  <iframe 
                    src={`${previewUrl}#toolbar=0`} 
                    className="w-full h-full border-none bg-white rounded-lg shadow-lg" 
                    title="PDF预览"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6 p-12 text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white max-w-md">
                    <div className="p-6 bg-primary/5 rounded-full ring-8 ring-primary/5">
                      {getFileInfo(previewUrl).icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl text-foreground">暂不支持在线预览</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed px-4">
                        此文件类型 ({previewUrl.split('.').pop()?.toUpperCase()}) 暂未开启在线预览，请下载后使用本地应用查看。
                      </p>
                    </div>
                    <Button asChild className="px-8 shadow-lg shadow-primary/20">
                      <a href={previewUrl} target="_blank" rel="noreferrer" title="立即下载">
                        立即下载
                      </a>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Position Management
export function PositionModule() {
  const { data: positions = [], error, isLoading, mutate } = useSWR<Position[]>("/api/positions", fetcher)
  const { data: departments = [] } = useSWR<Department[]>("/api/departments", fetcher)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editingPosition, setEditingPosition] = useState<Position | null>(null)
  const [viewingPosition, setViewingPosition] = useState<Position | null>(null)
  const [saving, setSaving] = useState(false)

  const filteredPositions = useMemo(() => {
    if (!search) return positions
    return positions.filter(
      (p) =>
        p.name.includes(search) ||
        (p.code && p.code.includes(search)) ||
        p.family.includes(search) ||
        (p.department_name && p.department_name.includes(search))
    )
  }, [positions, search])

  const handleSave = useCallback(
    async (data: Record<string, unknown>) => {
      setSaving(true)
      try {
        const isEdit = !!data.id
        const res = await fetch("/api/positions", {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (res.ok) {
          mutate()
          setDialogOpen(false)
          setDetailOpen(false)
          setEditingPosition(null)
          setViewingPosition(null)
        }
      } finally {
        setSaving(false)
      }
    },
    [mutate]
  )

  const handleEdit = useCallback((pos: Position) => {
    setEditingPosition(pos)
    setDialogOpen(true)
  }, [])

  const handleViewDetail = useCallback((pos: Position) => {
    setViewingPosition(pos)
    setDetailOpen(true)
  }, [])

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      if (!confirm(`确定删除「${name}」？此操作不可撤销。`)) return
      await fetch(`/api/positions?id=${id}`, { method: "DELETE" })
      mutate()
    },
    [mutate]
  )

  const handleAdd = useCallback(() => {
    setEditingPosition(null)
    setDialogOpen(true)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">岗位管理</h1>
          <p className="text-muted-foreground text-sm mt-1">
            管理岗位体系、职级序列和岗位编制，支持按运营、市场营销和职能体系分类
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 size-4" />
          新增岗位
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">岗位总数</p>
              <p className="text-2xl font-bold text-foreground">{isLoading ? "-" : positions.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">总编制</p>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? "-" : positions.reduce((sum, p) => sum + p.headcount, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">缺编人数</p>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? "-" : positions.reduce((sum, p) => sum + (p.headcount - p.filled), 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="搜索岗位名称、编码、体系或部门..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-sm text-destructive">加载岗位数据失败，请检查 Supabase 配置</div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">加载中...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>岗位编码</TableHead>
                  <TableHead>岗位名称</TableHead>
                  <TableHead>所属体系</TableHead>
                  <TableHead>职级范围</TableHead>
                  <TableHead>部门</TableHead>
                  <TableHead>在岗 / 编制</TableHead>
                  <TableHead>薪资范围</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {search ? "未找到匹配岗位" : "暂无岗位数据"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPositions.map((pos) => (
                    <TableRow key={pos.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{pos.code || "-"}</TableCell>
                      <TableCell className="font-medium">{pos.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {pos.family}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{pos.level}</TableCell>
                      <TableCell className="text-sm">{pos.department_name || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {pos.filled} / {pos.headcount}
                          </span>
                          <Progress
                            value={pos.headcount ? (pos.filled / pos.headcount) * 100 : 0}
                            className="h-1.5 w-16"
                          />
                          {pos.filled < pos.headcount && (
                            <Badge
                              variant="outline"
                              className="text-[10px] h-5 bg-warning/10 text-warning border-warning/20"
                            >
                              缺{pos.headcount - pos.filled}人
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{pos.salary}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-primary"
                            onClick={() => handleViewDetail(pos)}
                            title="查看详情"
                          >
                            <Eye className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => handleEdit(pos)}
                          >
                            <Edit className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive"
                            onClick={() => handleDelete(pos.id, pos.name)}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <PositionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        departments={departments}
        editingPosition={editingPosition}
        onSave={handleSave}
        saving={saving}
      />

      <PositionDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        position={viewingPosition}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  )
}
