import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

const defaultTasks = [
  { name: "开通邮箱/AD账号", assignee: "IT", status: "待办" },
  { name: "配发电脑与权限", assignee: "IT", status: "待办" },
  { name: "座位/门禁/工牌", assignee: "行政", status: "待办" },
  { name: "办公用品&工装", assignee: "行政", status: "待办" },
  { name: "社保/公积金开户", assignee: "HR", status: "待办" },
  { name: "员工手册宣导与签收", assignee: "HR", status: "待办" },
  { name: "劳动合同签署", assignee: "HR", status: "待办" },
  { name: "保密协议签署", assignee: "HR", status: "待办" },
]

type OnboardingPayload = {
  department_id?: string | null
  position_id?: string | null
  employee_name?: string | null
  join_date: string
  status?: string
  progress?: number
  offer_status?: string
  offer_url?: string | null
  offer_sent_at?: string | null
  offer_confirmed_at?: string | null
  contract_url?: string | null
  contract_status?: string
  nda_url?: string | null
  nda_status?: string
  handbook_url?: string | null
  handbook_status?: string
  tasks?: any[]
  notes?: string | null
}

function normalizeTasks(tasks: any) {
  if (Array.isArray(tasks)) return tasks
  return []
}

function fillDefaults(body: OnboardingPayload) {
  return {
    ...body,
    employee_name: body.employee_name ?? null,
    status: body.status ?? "进行中",
    progress: body.progress ?? 0,
    offer_status: body.offer_status ?? "待发送",
    contract_status: body.contract_status ?? "待签署",
    nda_status: body.nda_status ?? "待签署",
    handbook_status: body.handbook_status ?? "待确认",
    tasks: Array.isArray(body.tasks) && body.tasks.length > 0 ? body.tasks : defaultTasks,
  }
}

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("onboarding_tasks")
    .select(`
      *,
      departments:department_id(name),
      positions:position_id(name)
    `)
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const normalized = (data || []).map((row: any) => ({
    id: row.id,
    employeeName: row.employee_name || "未命名",
    departmentId: row.department_id,
    positionId: row.position_id,
    department: row.departments?.name || "-",
    position: row.positions?.name || "-",
    joinDate: row.join_date,
    status: row.status,
    progress: row.progress ?? 0,
    offerStatus: row.offer_status,
    offerUrl: row.offer_url,
    contractStatus: row.contract_status,
    contractUrl: row.contract_url,
    ndaStatus: row.nda_status,
    ndaUrl: row.nda_url,
    handbookStatus: row.handbook_status,
    handbookUrl: row.handbook_url,
    tasks: normalizeTasks(row.tasks),
    notes: row.notes,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }))

  return NextResponse.json(normalized)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = (await request.json()) as OnboardingPayload
  const payload = fillDefaults(body)

  const { data, error } = await supabase
    .from("onboarding_tasks")
    .insert(payload)
    .select(`
      *,
      departments:department_id(name),
      positions:position_id(name)
    `)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const normalized = {
    id: data.id,
    employeeName: data.employee_name || "未命名",
    departmentId: data.department_id,
    positionId: data.position_id,
    department: data.departments?.name || "-",
    position: data.positions?.name || "-",
    joinDate: data.join_date,
    status: data.status,
    progress: data.progress ?? 0,
    offerStatus: data.offer_status,
    offerUrl: data.offer_url,
    contractStatus: data.contract_status,
    contractUrl: data.contract_url,
    ndaStatus: data.nda_status,
    ndaUrl: data.nda_url,
    handbookStatus: data.handbook_status,
    handbookUrl: data.handbook_url,
    tasks: normalizeTasks(data.tasks),
    notes: data.notes,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }

  return NextResponse.json(normalized)
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient()
  const body = (await request.json()) as OnboardingPayload & { id?: string }
  const { id, ...rest } = body

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 })

  const payload = fillDefaults(rest)

  const { data, error } = await supabase
    .from("onboarding_tasks")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(`
      *,
      departments:department_id(name),
      positions:position_id(name)
    `)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: "未找到记录，可能已删除或无权限" }, { status: 404 })

  const normalized = {
    id: data.id,
    employeeName: data.employee_name || "未命名",
    departmentId: data.department_id,
    positionId: data.position_id,
    department: data.departments?.name || "-",
    position: data.positions?.name || "-",
    joinDate: data.join_date,
    status: data.status,
    progress: data.progress ?? 0,
    offerStatus: data.offer_status,
    offerUrl: data.offer_url,
    contractStatus: data.contract_status,
    contractUrl: data.contract_url,
    ndaStatus: data.nda_status,
    ndaUrl: data.nda_url,
    handbookStatus: data.handbook_status,
    handbookUrl: data.handbook_url,
    tasks: normalizeTasks(data.tasks),
    notes: data.notes,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }

  return NextResponse.json(normalized)
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 })

  const { error } = await supabase.from("onboarding_tasks").delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
