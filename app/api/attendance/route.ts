import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")

  let query = supabase.from("attendance_records").select(`
    *,
    employees (
      name,
      department_name
    )
  `)

  if (date) {
    query = query.eq("date", date)
  }

  const { data, error } = await query.order("check_in", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const normalized = (data || []).map(record => ({
    ...record,
    employeeName: record.employees?.name,
    department: record.employees?.department_name
  }))

  return NextResponse.json(normalized)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("attendance_records")
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
