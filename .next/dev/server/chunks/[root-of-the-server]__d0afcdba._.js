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
"[project]/app/api/onboarding/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
const defaultTasks = [
    {
        name: "开通邮箱/AD账号",
        assignee: "IT",
        status: "待办"
    },
    {
        name: "配发电脑与权限",
        assignee: "IT",
        status: "待办"
    },
    {
        name: "座位/门禁/工牌",
        assignee: "行政",
        status: "待办"
    },
    {
        name: "办公用品&工装",
        assignee: "行政",
        status: "待办"
    },
    {
        name: "社保/公积金开户",
        assignee: "HR",
        status: "待办"
    },
    {
        name: "员工手册宣导与签收",
        assignee: "HR",
        status: "待办"
    },
    {
        name: "劳动合同签署",
        assignee: "HR",
        status: "待办"
    },
    {
        name: "保密协议签署",
        assignee: "HR",
        status: "待办"
    }
];
function normalizeTasks(tasks) {
    if (Array.isArray(tasks)) return tasks;
    return [];
}
function fillDefaults(body) {
    return {
        ...body,
        employee_name: body.employee_name ?? null,
        status: body.status ?? "进行中",
        progress: body.progress ?? 0,
        offer_status: body.offer_status ?? "待发送",
        contract_status: body.contract_status ?? "待签署",
        nda_status: body.nda_status ?? "待签署",
        handbook_status: body.handbook_status ?? "待确认",
        tasks: Array.isArray(body.tasks) && body.tasks.length > 0 ? body.tasks : defaultTasks
    };
}
async function GET() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("onboarding_tasks").select(`
      *,
      departments:department_id(name),
      positions:position_id(name)
    `).order("created_at", {
        ascending: false
    });
    if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: error.message
    }, {
        status: 500
    });
    const normalized = (data || []).map((row)=>({
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
            updated_at: row.updated_at
        }));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(normalized);
}
async function POST(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const body = await request.json();
    const payload = fillDefaults(body);
    const { data, error } = await supabase.from("onboarding_tasks").insert(payload).select(`
      *,
      departments:department_id(name),
      positions:position_id(name)
    `).single();
    if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: error.message
    }, {
        status: 500
    });
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
        updated_at: data.updated_at
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(normalized);
}
async function PUT(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "ID is required"
    }, {
        status: 400
    });
    const payload = fillDefaults(rest);
    const { data, error } = await supabase.from("onboarding_tasks").update({
        ...payload,
        updated_at: new Date().toISOString()
    }).eq("id", id).select(`
      *,
      departments:department_id(name),
      positions:position_id(name)
    `).maybeSingle();
    if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: error.message
    }, {
        status: 500
    });
    if (!data) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "未找到记录，可能已删除或无权限"
    }, {
        status: 404
    });
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
        updated_at: data.updated_at
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(normalized);
}
async function DELETE(request) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "ID is required"
    }, {
        status: 400
    });
    const { error } = await supabase.from("onboarding_tasks").delete().eq("id", id);
    if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: error.message
    }, {
        status: 500
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d0afcdba._.js.map