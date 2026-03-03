import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

function getPositionCodeFromName(name: unknown) {
  const trimmed = typeof name === "string" ? name.trim() : ""
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
  suffix = Array.from(new Set(matchedAbbrs)).join("")

  const code = `${letters}${suffix}`.toUpperCase()
  if (code) return code
  const compact = trimmed.replace(/\s+/g, "")
  return compact ? compact.slice(0, 4).toUpperCase() : null
}


export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("positions")
    .select(`
      *,
      departments(name),
      position_requirements(
        job_description, 
        probation_criteria, 
        professional_training,
        job_description_files,
        probation_criteria_files,
        professional_training_files
      )
    `)
    .order("family", { ascending: true })
    .order("level", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const normalized = (data || []).map((item) => {
    const departments = (item as any).departments
    const departmentName = Array.isArray(departments) ? departments[0]?.name : departments?.name
    const requirements = (item as any).position_requirements?.[0] || (item as any).position_requirements

    return {
      ...item,
      department_name: departmentName || null,
      job_description: requirements?.job_description || "",
      probation_criteria: requirements?.probation_criteria || "",
      professional_training: requirements?.professional_training || "",
      job_description_files: requirements?.job_description_files || [],
      probation_criteria_files: requirements?.probation_criteria_files || [],
      professional_training_files: requirements?.professional_training_files || [],
    }
  })

  return NextResponse.json(normalized)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const code = getPositionCodeFromName(body.name)

  const { data: pos, error: posError } = await supabase
    .from("positions")
    .insert({
      name: body.name,
      code,
      family: body.family,
      level: body.level || null,
      department_id: body.department_id || null,
      headcount: body.headcount || 0,
      filled: body.filled || 0,
      salary: body.salary || null,
      status: body.status || "启用",
    })
    .select()
    .single()

  if (posError) return NextResponse.json({ error: posError.message }, { status: 500 })

  // 同时插入必知内容
  await supabase.from("position_requirements").insert({
    position_id: pos.id,
    job_description: body.job_description || "",
    probation_criteria: body.probation_criteria || "",
    professional_training: body.professional_training || "",
    job_description_files: body.job_description_files || [],
    probation_criteria_files: body.probation_criteria_files || [],
    professional_training_files: body.professional_training_files || [],
  })


  return NextResponse.json(pos)
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const code = getPositionCodeFromName(body.name)

  const { data: pos, error: posError } = await supabase
    .from("positions")
    .update({
      name: body.name,
      code,
      family: body.family,
      level: body.level || null,
      department_id: body.department_id || null,
      headcount: body.headcount || 0,
      filled: body.filled || 0,
      salary: body.salary || null,
      status: body.status || "启用",
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id)
    .select()
    .single()

  if (posError) return NextResponse.json({ error: posError.message }, { status: 500 })

  // 更新必知内容（使用 upsert 确保记录存在）
  await supabase.from("position_requirements").upsert({
    position_id: body.id,
    job_description: body.job_description || "",
    probation_criteria: body.probation_criteria || "",
    professional_training: body.professional_training || "",
    job_description_files: body.job_description_files || [],
    probation_criteria_files: body.probation_criteria_files || [],
    professional_training_files: body.professional_training_files || [],
    updated_at: new Date().toISOString(),
  }, { onConflict: 'position_id' })

  return NextResponse.json(pos)
}



export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  const { error } = await supabase.from("positions").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
