module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://tvyaurfsvziarqpemxza.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2eWF1cmZzdnppYXJxcGVteHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDY5MjYsImV4cCI6MjA4NzU4MjkyNn0.YjLSXxP5nu-J14UqgMwMBUGOSqU85Ky01C3iKrG5nMg"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The "setAll" method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/app/api/positions/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
function getPositionCodeFromName(name) {
    const trimmed = typeof name === "string" ? name.trim() : "";
    if (!trimmed) return null;
    const letters = trimmed.match(/[A-Za-z0-9]+/g)?.join("") || "";
    const chinese = trimmed.replace(/[A-Za-z0-9\s]/g, "");
    const mappings = [
        {
            keyword: "客户经理",
            abbr: "AM"
        },
        {
            keyword: "项目经理",
            abbr: "PM"
        },
        {
            keyword: "效果营销",
            abbr: "SEM"
        },
        {
            keyword: "优化师",
            abbr: "OPT"
        },
        {
            keyword: "高级",
            abbr: "SR"
        },
        {
            keyword: "资深",
            abbr: "SR"
        },
        {
            keyword: "中级",
            abbr: "MID"
        },
        {
            keyword: "初级",
            abbr: "JR"
        },
        {
            keyword: "经理",
            abbr: "MGR"
        },
        {
            keyword: "专家",
            abbr: "EXP"
        },
        {
            keyword: "助理",
            abbr: "ASST"
        },
        {
            keyword: "储备",
            abbr: "RSV"
        }
    ];
    let suffix = "";
    const matchedAbbrs = [];
    for (const { keyword, abbr } of mappings){
        if (chinese.includes(keyword)) {
            matchedAbbrs.push(abbr);
        }
    }
    suffix = Array.from(new Set(matchedAbbrs)).join("");
    const code = `${letters}${suffix}`.toUpperCase();
    if (code) return code;
    const compact = trimmed.replace(/\s+/g, "");
    return compact ? compact.slice(0, 4).toUpperCase() : null;
}
async function GET() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("positions").select(`
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
    `).order("family", {
        ascending: true
    }).order("level", {
        ascending: false
    });
    if (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
    const normalized = (data || []).map((item)=>{
        const departments = item.departments;
        const departmentName = Array.isArray(departments) ? departments[0]?.name : departments?.name;
        const requirements = item.position_requirements?.[0] || item.position_requirements;
        return {
            ...item,
            department_name: departmentName || null,
            job_description: requirements?.job_description || "",
            probation_criteria: requirements?.probation_criteria || "",
            professional_training: requirements?.professional_training || "",
            job_description_files: requirements?.job_description_files || [],
            probation_criteria_files: requirements?.probation_criteria_files || [],
            professional_training_files: requirements?.professional_training_files || []
        };
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(normalized);
}
async function POST(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const body = await request.json();
    const code = getPositionCodeFromName(body.name);
    const { data: pos, error: posError } = await supabase.from("positions").insert({
        name: body.name,
        code,
        family: body.family,
        level: body.level || null,
        department_id: body.department_id || null,
        headcount: body.headcount || 0,
        filled: body.filled || 0,
        salary: body.salary || null,
        status: body.status || "启用"
    }).select().single();
    if (posError) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: posError.message
    }, {
        status: 500
    });
    // 同时插入必知内容
    await supabase.from("position_requirements").insert({
        position_id: pos.id,
        job_description: body.job_description || "",
        probation_criteria: body.probation_criteria || "",
        professional_training: body.professional_training || "",
        job_description_files: body.job_description_files || [],
        probation_criteria_files: body.probation_criteria_files || [],
        professional_training_files: body.professional_training_files || []
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(pos);
}
async function PUT(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const body = await request.json();
    const code = getPositionCodeFromName(body.name);
    const { data: pos, error: posError } = await supabase.from("positions").update({
        name: body.name,
        code,
        family: body.family,
        level: body.level || null,
        department_id: body.department_id || null,
        headcount: body.headcount || 0,
        filled: body.filled || 0,
        salary: body.salary || null,
        status: body.status || "启用",
        updated_at: new Date().toISOString()
    }).eq("id", body.id).select().single();
    if (posError) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: posError.message
    }, {
        status: 500
    });
    // 更新必知内容（使用 upsert 确保记录存在）
    await supabase.from("position_requirements").upsert({
        position_id: body.id,
        job_description: body.job_description || "",
        probation_criteria: body.probation_criteria || "",
        professional_training: body.professional_training || "",
        job_description_files: body.job_description_files || [],
        probation_criteria_files: body.probation_criteria_files || [],
        professional_training_files: body.professional_training_files || [],
        updated_at: new Date().toISOString()
    }, {
        onConflict: 'position_id'
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(pos);
}
async function DELETE(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ID is required"
        }, {
            status: 400
        });
    }
    const { error } = await supabase.from("positions").delete().eq("id", id);
    if (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0a55f6f3._.js.map