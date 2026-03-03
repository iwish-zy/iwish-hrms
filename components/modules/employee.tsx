"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Plus, Download, Eye, Edit, Filter, User, Users, FileText, Upload, Briefcase, GraduationCap, CreditCard, Phone, Cake, FileSearch, ShieldCheck, History, Award, BookOpen, ChevronRight, Loader2, FolderOpen, Clock, Trash2 } from "lucide-react"
import { useState, useMemo, useRef } from "react"
import useSWR from "swr"
import { supabase } from "@/lib/supabase"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// Types
interface Employee {
  id: string
  employee_id: string
  name: string
  gender: string
  birthday: string | null
  id_card: string | null
  phone: string | null
  email: string | null
  education_level: string | null
  school: string | null
  major: string | null
  department_id: string | null
  department_name?: string
  position_id: string | null
  position_name?: string
  level: string | null
  join_date: string | null
  status: string
  bank_account: string | null
  bank_name: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  address: string | null
  avatar_url: string | null
  created_at: string
}

interface Contract {
  id: string
  employee_id: string
  contract_type: string
  start_date: string
  end_date: string
  probation_months: number
  renew_count: number
  status: string
  file_url: string | null
  file_name?: string | null
}

interface ArchiveFile {
  id: string
  employee_id: string
  category: string
  file_name: string
  file_url: string
  file_type: string
  created_at: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const statusColors: Record<string, string> = {
  "在职": "bg-success/10 text-success border-success/20",
  "试用期": "bg-warning/10 text-warning border-warning/20",
  "离职": "bg-destructive/10 text-destructive border-destructive/20",
}

export function EmployeeModule() {
  const { data: employees = [], mutate } = useSWR<Employee[]>("/api/employees", fetcher)
  const { data: departments = [] } = useSWR("/api/departments", fetcher)
  const { data: positions = [] } = useSWR("/api/positions", fetcher)
  
  const departmentTree = useMemo(() => {
    const buildTree = (parentId: string | null = null, level = 0): any[] => {
      return departments
        .filter((d: any) => d.parent_id === parentId)
        .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
        .map((d: any) => ({
          ...d,
          level,
          children: buildTree(d.id, level + 1),
        }))
    }
    return buildTree(null)
  }, [departments])

  const flattenDeptTree = (nodes: any[]): any[] => {
    let result: any[] = []
    nodes.forEach(node => {
      result.push(node)
      if (node.children && node.children.length > 0) {
        result = [...result, ...flattenDeptTree(node.children)]
      }
    })
    return result
  }

  const flatDepts = useMemo(() => flattenDeptTree(departmentTree), [departmentTree])
  
  const EmployeeForm = ({ type }: { type: 'add' | 'edit' }) => (
    <ScrollArea className="flex-1 bg-background min-h-0 overflow-y-scroll">
      <div className="p-8 space-y-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/70 uppercase tracking-wider">
              <ShieldCheck className="size-4 text-primary" />
              基本信息
            </h4>
            <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-muted-foreground/10 ">
              <div className="space-y-2">
                <Label>工号 <span className="text-destructive font-bold">*</span></Label>
                <Input 
                  placeholder="EMP-2026-001" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.employee_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, employee_id: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>姓名 <span className="text-destructive font-bold">*</span></Label>
                <Input 
                  placeholder="请输入真实姓名" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>性别 <span className="text-destructive font-bold">*</span></Label>
                  <Select 
                    value={formData.gender}
                    onValueChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
                  >
                    <SelectTrigger className="bg-background border-none shadow-sm focus:ring-primary/20"><SelectValue placeholder="选择性别" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">男</SelectItem>
                      <SelectItem value="female">女</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>生日 <span className="text-destructive font-bold">*</span></Label>
                  <Input 
                    type="date" 
                    className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                    value={formData.birthday}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>手机号 <span className="text-destructive font-bold">*</span></Label>
                <Input 
                  placeholder="请输入11位手机号" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>身份证号 <span className="text-destructive font-bold">*</span></Label>
                <Input 
                  placeholder="18位身份证号" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.id_card}
                  onChange={(e) => setFormData(prev => ({ ...prev, id_card: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>员工状态 <span className="text-destructive font-bold">*</span></Label>
                <Select 
                  value={formData.status}
                  onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
                >
                  <SelectTrigger className="bg-background border-none shadow-sm focus:ring-primary/20"><SelectValue placeholder="选择状态" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="在职">在职</SelectItem>
                    <SelectItem value="试用期">试用期</SelectItem>
                    <SelectItem value="离职">离职</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Academic Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/70 uppercase tracking-wider">
              <GraduationCap className="size-4 text-primary" />
              学历与证照
            </h4>
            <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-muted-foreground/10 ">
              <div className="space-y-2">
                <Label>最高学历</Label>
                <Select
                  value={formData.education_level}
                  onValueChange={(val) => setFormData(prev => ({ ...prev, education_level: val }))}
                >
                  <SelectTrigger className="bg-background border-none shadow-sm focus:ring-primary/20"><SelectValue placeholder="选择学历" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">博士</SelectItem>
                    <SelectItem value="master">硕士</SelectItem>
                    <SelectItem value="bachelor">本科</SelectItem>
                    <SelectItem value="college">大专</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>毕业院校</Label>
                <Input 
                  placeholder="请输入院校名称" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.school}
                  onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>专业</Label>
                <Input 
                  placeholder="请输入专业" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                />
              </div>
              <div className="pt-2">
                <Label className="text-xs text-muted-foreground text-center block">入职后需在档案中心上传证书扫描件</Label>
                <div className="mt-2 border-2 border-dashed border-muted-foreground/10 rounded-xl p-6 text-center bg-background/50">
                  <FileSearch className="size-6 mx-auto text-muted-foreground/20" />
                  <span className="text-[10px] text-muted-foreground/60 mt-2 block">证书/报告后期维护</span>
                </div>
              </div>
            </div>
          </div>

          {/* Work Info Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/70 uppercase tracking-wider">
              <Briefcase className="size-4 text-primary" />
              岗位与薪资
            </h4>
            <div className="space-y-4 bg-muted/20 p-5 rounded-2xl border border-muted-foreground/10 ">
              <div className="space-y-2">
                <Label>入职部门 <span className="text-destructive font-bold">*</span></Label>
                <Select
                  value={formData.department_id}
                  onValueChange={(val) => setFormData(prev => ({ ...prev, department_id: val }))}
                >
                  <SelectTrigger className="bg-background border-none shadow-sm focus:ring-primary/20">
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    {flatDepts.map((d: any) => (
                      <SelectItem key={d.id} value={d.id}>
                        <span style={{ paddingLeft: `${d.level * 12}px` }} className="flex items-center gap-2">
                          {d.level > 0 && <ChevronRight className="size-3 opacity-50" />}
                          {d.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>关联岗位 <span className="text-destructive font-bold">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-background border-none shadow-sm hover:bg-background/80 font-normal">
                      {formData.position_id ? (
                        positions.find((p: any) => p.id === formData.position_id)?.name || "选择岗位"
                      ) : "选择岗位"}
                      <Search className="size-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0 overflow-hidden" align="start">
                    <div className="p-4 border-b bg-muted/20">
                      <h4 className="text-sm font-bold mb-2">选择岗位</h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input 
                          placeholder="搜索岗位或部门..." 
                          className="pl-9 bg-background border-none shadow-inner" 
                          value={posSearch}
                          onChange={(e) => setPosSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <ScrollArea className="h-[300px]">
                      <div className="p-2 space-y-1">
                        {filteredPositions.map((p: any) => (
                          <Button
                            key={p.id}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto py-3 px-4 rounded-xl flex flex-col items-start gap-1"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, position_id: p.id }))
                            }}
                          >
                            <span className="font-semibold text-sm">{p.name}</span>
                            <span className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              {p.department_name || "未知部门"}
                            </span>
                          </Button>
                        ))}
                        {filteredPositions.length === 0 && (
                          <div className="p-8 text-center text-sm text-muted-foreground italic">
                            未找到相关岗位
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>职级</Label>
                  <Input 
                    placeholder="P6/M2..." 
                    className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>入职日期</Label>
                  <Input 
                    type="date" 
                    className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                    value={formData.join_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, join_date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>银行卡号 (发薪)</Label>
                <Input 
                  placeholder="输入银行卡号" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.bank_account}
                  onChange={(e) => setFormData(prev => ({ ...prev, bank_account: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>开户行</Label>
                <Input 
                  placeholder="例如：招商银行北京分行" 
                  className="bg-background border-none shadow-sm focus-visible:ring-primary/20" 
                  value={formData.bank_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, bank_name: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contract Section placeholder - in real app would create a contract too */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/70 uppercase tracking-wider">
              <FileText className="size-4 text-primary" />
              劳动合同
            </h4>
            <div className="grid grid-cols-2 gap-6 bg-muted/20 p-5 rounded-2xl border border-muted-foreground/10 ">
              <div className="space-y-4 text-center col-span-2 py-4">
                <p className="text-sm text-muted-foreground">员工入职后，请前往“员工档案”上传签署后的合同文件。</p>
              </div>
            </div>
          </div>

          {/* Emergency Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/70 uppercase tracking-wider">
              <Phone className="size-4 text-primary" />
              紧急联系人
            </h4>
            <div className="grid grid-cols-2 gap-6 bg-muted/20 p-5 rounded-2xl border border-muted-foreground/10">
              <div className="space-y-2">
                <Label>联系人姓名</Label>
                <Input 
                  placeholder="输入姓名" 
                  className="bg-background border-none shadow-sm" 
                  value={formData.emergency_contact_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>联系人电话</Label>
                <Input 
                  placeholder="输入电话" 
                  className="bg-background border-none shadow-sm" 
                  value={formData.emergency_contact_phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [contractSearch, setContractSearch] = useState("")
  const [archiveSearch, setArchiveSearch] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [activeArchiveTab, setActiveArchiveTab] = useState("basic")
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contractFileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingCategory, setUploadingCategory] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    return employees.filter((e: Employee) => {
      const matchesSearch = 
        e.name.includes(search) || 
        e.employee_id.includes(search) || 
        (e.department_name && e.department_name.includes(search)) || 
        (e.position_name && e.position_name.includes(search))
      const matchesStatus = statusFilter === "all" || e.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [employees, search, statusFilter])

  // Add Employee Form State
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    gender: "male",
    birthday: "",
    id_card: "",
    phone: "",
    email: "",
    education_level: "bachelor",
    school: "",
    major: "",
    department_id: "",
    position_id: "",
    level: "",
    join_date: new Date().toISOString().split('T')[0],
    status: "试用期",
    bank_account: "",
    bank_name: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    address: ""
  })

  const { data: allContracts = [], mutate: mutateAllContracts } = useSWR<any[]>("/api/employee-contracts", fetcher)
  const { data: allArchives = [], mutate: mutateAllArchives } = useSWR<any[]>("/api/employee-archives", fetcher)

  const filteredContracts = useMemo(() => {
    return allContracts.filter((c: any) => {
      const name = c.employees?.name || ""
      const empId = c.employees?.employee_id || ""
      return name.includes(contractSearch) || empId.includes(contractSearch)
    })
  }, [allContracts, contractSearch])

  const filteredArchives = useMemo(() => {
    return allArchives.filter((a: any) => {
      const name = a.employees?.name || ""
      const empId = a.employees?.employee_id || ""
      const fileName = a.file_name || ""
      return name.includes(archiveSearch) || empId.includes(archiveSearch) || fileName.includes(archiveSearch)
    })
  }, [allArchives, archiveSearch])

  const { data: archives = [], mutate: mutateArchives } = useSWR<ArchiveFile[]>(
    selectedEmployee ? `/api/employee-archives?employee_id=${selectedEmployee.id}` : null,
    fetcher
  )

  const { data: contracts = [], mutate: mutateContract } = useSWR<Contract[]>(
    selectedEmployee ? `/api/employee-contracts?employee_id=${selectedEmployee.id}` : null,
    fetcher
  )
  const contract = contracts?.[0] || null

  const [posSearch, setPosSearch] = useState("")
  const filteredPositions = useMemo(() => {
    return positions.filter((p: any) => 
      p.name.toLowerCase().includes(posSearch.toLowerCase()) || 
      (p.department_name && p.department_name.toLowerCase().includes(posSearch.toLowerCase()))
    )
  }, [positions, posSearch])

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [isContractEditOpen, setIsContractEditOpen] = useState(false)
  const [contractSaving, setContractSaving] = useState(false)
  const [contractForm, setContractForm] = useState({
    id: "",
    employee_id: "",
    contract_type: "劳动合同",
    start_date: "",
    end_date: "",
    probation_months: 0,
    renew_count: 0,
    status: "生效中",
    file_url: "",
    file_name: "",
  })

  const educationLabelMap: Record<string, string> = {
    doctor: "博士",
    master: "硕士",
    bachelor: "本科",
    college: "大专",
    other: "其他",
  }
  const getEducationLabel = (val?: string | null) => educationLabelMap[val || ""] || "未录入"

  const handleDeleteEmployee = async (id: string) => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/employees?id=${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete employee")
      await mutate()
    } catch (error) {
      console.error(error)
      alert("删除失败")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleAddEmployee = async () => {
    if (!formData.name || !formData.employee_id || !formData.department_id || !formData.position_id) {
      alert("请填写必填项")
      return
    }

    setSaving(true)
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to add employee")
      
      await mutate()
      setIsAddOpen(false)
      // Reset form
      setFormData({
        employee_id: "",
        name: "",
        gender: "male",
        birthday: "",
        id_card: "",
        phone: "",
        email: "",
        education_level: "bachelor",
        school: "",
        major: "",
        department_id: "",
        position_id: "",
        level: "",
        join_date: new Date().toISOString().split('T')[0],
        status: "试用期",
        bank_account: "",
        bank_name: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        address: ""
      })
    } catch (error) {
      console.error(error)
      alert("添加失败")
    } finally {
      setSaving(false)
    }
  }

  const handleEditEmployee = async () => {
    if (!formData.name || !formData.employee_id || !formData.department_id || !formData.position_id) {
      alert("请填写必填项")
      return
    }

    setSaving(true)
    try {
      const res = await fetch("/api/employees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: selectedEmployee?.id }),
      })
      if (!res.ok) throw new Error("Failed to update employee")
      
      await mutate()
      setIsEditOpen(false)
    } catch (error) {
      console.error(error)
      alert("更新失败")
    } finally {
      setSaving(false)
    }
  }

  const handleOpenEdit = (emp: Employee) => {
    setSelectedEmployee(emp)
    setFormData({
      employee_id: emp.employee_id,
      name: emp.name,
      gender: emp.gender,
      birthday: emp.birthday || "",
      id_card: emp.id_card || "",
      phone: emp.phone || "",
      email: emp.email || "",
      education_level: emp.education_level || "bachelor",
      school: emp.school || "",
      major: emp.major || "",
      department_id: emp.department_id || "",
      position_id: emp.position_id || "",
      level: emp.level || "",
      join_date: emp.join_date || "",
      status: emp.status,
      bank_account: emp.bank_account || "",
      bank_name: emp.bank_name || "",
      emergency_contact_name: emp.emergency_contact_name || "",
      emergency_contact_phone: emp.emergency_contact_phone || "",
      address: emp.address || ""
    })
    setIsEditOpen(true)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const file = e.target.files?.[0]
    if (!file || !selectedEmployee) return

    setUploadingCategory(category)
    try {
      const categoryMap: Record<string, string> = {
        "入职档案": "onboarding",
        "签署协议": "contracts",
        "异动文件": "personnel-changes",
        "奖惩记录": "rewards-punishments",
        "培训记录": "training",
        "其他": "others",
      }
      const englishCategory = categoryMap[category] || "others"

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      // 确保工号不包含特殊字符，避免路径解析错误
      const safeEmployeeId = selectedEmployee.employee_id.replace(/[^a-zA-Z0-9-]/g, '_')
      const filePath = `employees/${safeEmployeeId}/${englishCategory}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('employee-docs')
        .upload(filePath, file, {
          upsert: true // 如果文件已存在则覆盖
        })

      if (uploadError) {
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('存储桶 "employee-docs" 未找到，请在 Supabase 控制台创建。')
        }
        if (uploadError.message.includes('row-level security')) {
          throw new Error('权限不足：请在 Supabase Storage 中为 "employee-docs" 桶添加 INSERT 策略。')
        }
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('employee-docs')
        .getPublicUrl(filePath)

      await fetch("/api/employee-archives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_id: selectedEmployee.id,
          category,
          file_name: file.name,
          file_url: publicUrl,
          file_type: fileExt
        }),
      })

      if (category === "签署协议") {
        const existingContract = contracts?.[0]
        if (existingContract) {
          await fetch("/api/employee-contracts", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: existingContract.id,
              employee_id: selectedEmployee.id,
              contract_type: existingContract.contract_type || "劳动合同",
              start_date: existingContract.start_date,
              end_date: existingContract.end_date,
              probation_months: existingContract.probation_months ?? 0,
              renew_count: existingContract.renew_count ?? 0,
              status: existingContract.status || "生效中",
              file_url: publicUrl,
              file_name: file.name,
            }),
          })
        } else {
          await fetch("/api/employee-contracts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              employee_id: selectedEmployee.id,
              contract_type: "劳动合同",
              start_date: selectedEmployee.join_date || new Date().toISOString().split('T')[0],
              end_date: null,
              probation_months: 0,
              renew_count: 0,
              status: "生效中",
              file_url: publicUrl,
              file_name: file.name,
            }),
          })
        }
      }
      
      await mutateArchives()
      await mutateContract?.()
      await mutateAllContracts?.()
    } catch (error) {
      console.error('Error uploading:', error)
      alert('文件上传失败')
    } finally {
      setUploadingCategory(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (contractFileInputRef.current) contractFileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">员工档案中心</h1>
          <p className="text-muted-foreground text-sm mt-1">
            结构化员工全生命周期档案，支持电子合同、资质证照、异动记录及福利关怀（生日提醒）的一体化管理。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-4">
            <Upload className="mr-2 size-4 text-primary" />
            批量导入
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-4">
            <Download className="mr-2 size-4 text-primary" />
            导出Excel
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 px-4 bg-primary shadow-lg shadow-primary/20">
                <Plus className="mr-2 size-4" />
                新增员工
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] sm:w-[1200px] max-h-[90vh] p-0 flex flex-col overflow-hidden border-none shadow-2xl">
              <DialogHeader className="p-8 pb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-lg shadow-primary/20">
                    <User className="size-7" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold tracking-tight">员工入职登记</DialogTitle>
                    <DialogDescription className="text-sm mt-1">填写员工入职信息，提交后将自动触发入职流程（IT/行政/HR任务清单）</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <EmployeeForm type="add" />
              <DialogFooter className="p-6 bg-muted/20 border-t flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground italic flex-1">注：系统将根据生日自动关联员工关怀，提前30天提醒合同续签。</p>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setIsAddOpen(false)} className="h-10 px-6">取消</Button>
                  <Button 
                    onClick={handleAddEmployee}
                    disabled={saving}
                    className="h-10 px-8 bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                  >
                    {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
                    确认提交并入档
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-[90vw] sm:w-[1200px] max-h-[90vh] p-0 flex flex-col overflow-hidden border-none shadow-2xl">
              <DialogHeader className="p-8 pb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-lg shadow-primary/20">
                    <Edit className="size-7" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold tracking-tight">编辑员工档案</DialogTitle>
                    <DialogDescription className="text-sm mt-1">修改员工核心档案信息，系统将记录本次变更日志</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <EmployeeForm type="edit" />
              <DialogFooter className="p-6 bg-muted/20 border-t flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground italic flex-1">注：修改敏感信息（如银行卡、薪资）可能需要二次审批。</p>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="h-10 px-6">取消</Button>
                  <Button 
                    onClick={handleEditEmployee}
                    disabled={saving}
                    className="h-10 px-8 bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                  >
                    {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
                    保存变更
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        {[
          { 
            label: "在职员工", 
            value: employees.filter((e: Employee) => e.status === "在职").length, 
            icon: <Users className="size-5" />, 
            color: "bg-success/10 text-success border-success/20" 
          },
          { 
            label: "试用期", 
            value: employees.filter((e: Employee) => e.status === "试用期").length, 
            icon: <Clock className="size-5" />, 
            color: "bg-warning/10 text-warning border-warning/20" 
          },
          { 
            label: "本月待转正", 
            value: employees.filter((e: Employee) => {
              if (e.status !== "试用期" || !e.join_date) return false
              const joinDate = new Date(e.join_date)
              const now = new Date()
              // Assume 3 months probation for this stat calculation
              const probationEnd = new Date(joinDate.setMonth(joinDate.getMonth() + 3))
              return probationEnd.getMonth() === now.getMonth() && probationEnd.getFullYear() === now.getFullYear()
            }).length, 
            icon: <ShieldCheck className="size-5" />, 
            color: "bg-primary/10 text-primary border-primary/20" 
          },
          { 
            label: "本月生日", 
            value: employees.filter((e: Employee) => {
              if (!e.birthday) return false
              const birthday = new Date(e.birthday)
              return birthday.getMonth() === new Date().getMonth()
            }).length, 
            icon: <Cake className="size-5" />, 
            color: "bg-pink-50 text-pink-500 border-pink-100" 
          },
          { 
            label: "即将到期合同", 
            value: allContracts.filter((c: any) => {
              if (!c.end_date || c.status !== "生效中") return false
              const endDate = new Date(c.end_date)
              const now = new Date()
              const diffTime = endDate.getTime() - now.getTime()
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              return diffDays > 0 && diffDays <= 30
            }).length, 
            icon: <FileText className="size-5" />, 
            color: "bg-destructive/10 text-destructive border-destructive/20" 
          },
        ].map(s => (
          <Card key={s.label} className={`border ${s.color} shadow-sm overflow-hidden`}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-background/80 shadow-sm">{s.icon}</div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-60 leading-none mb-1.5">{s.label}</span>
                <span className="text-2xl font-black">{s.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="employees" className="mt-2">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-12 p-0 gap-8">
          <TabsTrigger value="employees" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-medium text-sm">员工花名册</TabsTrigger>
          <TabsTrigger value="contracts" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-medium text-sm">合同管理</TabsTrigger>
          <TabsTrigger value="archives" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-medium text-sm">电子档案库</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-6">
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur">
            <CardHeader className="pb-3 border-b border-muted/20">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input placeholder="搜索姓名、工号、部门、岗位..." className="pl-9 bg-background/50 border-none shadow-inner" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36 bg-background/50 border-none shadow-inner">
                    <Filter className="mr-2 size-4 text-primary/60" />
                    <SelectValue placeholder="状态筛选" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="在职">在职</SelectItem>
                    <SelectItem value="试用期">试用期</SelectItem>
                    <SelectItem value="离职">离职</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[120px] pl-6 font-bold text-xs uppercase tracking-wider">工号</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">员工信息</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">部门 / 岗位</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">职级</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">最高学历</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">入职日期</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-center">状态</TableHead>
                    <TableHead className="text-right pr-6 font-bold text-xs uppercase tracking-wider">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((emp: Employee) => (
                    <TableRow key={emp.id} className="group hover:bg-primary/[0.02] transition-colors">
                      <TableCell className="font-mono text-[11px] text-muted-foreground pl-6">{emp.employee_id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 rounded-xl shadow-sm border-2 border-background ring-1 ring-muted-foreground/10">
                            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">{emp.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{emp.name}</span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              {emp.gender === "male" ? "男" : "女"} · {emp.phone || "未录入手机"}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{emp.department_name}</span>
                          <span className="text-xs text-muted-foreground">{emp.position_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-mono py-0 h-5 bg-muted/30 border-none">{emp.level || "未定级"}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground font-medium">{emp.education_level === 'bachelor' ? '本科' : emp.education_level === 'master' ? '硕士' : emp.education_level === 'doctor' ? '博士' : '大专'}</TableCell>
                      <TableCell className="text-sm text-muted-foreground font-mono">{emp.join_date}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`text-[10px] px-2 py-0 h-5 rounded-full ${statusColors[emp.status] || ""}`}>{emp.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 rounded-lg hover:bg-primary/10 hover:text-primary" 
                            onClick={() => {
                              setSelectedEmployee(emp)
                              setIsDetailOpen(true)
                            }}
                          >
                            <FileSearch className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                            onClick={() => handleOpenEdit(emp)}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>确认删除员工？</AlertDialogTitle>
                                <AlertDialogDescription>
                                  此操作将永久删除员工 <strong>{emp.name}</strong> 的所有档案、合同及关联文件，且无法撤销。
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteEmployee(emp.id)}
                                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                                  确认删除
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-60 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
                          <FolderOpen className="size-12 opacity-20" />
                          <p className="text-sm italic font-medium">未找到符合条件的员工档案</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur">
            <CardHeader className="pb-3 border-b border-muted/20">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input 
                    placeholder="搜索员工姓名或工号..." 
                    className="pl-9 bg-background/50 border-none shadow-inner" 
                    value={contractSearch} 
                    onChange={(e) => setContractSearch(e.target.value)} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6 font-bold text-xs uppercase tracking-wider">员工</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">合同类型</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">开始日期</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">结束日期</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">试用期</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-center">状态</TableHead>
                    <TableHead className="text-right pr-6 font-bold text-xs uppercase tracking-wider">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((c: any) => (
                    <TableRow key={c.id}>
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <span className="font-semibold">{c.employees?.name}</span>
                          <span className="text-[10px] text-muted-foreground">{c.employees?.employee_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{c.contract_type}</TableCell>
                      <TableCell className="text-sm font-mono">{c.start_date}</TableCell>
                      <TableCell className="text-sm font-mono">{c.end_date || "无固定期限"}</TableCell>
                      <TableCell className="text-sm">{c.probation_months}个月</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">{c.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                                    <Button variant="ghost" size="icon" className="size-8 rounded-lg" asChild>
                                      <a href={c.file_url || "#"} target="_blank" rel="noreferrer" aria-label="预览合同" title="预览合同"><Eye className="size-4" /></a>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="size-8 rounded-lg"
                                      onClick={() => {
                                        setContractForm({
                                          id: c.id,
                                          employee_id: c.employee_id,
                                          contract_type: c.contract_type || "劳动合同",
                                          start_date: c.start_date || "",
                                          end_date: c.end_date || "",
                                          probation_months: c.probation_months ?? 0,
                                          renew_count: c.renew_count ?? 0,
                                          status: c.status || "生效中",
                                          file_url: c.file_url || "",
                                          file_name: c.file_name || "",
                                        })
                                        setIsContractEditOpen(true)
                                      }}
                                    >
                                      <Edit className="size-4" />
                                    </Button>

                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredContracts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-60 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
                          <FolderOpen className="size-12 opacity-20" />
                          <p className="text-sm italic font-medium">暂无合同数据</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <Dialog open={isContractEditOpen} onOpenChange={setIsContractEditOpen}>
          <DialogContent className="sm:max-w-[480px] p-6">
            <DialogHeader>
              <DialogTitle>编辑合同信息</DialogTitle>
              <DialogDescription>修改合同元数据并保存。</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>合同类型</Label>
                <Input value={contractForm.contract_type} onChange={(e) => setContractForm(prev => ({ ...prev, contract_type: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>开始日期</Label>
                  <Input type="date" value={contractForm.start_date || ''} onChange={(e) => setContractForm(prev => ({ ...prev, start_date: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>结束日期</Label>
                  <Input type="date" value={contractForm.end_date || ''} onChange={(e) => setContractForm(prev => ({ ...prev, end_date: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>试用期(月)</Label>
                  <Input type="number" value={contractForm.probation_months} onChange={(e) => setContractForm(prev => ({ ...prev, probation_months: Number(e.target.value) }))} />
                </div>
                <div className="space-y-2">
                  <Label>续签次数</Label>
                  <Input type="number" value={contractForm.renew_count} onChange={(e) => setContractForm(prev => ({ ...prev, renew_count: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>状态</Label>
                <Select value={contractForm.status} onValueChange={(val) => setContractForm(prev => ({ ...prev, status: val }))}>
                  <SelectTrigger className="bg-background border-none shadow-inner">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="生效中">生效中</SelectItem>
                    <SelectItem value="已过期">已过期</SelectItem>
                    <SelectItem value="已终止">已终止</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>合同文件名称</Label>
                <Input value={contractForm.file_name} onChange={(e) => setContractForm(prev => ({ ...prev, file_name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>合同文件链接</Label>
                <Input value={contractForm.file_url} onChange={(e) => setContractForm(prev => ({ ...prev, file_url: e.target.value }))} />
                {contractForm.file_url && (
                  <Button variant="link" size="sm" className="px-0" asChild>
                    <a href={contractForm.file_url} target="_blank" rel="noreferrer">预览当前文件</a>
                  </Button>
                )}
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button variant="ghost" onClick={() => setIsContractEditOpen(false)}>取消</Button>
              <Button
                onClick={async () => {
                  if (!contractForm.id) return
                  setContractSaving(true)
                  try {
                    await fetch("/api/employee-contracts", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...contractForm,
                        id: contractForm.id,
                        employee_id: contractForm.employee_id,
                      }),
                    })
                    await mutateContract?.()
                    await mutateAllContracts?.()
                    setIsContractEditOpen(false)
                  } catch (err) {
                    console.error(err)
                    alert("保存合同失败")
                  } finally {
                    setContractSaving(false)
                  }
                }}
                disabled={contractSaving}
              >
                {contractSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
                保存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <TabsContent value="archives" className="mt-6">
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur">
            <CardHeader className="pb-3 border-b border-muted/20">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input 
                    placeholder="搜索员工、文件名..." 
                    className="pl-9 bg-background/50 border-none shadow-inner" 
                    value={archiveSearch} 
                    onChange={(e) => setArchiveSearch(e.target.value)} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6 font-bold text-xs uppercase tracking-wider">员工</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">文件名</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">分类</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider">上传日期</TableHead>
                    <TableHead className="text-right pr-6 font-bold text-xs uppercase tracking-wider">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArchives.map((a: any) => (
                    <TableRow key={a.id}>
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <span className="font-semibold">{a.employees?.name}</span>
                          <span className="text-[10px] text-muted-foreground">{a.employees?.employee_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{a.file_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] bg-muted/50 border-none">{a.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm font-mono text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="size-8 rounded-lg" asChild>
                            <a href={a.file_url} target="_blank" rel="noreferrer" aria-label="预览文件" title="预览文件"><Eye className="size-4" /></a>
                          </Button>
                          <Button variant="ghost" size="icon" className="size-8 rounded-lg" asChild>
                            <a href={a.file_url} download aria-label="下载文件" title="下载文件"><Download className="size-4" /></a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredArchives.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-60 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
                          <FolderOpen className="size-12 opacity-20" />
                          <p className="text-sm italic font-medium">暂无档案文件</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Detail / Archive Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[95vw] sm:w-[1400px] h-[95vh] p-0 flex flex-col overflow-hidden border-none shadow-2xl">
          {selectedEmployee && (
            <>
              <DialogHeader className="p-8 pb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b relative">
                <div className="flex items-start justify-between pr-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="bg-primary p-4 rounded-3xl text-primary-foreground shadow-xl shadow-primary/20 ring-8 ring-primary/5">
                        <User className="size-10" />
                      </div>
                      <Badge className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg border-2 border-background shadow-lg">
                        {selectedEmployee.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <DialogTitle className="text-3xl font-black tracking-tighter text-foreground m-0">{selectedEmployee.name}</DialogTitle>
                        <Badge variant="outline" className="font-mono text-xs uppercase bg-background/50 border-muted-foreground/20 px-3 py-1">{selectedEmployee.employee_id}</Badge>
                      </div>
                      <div className="flex items-center gap-6 mt-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <Briefcase className="size-4 text-primary/60" />
                          {selectedEmployee.department_name} / {selectedEmployee.position_name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <History className="size-4 text-primary/60" />
                          入职于 {selectedEmployee.join_date}
                        </div>
                        {selectedEmployee.birthday && (
                          <div className="flex items-center gap-2 text-sm text-pink-500 font-bold bg-pink-50 px-2 py-0.5 rounded-full ring-1 ring-pink-100">
                            <Cake className="size-4" />
                            生日 {selectedEmployee.birthday.slice(5)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl border-dashed">
                      <Download className="mr-2 size-4" /> 导出全量档案
                    </Button>
                    <Button size="sm" className="h-10 px-6 rounded-xl shadow-lg shadow-primary/20" onClick={() => selectedEmployee && handleOpenEdit(selectedEmployee)}>
                      <Edit className="mr-2 size-4" /> 编辑信息
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              
              <Tabs value={activeArchiveTab} onValueChange={setActiveArchiveTab} className="mt-8 flex flex-col flex-1 overflow-hidden min-h-0">
                  <TabsList className="bg-transparent border-none gap-8 p-0 h-auto shrink-0 px-8">
                    {[
                      { value: "basic", label: "基础档案", icon: <User className="size-4" /> },
                      { value: "contract", label: "合同协议", icon: <FileText className="size-4" /> },
                      { value: "academic", label: "资质学历", icon: <GraduationCap className="size-4" /> },
                      { value: "bank", label: "薪酬银行", icon: <CreditCard className="size-4" /> },
                      { value: "files", label: "附件库", icon: <FolderOpen className="size-4" /> },
                    ].map(tab => (
                      <TabsTrigger 
                        key={tab.value} 
                        value={tab.value}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-full px-6 py-2 gap-2 text-sm font-semibold transition-all hover:bg-primary/5"
                      >
                        {tab.icon}
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollArea className="flex-1 bg-background mt-4 h-full min-h-0">
                    <div className="p-10 min-h-full">
                      <TabsContent value="basic" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-6">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-foreground/80">
                              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                              个人身份信息
                            </h4>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-6 bg-muted/20 p-8 rounded-3xl border border-muted-foreground/5 shadow-sm">
                              <div className="space-y-1.5">
                                <Label className="text-xs text-muted-foreground uppercase tracking-widest font-bold">真实姓名</Label>
                                <p className="text-base font-semibold">{selectedEmployee.name}</p>
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs text-muted-foreground uppercase tracking-widest font-bold">性别</Label>
                                <p className="text-base font-semibold">{selectedEmployee.gender === 'male' ? '男' : '女'}</p>
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs text-muted-foreground uppercase tracking-widest font-bold">身份证号</Label>
                                <p className="text-base font-mono font-semibold">{selectedEmployee.id_card}</p>
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs text-muted-foreground uppercase tracking-widest font-bold">出生日期</Label>
                                <p className="text-base font-semibold">{selectedEmployee.birthday}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-foreground/80">
                              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                              联系与社交
                            </h4>
                            <div className="grid grid-cols-1 gap-6 bg-muted/20 p-8 rounded-3xl border border-muted-foreground/5 shadow-sm">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-background rounded-2xl shadow-sm text-primary">
                                  <Phone className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <Label className="text-xs text-muted-foreground font-bold">联系电话</Label>
                                  <p className="text-base font-semibold">{selectedEmployee.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-background rounded-2xl shadow-sm text-primary">
                                  <FileText className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <Label className="text-xs text-muted-foreground font-bold">电子邮箱</Label>
                                  <p className="text-base font-semibold">{selectedEmployee.email || '未录入'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-background rounded-2xl shadow-sm text-primary">
                                  <FolderOpen className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <Label className="text-xs text-muted-foreground font-bold">现居住址</Label>
                                  <p className="text-base font-semibold">{selectedEmployee.address || '未录入'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 border-t border-muted-foreground/10 pt-4">
                                <div className="p-3 bg-background rounded-2xl shadow-sm text-primary">
                                  <User className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <Label className="text-xs text-muted-foreground font-bold">紧急联系人</Label>
                                  <p className="text-base font-semibold">{selectedEmployee.emergency_contact_name || '未录入'} ({selectedEmployee.emergency_contact_phone || '无电话'})</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="contract" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-8">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <h4 className="text-lg font-bold flex items-center gap-2 text-foreground/80">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                当前合同信息
                              </h4>
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                合同剩余 320 天
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                ref={contractFileInputRef}
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, "签署协议")}
                              />
                              <Button
                                size="sm"
                                className="h-9 px-4 rounded-xl"
                                onClick={() => {
                                  setUploadingCategory("签署协议")
                                  contractFileInputRef.current?.click()
                                }}
                                disabled={uploadingCategory === "签署协议"}
                              >
                                {uploadingCategory === "签署协议" ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Upload className="mr-2 size-4" />}
                                上传合同文件
                              </Button>
                            </div>
                          </div>
                          
                          {contract ? (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              <Card className="lg:col-span-2 border-none bg-muted/20 rounded-3xl p-8 shadow-sm">
                                <div className="grid grid-cols-2 gap-10">
                                  <div className="space-y-6">
                                    <div className="space-y-1.5">
                                      <Label className="text-xs text-muted-foreground font-bold">合同类型</Label>
                                      <p className="text-xl font-bold">{contract.contract_type}</p>
                                    </div>
                                    <div className="space-y-1.5">
                                      <Label className="text-xs text-muted-foreground font-bold">生效周期</Label>
                                      <p className="text-base font-semibold">{contract.start_date} 至 {contract.end_date || '无固定期限'}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-6">
                                    <div className="space-y-1.5">
                                      <Label className="text-xs text-muted-foreground font-bold">试用期时长</Label>
                                      <p className="text-base font-semibold">{contract.probation_months} 个月</p>
                                    </div>
                                    <div className="space-y-1.5">
                                      <Label className="text-xs text-muted-foreground font-bold">续签次数</Label>
                                      <p className="text-base font-semibold">{contract.renew_count} 次</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-10 pt-8 border-t border-muted-foreground/10 flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="bg-red-50 p-3 rounded-2xl text-red-500 ring-1 ring-red-100">
                                      <FileText className="size-6" />
                                    </div>
                                    <div className="space-y-0.5">
                                      <p className="text-sm font-bold">{contract.file_name || contract.file_url?.split('/').pop() || '合同文件'}</p>
                                      <p className="text-xs text-muted-foreground">{contract.file_url ? '已上传合同文件' : '未上传合同文件'}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" className="rounded-xl h-9" asChild disabled={!contract.file_url}>
                                      <a href={contract.file_url || '#'} target="_blank" rel="noreferrer" aria-label="预览合同" title="预览合同">
                                        <Eye className="size-4 mr-2" /> 预览
                                      </a>
                                    </Button>
                                    <Button variant="outline" className="rounded-xl h-9" asChild disabled={!contract.file_url}>
                                      <a href={contract.file_url || '#'} target="_blank" rel="noreferrer" aria-label="下载合同" title="下载合同">
                                        <Download className="size-4 mr-2" /> 下载
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                              
                              <div className="space-y-6">
                                <Card className="border-none bg-primary/5 rounded-3xl p-6 shadow-sm">
                                  <h5 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                                    <ShieldCheck className="size-4" /> 合规提醒
                                  </h5>
                                  <ul className="space-y-4 text-xs font-medium text-primary/80">
                                    {contract.end_date && (
                                      <li className="flex items-start gap-2">
                                        <div className="size-1.5 bg-primary rounded-full mt-1 shrink-0"></div>
                                        根据《劳动合同法》，当前合同需在到期前30天（{new Date(new Date(contract.end_date).getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}）发起续签流程。
                                      </li>
                                    )}
                                    <li className="flex items-start gap-2">
                                      <div className="size-1.5 bg-primary rounded-full mt-1 shrink-0"></div>
                                      员工试用期已于 2026-03-01 结束，系统已自动转正。
                                    </li>
                                  </ul>
                                </Card>
                              </div>
                            </div>
                          ) : (
                            <div className="h-60 flex flex-col items-center justify-center bg-muted/10 rounded-3xl border border-dashed border-muted-foreground/20 gap-4">
                              <FileText className="size-12 text-muted-foreground/20" />
                              <div className="text-center">
                                <p className="text-sm font-bold text-muted-foreground">暂未关联劳动合同</p>
                                <Button variant="link" size="sm" className="text-primary mt-1">立即上传签署文件</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="files" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-8">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-foreground/80">
                              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                              员工电子档案库
                            </h4>
                            <div className="flex gap-2">
                              <input 
                                type="file" 
                                title="上传文档" 
                                className="hidden" 
                                ref={fileInputRef} 
                                onChange={(e) => handleFileUpload(e, uploadingCategory || "其他")} 
                              />
                              <Button size="sm" className="h-9 px-4 rounded-xl" onClick={() => {
                                setUploadingCategory("其他");
                                fileInputRef.current?.click();
                              }} disabled={!!uploadingCategory}>
                                {uploadingCategory === "其他" ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Plus className="mr-2 size-4" />}
                                上传新文档
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[
                              { category: "入职档案", icon: <History className="size-5" />, color: "text-blue-500", bgColor: "bg-blue-50" },
                              { category: "签署协议", icon: <ShieldCheck className="size-5" />, color: "text-purple-500", bgColor: "bg-purple-50" },
                              { category: "异动文件", icon: <History className="size-5" />, color: "text-orange-500", bgColor: "bg-orange-50" },
                              { category: "奖惩记录", icon: <Award className="size-5" />, color: "text-red-500", bgColor: "bg-red-50" },
                              { category: "培训记录", icon: <BookOpen className="size-5" />, color: "text-green-500", bgColor: "bg-green-50" },
                              { category: "其他", icon: <FolderOpen className="size-5" />, color: "text-gray-500", bgColor: "bg-gray-50" },
                            ].map(folder => (
                              <div key={folder.category} className="relative group">
                                <Card 
                                  onClick={() => setSelectedFolder(selectedFolder === folder.category ? null : folder.category)}
                                  className={`border-none transition-all rounded-3xl p-6 cursor-pointer border h-full ${selectedFolder === folder.category ? 'bg-primary/5 ring-2 ring-primary/20' : 'bg-muted/10 hover:bg-muted/20 hover:border-primary/20'}`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className={`${folder.bgColor} ${folder.color} p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                                      {folder.icon}
                                    </div>
                                    <Badge variant="secondary" className="bg-background text-[10px] font-bold">
                                      {archives.filter(a => a.category === folder.category).length} 文件
                                    </Badge>
                                  </div>
                                  <h5 className="mt-6 font-bold text-base group-hover:text-primary transition-colors">{folder.category}</h5>
                                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">系统自动归档或手动上传的相关证明材料</p>
                                </Card>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="absolute top-2 right-2 size-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUploadingCategory(folder.category);
                                    fileInputRef.current?.click();
                                  }}
                                  disabled={uploadingCategory === folder.category}
                                >
                                  {uploadingCategory === folder.category ? (
                                    <Loader2 className="size-4 animate-spin" />
                                  ) : (
                                    <Plus className="size-4" />
                                  )}
                                </Button>
                              </div>
                            ))}
                          </div>

                          {selectedFolder && (
                            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                              <h5 className="font-bold text-lg flex items-center gap-2">
                                <FolderOpen className="size-5 text-primary" />
                                {selectedFolder} 文件列表
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {archives.filter(a => a.category === selectedFolder).map(file => (
                                  <div key={file.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-muted-foreground/10 group">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                      <div className="bg-background p-2.5 rounded-xl text-primary shadow-sm shrink-0">
                                        <FileText className="size-5" />
                                      </div>
                                      <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm font-semibold truncate" title={file.file_name}>{file.file_name}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{file.file_type} · {new Date(file.created_at).toLocaleDateString()}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-background" asChild>
                                        <a href={file.file_url} target="_blank" rel="noreferrer" aria-label="预览文件" title="预览文件"><Eye className="size-4" /></a>
                                      </Button>
                                      <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-background" asChild>
                                        <a href={file.file_url} download aria-label="下载文件" title="下载文件"><Download className="size-4" /></a>
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                {archives.filter(a => a.category === selectedFolder).length === 0 && (
                                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-muted-foreground/40 bg-muted/5 rounded-3xl border border-dashed border-muted-foreground/10">
                                    <FolderOpen className="size-10 mb-2 opacity-20" />
                                    <p className="text-sm italic">该分类下暂无文件</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      {/* Bank Tab */}
                      <TabsContent value="bank" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-6">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-foreground/80">
                              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                              发薪银行账户
                            </h4>
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
                               <div className="absolute -right-10 -top-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                               <div className="relative space-y-10">
                                  <div className="flex justify-between items-start">
                                     <CreditCard className="size-10" />
                                     <span className="text-sm font-bold opacity-80 uppercase tracking-widest">{selectedEmployee.bank_name || '未设置银行'}</span>
                                  </div>
                                  <div className="space-y-2">
                                     <p className="text-xs opacity-60 uppercase font-black tracking-[0.2em]">Bank Account Number</p>
                                     <p className="text-2xl font-mono tracking-widest font-bold">
                                        {selectedEmployee.bank_account ? selectedEmployee.bank_account.replace(/(.{4})/g, '$1 ') : '**** **** **** ****'}
                                     </p>
                                  </div>
                                  <div className="flex justify-between items-end">
                                     <div className="space-y-1">
                                        <p className="text-[10px] opacity-60 uppercase font-black">Account Holder</p>
                                        <p className="text-sm font-bold">{selectedEmployee.name}</p>
                                     </div>
                                     <div className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur text-[10px] font-black uppercase">Verified</div>
                                  </div>
                               </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="academic" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-6">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-foreground/80">
                              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                              学历信息
                            </h4>
                            <div className="bg-muted/20 p-8 rounded-3xl border border-muted-foreground/5 shadow-sm space-y-8">
                              <div className="flex items-center gap-6">
                                <div className="size-16 bg-background rounded-2xl flex items-center justify-center text-primary shadow-sm border border-muted-foreground/10 shrink-0">
                                  <GraduationCap className="size-8" />
                                </div>
                                <div>
                                  <Badge variant="secondary" className="mb-1 bg-primary/10 text-primary border-none text-[10px] uppercase font-black tracking-widest">最高学历</Badge>
                                  <p className="text-xl font-black text-foreground tracking-tight">{getEducationLabel(selectedEmployee.education_level)}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-muted-foreground/10">
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-muted-foreground font-bold">毕业院校</Label>
                                  <p className="text-base font-semibold">{selectedEmployee.school || '未录入'}</p>
                                </div>
                                <div className="space-y-1.5">
                                  <Label className="text-xs text-muted-foreground font-bold">所学专业</Label>
                                  <p className="text-base font-semibold">{selectedEmployee.major || '未录入'}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-foreground/80">
                              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                              职级与资质
                            </h4>
                            <div className="bg-muted/20 p-8 rounded-3xl border border-muted-foreground/5 shadow-sm space-y-6">
                              <div className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-muted-foreground/10">
                                <div className="size-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shadow-inner">
                                  <Award className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <Label className="text-[10px] text-muted-foreground font-bold uppercase">当前职级</Label>
                                  <p className="text-sm font-bold">{selectedEmployee.level || 'P1 - 初级'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-muted-foreground/10">
                                <div className="size-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center shadow-inner">
                                  <BookOpen className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <Label className="text-[10px] text-muted-foreground font-bold uppercase">持有证书</Label>
                                  <p className="text-sm font-bold">查看附件库中的扫描件</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </ScrollArea>
                </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
