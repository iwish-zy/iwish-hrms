import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("probation_records")
    .select(`
      *,
      employee:employees(
        id, 
        name, 
        department:departments(name), 
        position:positions(name)
      )
    `)
    .order("probation_end_date", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // 格式化数据，计算剩余天数等
  const formattedData = (data || []).map((record: any) => {
    const today = new Date();
    const endDate = new Date(record.probation_end_date);
    const diffTime = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      ...record,
      name: record.employee?.name,
      department: record.employee?.department?.name,
      position: record.employee?.position?.name,
      joinDate: record.join_date,
      probationEnd: record.probation_end_date,
      daysLeft: Math.max(0, daysLeft),
      progress: Math.min(100, Math.max(0, Math.round(((record.probation_months * 30 - daysLeft) / (record.probation_months * 30)) * 100)))
    };
  });

  return NextResponse.json(formattedData)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("probation_records")
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
    .from("probation_records")
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

  const { error } = await supabase.from("probation_records").delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
