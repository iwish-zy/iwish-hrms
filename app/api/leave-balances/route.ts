import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("leave_balances")
    .select(`
      *,
      employees (
        name
      )
    `)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const normalized = (data || []).map(lb => ({
    ...lb,
    name: lb.employees?.name
  }))

  return NextResponse.json(normalized)
}
