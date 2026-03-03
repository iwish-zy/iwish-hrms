import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("employees")
    .select(`
      *,
      departments(name),
      positions(name)
    `)
    .order("employee_id", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const normalized = (data || []).map((emp) => ({
    ...emp,
    department_name: Array.isArray(emp.departments) ? emp.departments[0]?.name : emp.departments?.name,
    position_name: Array.isArray(emp.positions) ? emp.positions[0]?.name : emp.positions?.name,
  }))

  return NextResponse.json(normalized)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("employees")
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()
  const { id, ...updates } = body

  const { data, error } = await supabase
    .from("employees")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 })

  const { error } = await supabase.from("employees").delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
