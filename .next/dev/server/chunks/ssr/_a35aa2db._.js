module.exports = [
"[project]/hooks/use-mobile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = ()=>{
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener('change', onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return ()=>mql.removeEventListener('change', onChange);
    }, []);
    return !!isMobile;
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/lib/mock-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =====================================================
// 深圳艾维人事管理系统 - 模拟数据
// =====================================================
// 员工数据 - 增加档案字段：身份证、学历、证件、紧急联系人等
__turbopack_context__.s([
    "approvalFlows",
    ()=>approvalFlows,
    "attendanceRecords",
    ()=>attendanceRecords,
    "contracts",
    ()=>contracts,
    "departments",
    ()=>departments,
    "employees",
    ()=>employees,
    "leaveBalances",
    ()=>leaveBalances,
    "leaveRequests",
    ()=>leaveRequests,
    "monthlyChanges",
    ()=>monthlyChanges,
    "onboardingTasks",
    ()=>onboardingTasks,
    "payrollList",
    ()=>payrollList,
    "performanceData",
    ()=>performanceData,
    "personnelChanges",
    ()=>personnelChanges,
    "positions",
    ()=>positions,
    "probationRecords",
    ()=>probationRecords,
    "recruitments",
    ()=>recruitments,
    "resignationChecklist",
    ()=>resignationChecklist,
    "salaryData",
    ()=>salaryData,
    "shiftTypes",
    ()=>shiftTypes
]);
const employees = [
    {
        id: "EMP001",
        name: "张三",
        department: "技术部",
        position: "高级工程师",
        level: "P7",
        status: "在职",
        joinDate: "2021-03-15",
        phone: "138****1234",
        email: "zhangsan@aiwei.com",
        avatar: "张",
        gender: "男",
        age: 32,
        idCard: "4403**********1234",
        education: "本科",
        school: "深圳大学",
        birthDate: "1994-05-12",
        contractType: "固定期限",
        probationEnd: "2021-06-14",
        emergencyContact: "张父 138****0001",
        address: "深圳市南山区科技园",
        bankAccount: "6222****1234"
    },
    {
        id: "EMP002",
        name: "李四",
        department: "产品部",
        position: "产品经理",
        level: "P6",
        status: "在职",
        joinDate: "2020-07-01",
        phone: "139****5678",
        email: "lisi@aiwei.com",
        avatar: "李",
        gender: "女",
        age: 28,
        idCard: "4403**********5678",
        education: "硕士",
        school: "中山大学",
        birthDate: "1998-02-20",
        contractType: "固定期限",
        probationEnd: "2020-10-01",
        emergencyContact: "李母 139****0002",
        address: "深圳市福田区中心城",
        bankAccount: "6222****5678"
    },
    {
        id: "EMP003",
        name: "王五",
        department: "市场部",
        position: "市场总监",
        level: "M2",
        status: "在职",
        joinDate: "2019-11-20",
        phone: "137****9012",
        email: "wangwu@aiwei.com",
        avatar: "王",
        gender: "男",
        age: 35,
        idCard: "4403**********9012",
        education: "硕士",
        school: "武汉大学",
        birthDate: "1991-08-30",
        contractType: "无固定期限",
        probationEnd: "2020-02-20",
        emergencyContact: "王妻 137****0003",
        address: "深圳市宝安区西乡",
        bankAccount: "6222****9012"
    },
    {
        id: "EMP004",
        name: "赵六",
        department: "财务部",
        position: "财务主管",
        level: "P6",
        status: "在职",
        joinDate: "2022-01-10",
        phone: "136****3456",
        email: "zhaoliu@aiwei.com",
        avatar: "赵",
        gender: "女",
        age: 30,
        idCard: "4403**********3456",
        education: "本科",
        school: "暨南大学",
        birthDate: "1996-11-08",
        contractType: "固定期限",
        probationEnd: "2022-04-10",
        emergencyContact: "赵父 136****0004",
        address: "深圳市龙岗区布吉",
        bankAccount: "6222****3456"
    },
    {
        id: "EMP005",
        name: "钱七",
        department: "人力资源部",
        position: "HR经理",
        level: "P6",
        status: "在职",
        joinDate: "2020-05-18",
        phone: "135****7890",
        email: "qianqi@aiwei.com",
        avatar: "钱",
        gender: "女",
        age: 29,
        idCard: "4403**********7890",
        education: "本科",
        school: "华南理工大学",
        birthDate: "1997-07-15",
        contractType: "固定期限",
        probationEnd: "2020-08-18",
        emergencyContact: "钱母 135****0005",
        address: "深圳市南山区后海",
        bankAccount: "6222****7890"
    },
    {
        id: "EMP006",
        name: "孙八",
        department: "技术部",
        position: "前端开发",
        level: "P4",
        status: "试用期",
        joinDate: "2026-01-06",
        phone: "134****2345",
        email: "sunba@aiwei.com",
        avatar: "孙",
        gender: "男",
        age: 25,
        idCard: "4403**********2345",
        education: "本科",
        school: "华南师范大学",
        birthDate: "2001-03-22",
        contractType: "固定期限",
        probationEnd: "2026-04-06",
        emergencyContact: "孙母 134****0006",
        address: "深圳市龙华区民治",
        bankAccount: "6222****2345"
    },
    {
        id: "EMP007",
        name: "周九",
        department: "技术部",
        position: "后端开发",
        level: "P5",
        status: "在职",
        joinDate: "2021-08-22",
        phone: "133****6789",
        email: "zhoujiu@aiwei.com",
        avatar: "周",
        gender: "男",
        age: 27,
        idCard: "4403**********6789",
        education: "硕士",
        school: "哈尔滨工业大学(深圳)",
        birthDate: "1999-01-18",
        contractType: "固定期限",
        probationEnd: "2021-11-22",
        emergencyContact: "周父 133****0007",
        address: "深圳市南山区西丽",
        bankAccount: "6222****6789"
    },
    {
        id: "EMP008",
        name: "吴十",
        department: "销售部",
        position: "销售经理",
        level: "M1",
        status: "在职",
        joinDate: "2020-02-14",
        phone: "132****0123",
        email: "wushi@aiwei.com",
        avatar: "吴",
        gender: "男",
        age: 33,
        idCard: "4403**********0123",
        education: "本科",
        school: "广东外语外贸大学",
        birthDate: "1993-09-05",
        contractType: "固定期限",
        probationEnd: "2020-05-14",
        emergencyContact: "吴妻 132****0008",
        address: "深圳市福田区景田",
        bankAccount: "6222****0123"
    },
    {
        id: "EMP009",
        name: "郑小",
        department: "运营部",
        position: "运营专员",
        level: "P3",
        status: "离职",
        joinDate: "2023-04-10",
        phone: "131****4567",
        email: "zhengxiao@aiwei.com",
        avatar: "郑",
        gender: "女",
        age: 26,
        idCard: "4403**********4567",
        education: "本科",
        school: "深圳大学",
        birthDate: "2000-06-28",
        contractType: "固定期限",
        probationEnd: "2023-07-10",
        emergencyContact: "郑父 131****0009",
        address: "深圳市罗湖区东门",
        bankAccount: "6222****4567"
    },
    {
        id: "EMP010",
        name: "陈明",
        department: "设计部",
        position: "UI设计师",
        level: "P5",
        status: "在职",
        joinDate: "2022-09-05",
        phone: "130****8901",
        email: "chenming@aiwei.com",
        avatar: "陈",
        gender: "男",
        age: 28,
        idCard: "4403**********8901",
        education: "本科",
        school: "广州美术学院",
        birthDate: "1998-12-01",
        contractType: "固定期限",
        probationEnd: "2022-12-05",
        emergencyContact: "陈母 130****0010",
        address: "深圳市南山区蛇口",
        bankAccount: "6222****8901"
    },
    {
        id: "EMP011",
        name: "林晓",
        department: "技术部",
        position: "测试工程师",
        level: "P5",
        status: "在职",
        joinDate: "2021-06-15",
        phone: "158****1122",
        email: "linxiao@aiwei.com",
        avatar: "林",
        gender: "女",
        age: 27,
        idCard: "4403**********1122",
        education: "本科",
        school: "南方科技大学",
        birthDate: "1999-04-10",
        contractType: "固定期限",
        probationEnd: "2021-09-15",
        emergencyContact: "林父 158****0011",
        address: "深圳市南山区大冲",
        bankAccount: "6222****1122"
    },
    {
        id: "EMP012",
        name: "黄伟",
        department: "销售部",
        position: "销售代表",
        level: "P3",
        status: "试用期",
        joinDate: "2026-02-10",
        phone: "159****3344",
        email: "huangwei@aiwei.com",
        avatar: "黄",
        gender: "男",
        age: 24,
        idCard: "4403**********3344",
        education: "大专",
        school: "深圳职业技术学院",
        birthDate: "2002-08-15",
        contractType: "固定期限",
        probationEnd: "2026-05-10",
        emergencyContact: "黄母 159****0012",
        address: "深圳市宝安区福永",
        bankAccount: "6222****3344"
    }
];
const departments = [
    {
        id: "D001",
        name: "技术部",
        parentId: "ROOT",
        manager: "张三",
        headcount: 45,
        approved: 50,
        budget: "200万",
        code: "TECH"
    },
    {
        id: "D002",
        name: "产品部",
        parentId: "ROOT",
        manager: "李四",
        headcount: 12,
        approved: 15,
        budget: "80万",
        code: "PROD"
    },
    {
        id: "D003",
        name: "市场部",
        parentId: "ROOT",
        manager: "王五",
        headcount: 18,
        approved: 20,
        budget: "120万",
        code: "MKT"
    },
    {
        id: "D004",
        name: "财务部",
        parentId: "ROOT",
        manager: "赵六",
        headcount: 8,
        approved: 10,
        budget: "50万",
        code: "FIN"
    },
    {
        id: "D005",
        name: "人力资源部",
        parentId: "ROOT",
        manager: "钱七",
        headcount: 6,
        approved: 8,
        budget: "40万",
        code: "HR"
    },
    {
        id: "D006",
        name: "销售部",
        parentId: "ROOT",
        manager: "吴十",
        headcount: 25,
        approved: 30,
        budget: "150万",
        code: "SALE"
    },
    {
        id: "D007",
        name: "运营部",
        parentId: "ROOT",
        manager: "周九",
        headcount: 15,
        approved: 18,
        budget: "90万",
        code: "OPS"
    },
    {
        id: "D008",
        name: "设计部",
        parentId: "ROOT",
        manager: "陈明",
        headcount: 10,
        approved: 12,
        budget: "60万",
        code: "DES"
    }
];
const positions = [
    {
        id: "POS001",
        name: "高级工程师",
        family: "技术运营体系",
        level: "P7",
        department: "技术部",
        headcount: 5,
        filled: 3,
        salary: "25K-40K"
    },
    {
        id: "POS002",
        name: "中级工程师",
        family: "技术运营体系",
        level: "P5-P6",
        department: "技术部",
        headcount: 15,
        filled: 12,
        salary: "18K-28K"
    },
    {
        id: "POS003",
        name: "初级工程师",
        family: "技术运营体系",
        level: "P3-P4",
        department: "技术部",
        headcount: 20,
        filled: 18,
        salary: "10K-18K"
    },
    {
        id: "POS004",
        name: "产品经理",
        family: "技术运营体系",
        level: "P5-P7",
        department: "产品部",
        headcount: 6,
        filled: 5,
        salary: "20K-35K"
    },
    {
        id: "POS005",
        name: "UI设计师",
        family: "技术运营体系",
        level: "P4-P6",
        department: "设计部",
        headcount: 8,
        filled: 6,
        salary: "15K-25K"
    },
    {
        id: "POS006",
        name: "销售经理",
        family: "市场营销体系",
        level: "M1",
        department: "销售部",
        headcount: 3,
        filled: 2,
        salary: "15K-30K"
    },
    {
        id: "POS007",
        name: "销售代表",
        family: "市场营销体系",
        level: "P3-P4",
        department: "销售部",
        headcount: 20,
        filled: 18,
        salary: "8K-15K"
    },
    {
        id: "POS008",
        name: "市场总监",
        family: "市场营销体系",
        level: "M2",
        department: "市场部",
        headcount: 1,
        filled: 1,
        salary: "30K-45K"
    },
    {
        id: "POS009",
        name: "财务主管",
        family: "职能体系",
        level: "P6",
        department: "财务部",
        headcount: 2,
        filled: 1,
        salary: "18K-25K"
    },
    {
        id: "POS010",
        name: "HR经理",
        family: "职能体系",
        level: "P6",
        department: "人力资源部",
        headcount: 2,
        filled: 1,
        salary: "18K-28K"
    }
];
const attendanceRecords = [
    {
        id: "A001",
        employeeId: "EMP001",
        employeeName: "张三",
        department: "技术部",
        date: "2026-02-24",
        checkIn: "08:55",
        checkOut: "18:05",
        status: "正常",
        hours: 9.2,
        shiftType: "标准班"
    },
    {
        id: "A002",
        employeeId: "EMP002",
        employeeName: "李四",
        department: "产品部",
        date: "2026-02-24",
        checkIn: "09:15",
        checkOut: "18:30",
        status: "迟到",
        hours: 9.3,
        shiftType: "标准班"
    },
    {
        id: "A003",
        employeeId: "EMP003",
        employeeName: "王五",
        department: "市场部",
        date: "2026-02-24",
        checkIn: "08:45",
        checkOut: "17:30",
        status: "早退",
        hours: 8.8,
        shiftType: "标准班"
    },
    {
        id: "A004",
        employeeId: "EMP004",
        employeeName: "赵六",
        department: "财务部",
        date: "2026-02-24",
        checkIn: "09:00",
        checkOut: "18:00",
        status: "正常",
        hours: 9.0,
        shiftType: "标准班"
    },
    {
        id: "A005",
        employeeId: "EMP005",
        employeeName: "钱七",
        department: "人力资源部",
        date: "2026-02-24",
        checkIn: "--",
        checkOut: "--",
        status: "请假",
        hours: 0,
        shiftType: "标准班"
    },
    {
        id: "A006",
        employeeId: "EMP006",
        employeeName: "孙八",
        department: "技术部",
        date: "2026-02-24",
        checkIn: "08:50",
        checkOut: "18:10",
        status: "正常",
        hours: 9.3,
        shiftType: "标准班"
    },
    {
        id: "A007",
        employeeId: "EMP007",
        employeeName: "周九",
        department: "技术部",
        date: "2026-02-24",
        checkIn: "09:02",
        checkOut: "21:00",
        status: "加班",
        hours: 12.0,
        shiftType: "弹性班"
    },
    {
        id: "A008",
        employeeId: "EMP008",
        employeeName: "吴十",
        department: "销售部",
        date: "2026-02-24",
        checkIn: "08:58",
        checkOut: "18:02",
        status: "正常",
        hours: 9.1,
        shiftType: "标准班"
    },
    {
        id: "A009",
        employeeId: "EMP011",
        employeeName: "林晓",
        department: "技术部",
        date: "2026-02-24",
        checkIn: "09:00",
        checkOut: "18:00",
        status: "正常",
        hours: 9.0,
        shiftType: "弹性班"
    },
    {
        id: "A010",
        employeeId: "EMP012",
        employeeName: "黄伟",
        department: "销售部",
        date: "2026-02-24",
        checkIn: "08:30",
        checkOut: "18:15",
        status: "正常",
        hours: 9.8,
        shiftType: "标准班"
    }
];
const leaveBalances = [
    {
        employeeId: "EMP001",
        name: "张三",
        annual: 10,
        annualUsed: 3,
        annualRemaining: 7,
        sick: 15,
        sickUsed: 1,
        compensatory: 2,
        compensatoryUsed: 0
    },
    {
        employeeId: "EMP002",
        name: "李四",
        annual: 10,
        annualUsed: 5,
        annualRemaining: 5,
        sick: 15,
        sickUsed: 3,
        compensatory: 1,
        compensatoryUsed: 1
    },
    {
        employeeId: "EMP003",
        name: "王五",
        annual: 15,
        annualUsed: 8,
        annualRemaining: 7,
        sick: 15,
        sickUsed: 0,
        compensatory: 3,
        compensatoryUsed: 2
    },
    {
        employeeId: "EMP004",
        name: "赵六",
        annual: 10,
        annualUsed: 2,
        annualRemaining: 8,
        sick: 15,
        sickUsed: 2,
        compensatory: 0,
        compensatoryUsed: 0
    },
    {
        employeeId: "EMP005",
        name: "钱七",
        annual: 10,
        annualUsed: 6,
        annualRemaining: 4,
        sick: 15,
        sickUsed: 0,
        compensatory: 1,
        compensatoryUsed: 0
    }
];
const leaveRequests = [
    {
        id: "L001",
        employeeId: "EMP005",
        name: "钱七",
        department: "人力资源部",
        type: "年假",
        startDate: "2026-02-24",
        endDate: "2026-02-25",
        days: 2,
        status: "已批准",
        reason: "个人事务",
        approver: "王五",
        approveDate: "2026-02-22"
    },
    {
        id: "L002",
        employeeId: "EMP002",
        name: "李四",
        department: "产品部",
        type: "病假",
        startDate: "2026-02-26",
        endDate: "2026-02-26",
        days: 1,
        status: "待审批",
        reason: "身体不适",
        approver: "",
        approveDate: ""
    },
    {
        id: "L003",
        employeeId: "EMP003",
        name: "王五",
        department: "市场部",
        type: "事假",
        startDate: "2026-03-01",
        endDate: "2026-03-02",
        days: 2,
        status: "待审批",
        reason: "家庭原因",
        approver: "",
        approveDate: ""
    },
    {
        id: "L004",
        employeeId: "EMP006",
        name: "孙八",
        department: "技术部",
        type: "年假",
        startDate: "2026-03-05",
        endDate: "2026-03-07",
        days: 3,
        status: "已批准",
        reason: "旅游",
        approver: "张三",
        approveDate: "2026-02-28"
    },
    {
        id: "L005",
        employeeId: "EMP010",
        name: "陈明",
        department: "设计部",
        type: "调休",
        startDate: "2026-02-28",
        endDate: "2026-02-28",
        days: 1,
        status: "已驳回",
        reason: "个人原因",
        approver: "王五",
        approveDate: "2026-02-25"
    },
    {
        id: "L006",
        employeeId: "EMP007",
        name: "周九",
        department: "技术部",
        type: "婚假",
        startDate: "2026-04-01",
        endDate: "2026-04-10",
        days: 10,
        status: "待审批",
        reason: "结婚",
        approver: "",
        approveDate: ""
    }
];
const recruitments = [
    {
        id: "R001",
        position: "高级前端工程师",
        department: "技术部",
        applicants: 45,
        interviews: 8,
        status: "招聘中",
        salary: "25-35K",
        urgent: true,
        publishDate: "2026-01-15",
        recruiter: "钱七"
    },
    {
        id: "R002",
        position: "产品经理",
        department: "产品部",
        applicants: 32,
        interviews: 5,
        status: "招聘中",
        salary: "20-30K",
        urgent: false,
        publishDate: "2026-01-20",
        recruiter: "钱七"
    },
    {
        id: "R003",
        position: "UI/UX设计师",
        department: "设计部",
        applicants: 28,
        interviews: 6,
        status: "面试中",
        salary: "18-25K",
        urgent: false,
        publishDate: "2026-02-01",
        recruiter: "钱七"
    },
    {
        id: "R004",
        position: "数据分析师",
        department: "运营部",
        applicants: 18,
        interviews: 3,
        status: "招聘中",
        salary: "15-22K",
        urgent: true,
        publishDate: "2026-02-05",
        recruiter: "钱七"
    },
    {
        id: "R005",
        position: "销售代表",
        department: "销售部",
        applicants: 56,
        interviews: 12,
        status: "已完成",
        salary: "8-15K",
        urgent: false,
        publishDate: "2025-12-10",
        recruiter: "钱七"
    },
    {
        id: "R006",
        position: "Java开发工程师",
        department: "技术部",
        applicants: 38,
        interviews: 7,
        status: "面试中",
        salary: "22-32K",
        urgent: true,
        publishDate: "2026-01-25",
        recruiter: "钱七"
    }
];
const contracts = [
    {
        id: "C001",
        employeeId: "EMP001",
        name: "张三",
        type: "固定期限",
        startDate: "2021-03-15",
        endDate: "2027-03-14",
        status: "执行中",
        renewCount: 1,
        duration: "6年"
    },
    {
        id: "C002",
        employeeId: "EMP002",
        name: "李四",
        type: "固定期限",
        startDate: "2020-07-01",
        endDate: "2026-06-30",
        status: "即将到期",
        renewCount: 1,
        duration: "6年"
    },
    {
        id: "C003",
        employeeId: "EMP003",
        name: "王五",
        type: "无固定期限",
        startDate: "2019-11-20",
        endDate: "--",
        status: "执行中",
        renewCount: 2,
        duration: "无固定"
    },
    {
        id: "C004",
        employeeId: "EMP004",
        name: "赵六",
        type: "固定期限",
        startDate: "2022-01-10",
        endDate: "2027-01-09",
        status: "执行中",
        renewCount: 0,
        duration: "5年"
    },
    {
        id: "C005",
        employeeId: "EMP006",
        name: "孙八",
        type: "试用期",
        startDate: "2026-01-06",
        endDate: "2026-04-06",
        status: "试用中",
        renewCount: 0,
        duration: "3月"
    },
    {
        id: "C006",
        employeeId: "EMP012",
        name: "黄伟",
        type: "试用期",
        startDate: "2026-02-10",
        endDate: "2026-05-10",
        status: "试用中",
        renewCount: 0,
        duration: "3月"
    }
];
const salaryData = [
    {
        month: "2025-09",
        totalSalary: 285,
        socialInsurance: 45,
        bonus: 30,
        tax: 38
    },
    {
        month: "2025-10",
        totalSalary: 290,
        socialInsurance: 46,
        bonus: 25,
        tax: 39
    },
    {
        month: "2025-11",
        totalSalary: 295,
        socialInsurance: 47,
        bonus: 35,
        tax: 40
    },
    {
        month: "2025-12",
        totalSalary: 310,
        socialInsurance: 48,
        bonus: 50,
        tax: 42
    },
    {
        month: "2026-01",
        totalSalary: 305,
        socialInsurance: 48,
        bonus: 40,
        tax: 41
    },
    {
        month: "2026-02",
        totalSalary: 300,
        socialInsurance: 48,
        bonus: 32,
        tax: 40
    }
];
const payrollList = [
    {
        id: "S001",
        employeeId: "EMP001",
        name: "张三",
        department: "技术部",
        baseSalary: 18000,
        positionSalary: 5000,
        performanceBonus: 3000,
        overtimePay: 0,
        allowance: 2100,
        socialInsurance: 3200,
        housingFund: 2400,
        tax: 1800,
        netSalary: 20700,
        status: "已发放"
    },
    {
        id: "S002",
        employeeId: "EMP002",
        name: "李四",
        department: "产品部",
        baseSalary: 15000,
        positionSalary: 4000,
        performanceBonus: 2500,
        overtimePay: 0,
        allowance: 2100,
        socialInsurance: 2800,
        housingFund: 2000,
        tax: 1400,
        netSalary: 17400,
        status: "已发放"
    },
    {
        id: "S003",
        employeeId: "EMP003",
        name: "王五",
        department: "市场部",
        baseSalary: 20000,
        positionSalary: 6000,
        performanceBonus: 5000,
        overtimePay: 0,
        allowance: 2100,
        socialInsurance: 3600,
        housingFund: 2800,
        tax: 2500,
        netSalary: 24200,
        status: "已发放"
    },
    {
        id: "S004",
        employeeId: "EMP004",
        name: "赵六",
        department: "财务部",
        baseSalary: 14000,
        positionSalary: 3500,
        performanceBonus: 2000,
        overtimePay: 0,
        allowance: 2100,
        socialInsurance: 2600,
        housingFund: 1800,
        tax: 1200,
        netSalary: 16000,
        status: "已发放"
    },
    {
        id: "S005",
        employeeId: "EMP005",
        name: "钱七",
        department: "人力资源部",
        baseSalary: 14500,
        positionSalary: 3500,
        performanceBonus: 2200,
        overtimePay: 0,
        allowance: 2100,
        socialInsurance: 2700,
        housingFund: 1900,
        tax: 1200,
        netSalary: 16500,
        status: "待发放"
    },
    {
        id: "S006",
        employeeId: "EMP006",
        name: "孙八",
        department: "技术部",
        baseSalary: 10000,
        positionSalary: 2000,
        performanceBonus: 0,
        overtimePay: 500,
        allowance: 2100,
        socialInsurance: 1800,
        housingFund: 1200,
        tax: 600,
        netSalary: 11000,
        status: "待发放"
    },
    {
        id: "S007",
        employeeId: "EMP007",
        name: "周九",
        department: "技术部",
        baseSalary: 13000,
        positionSalary: 3000,
        performanceBonus: 4000,
        overtimePay: 1500,
        allowance: 2100,
        socialInsurance: 2400,
        housingFund: 1700,
        tax: 1300,
        netSalary: 18200,
        status: "已发放"
    },
    {
        id: "S008",
        employeeId: "EMP008",
        name: "吴十",
        department: "销售部",
        baseSalary: 10000,
        positionSalary: 3000,
        performanceBonus: 8000,
        overtimePay: 0,
        allowance: 2100,
        socialInsurance: 2200,
        housingFund: 1500,
        tax: 1500,
        netSalary: 17900,
        status: "已发放"
    }
];
const performanceData = [
    {
        id: "P001",
        employeeId: "EMP001",
        name: "张三",
        department: "技术部",
        quarter: "Q4 2025",
        kpiScore: 92,
        rating: "A",
        comment: "表现优秀，超额完成目标",
        selfScore: 90,
        managerScore: 92,
        peerScore: 88
    },
    {
        id: "P002",
        employeeId: "EMP002",
        name: "李四",
        department: "产品部",
        quarter: "Q4 2025",
        kpiScore: 88,
        rating: "A",
        comment: "产品规划能力强",
        selfScore: 85,
        managerScore: 88,
        peerScore: 90
    },
    {
        id: "P003",
        employeeId: "EMP003",
        name: "王五",
        department: "市场部",
        quarter: "Q4 2025",
        kpiScore: 78,
        rating: "B",
        comment: "市场活动效果良好",
        selfScore: 82,
        managerScore: 78,
        peerScore: 80
    },
    {
        id: "P004",
        employeeId: "EMP004",
        name: "赵六",
        department: "财务部",
        quarter: "Q4 2025",
        kpiScore: 85,
        rating: "B+",
        comment: "账务管理规范",
        selfScore: 83,
        managerScore: 85,
        peerScore: 86
    },
    {
        id: "P005",
        employeeId: "EMP005",
        name: "钱七",
        department: "人力资源部",
        quarter: "Q4 2025",
        kpiScore: 90,
        rating: "A",
        comment: "招聘效率显著提升",
        selfScore: 88,
        managerScore: 90,
        peerScore: 91
    },
    {
        id: "P006",
        employeeId: "EMP006",
        name: "孙八",
        department: "技术部",
        quarter: "Q4 2025",
        kpiScore: 72,
        rating: "B",
        comment: "试用期表现良好，学习能力强",
        selfScore: 75,
        managerScore: 72,
        peerScore: 70
    },
    {
        id: "P007",
        employeeId: "EMP007",
        name: "周九",
        department: "技术部",
        quarter: "Q4 2025",
        kpiScore: 95,
        rating: "A+",
        comment: "技术能力突出，团队贡献大",
        selfScore: 92,
        managerScore: 95,
        peerScore: 93
    },
    {
        id: "P008",
        employeeId: "EMP008",
        name: "吴十",
        department: "销售部",
        quarter: "Q4 2025",
        kpiScore: 82,
        rating: "B+",
        comment: "销售业绩达标",
        selfScore: 80,
        managerScore: 82,
        peerScore: 83
    }
];
const monthlyChanges = [
    {
        month: "2025-09",
        onboard: 5,
        resign: 2,
        transfer: 3
    },
    {
        month: "2025-10",
        onboard: 8,
        resign: 3,
        transfer: 2
    },
    {
        month: "2025-11",
        onboard: 4,
        resign: 1,
        transfer: 4
    },
    {
        month: "2025-12",
        onboard: 6,
        resign: 4,
        transfer: 1
    },
    {
        month: "2026-01",
        onboard: 10,
        resign: 2,
        transfer: 5
    },
    {
        month: "2026-02",
        onboard: 3,
        resign: 1,
        transfer: 2
    }
];
const onboardingTasks = [
    {
        id: "OB001",
        employeeId: "EMP012",
        employeeName: "黄伟",
        department: "销售部",
        joinDate: "2026-02-10",
        status: "进行中",
        progress: 75,
        tasks: [
            {
                name: "IT设备申请",
                status: "已完成",
                assignee: "IT部"
            },
            {
                name: "企业邮箱开通",
                status: "已完成",
                assignee: "IT部"
            },
            {
                name: "门禁权限开通",
                status: "已完成",
                assignee: "行政部"
            },
            {
                name: "入职培训",
                status: "进行中",
                assignee: "HR部"
            },
            {
                name: "导师分配",
                status: "待办",
                assignee: "部门经理"
            },
            {
                name: "试用期目标设定",
                status: "待办",
                assignee: "部门经理"
            }
        ]
    },
    {
        id: "OB002",
        employeeId: "EMP006",
        employeeName: "孙八",
        department: "技术部",
        joinDate: "2026-01-06",
        status: "已完成",
        progress: 100,
        tasks: [
            {
                name: "IT设备申请",
                status: "已完成",
                assignee: "IT部"
            },
            {
                name: "企业邮箱开通",
                status: "已完成",
                assignee: "IT部"
            },
            {
                name: "门禁权限开通",
                status: "已完成",
                assignee: "行政部"
            },
            {
                name: "入职培训",
                status: "已完成",
                assignee: "HR部"
            },
            {
                name: "导师分配",
                status: "已完成",
                assignee: "部门经理"
            },
            {
                name: "试用期目标设定",
                status: "已完成",
                assignee: "部门经理"
            }
        ]
    }
];
const probationRecords = [
    {
        id: "PR001",
        employeeId: "EMP006",
        name: "孙八",
        department: "技术部",
        position: "前端开发",
        joinDate: "2026-01-06",
        probationEnd: "2026-04-06",
        daysLeft: 41,
        status: "试用中",
        managerComment: "学习能力强，代码质量逐步提高",
        score: 82
    },
    {
        id: "PR002",
        employeeId: "EMP012",
        name: "黄伟",
        department: "销售部",
        position: "销售代表",
        joinDate: "2026-02-10",
        probationEnd: "2026-05-10",
        daysLeft: 75,
        status: "试用中",
        managerComment: "积极主动，客户沟通能力良好",
        score: 78
    }
];
const resignationChecklist = [
    {
        name: "工作交接",
        department: "所在部门",
        required: true
    },
    {
        name: "IT设备归还",
        department: "IT部",
        required: true
    },
    {
        name: "财务结算",
        department: "财务部",
        required: true
    },
    {
        name: "门禁/系统权限关闭",
        department: "行政部",
        required: true
    },
    {
        name: "社保公积金减员",
        department: "人力资源部",
        required: true
    },
    {
        name: "离职证明开具",
        department: "人力资源部",
        required: true
    }
];
const personnelChanges = [
    {
        id: "CH001",
        employeeId: "EMP006",
        name: "孙八",
        type: "入职",
        fromDept: "--",
        toDept: "技术部",
        fromPosition: "--",
        toPosition: "前端开发",
        effectDate: "2026-01-06",
        status: "已生效",
        remark: "校招入职"
    },
    {
        id: "CH002",
        employeeId: "EMP012",
        name: "黄伟",
        type: "入职",
        fromDept: "--",
        toDept: "销售部",
        fromPosition: "--",
        toPosition: "销售代表",
        effectDate: "2026-02-10",
        status: "已生效",
        remark: "社招入职"
    },
    {
        id: "CH003",
        employeeId: "EMP009",
        name: "郑小",
        type: "离职",
        fromDept: "运营部",
        toDept: "--",
        fromPosition: "运营专员",
        toPosition: "--",
        effectDate: "2025-11-30",
        status: "已生效",
        remark: "个人原因"
    },
    {
        id: "CH004",
        employeeId: "EMP007",
        name: "周九",
        type: "晋升",
        fromDept: "技术部",
        toDept: "技术部",
        fromPosition: "初级工程师",
        toPosition: "后端开发",
        effectDate: "2025-10-15",
        status: "已生效",
        remark: "绩效优秀，技术能力提升"
    },
    {
        id: "CH005",
        employeeId: "EMP002",
        name: "李四",
        type: "调岗",
        fromDept: "技术部",
        toDept: "产品部",
        fromPosition: "开发工程师",
        toPosition: "产品经理",
        effectDate: "2025-08-01",
        status: "已生效",
        remark: "岗位调整"
    },
    {
        id: "CH006",
        employeeId: "EMP003",
        name: "王五",
        type: "晋升",
        fromDept: "市场部",
        toDept: "市场部",
        fromPosition: "市场经理",
        toPosition: "市场总监",
        effectDate: "2025-06-01",
        status: "已生效",
        remark: "业绩突出"
    }
];
const shiftTypes = [
    {
        id: "ST001",
        name: "标准班",
        workStart: "09:00",
        workEnd: "18:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
        flexMinutes: 0,
        description: "固定工时制，每日8小时"
    },
    {
        id: "ST002",
        name: "弹性班",
        workStart: "08:00",
        workEnd: "20:00",
        lunchStart: "12:00",
        lunchEnd: "13:00",
        flexMinutes: 120,
        description: "弹性工时制，核心工作时间10:00-16:00"
    },
    {
        id: "ST003",
        name: "排班制",
        workStart: "--",
        workEnd: "--",
        lunchStart: "--",
        lunchEnd: "--",
        flexMinutes: 0,
        description: "轮班制，由主管排班"
    }
];
const approvalFlows = [
    {
        id: "AF001",
        type: "请假审批",
        steps: [
            "直属上级",
            "部门经理",
            "HR确认"
        ],
        status: "启用"
    },
    {
        id: "AF002",
        type: "加班审批",
        steps: [
            "直属上级",
            "部门经理"
        ],
        status: "启用"
    },
    {
        id: "AF003",
        type: "转正审批",
        steps: [
            "直属上级",
            "部门经理",
            "HR经理",
            "总经理"
        ],
        status: "启用"
    },
    {
        id: "AF004",
        type: "离职审批",
        steps: [
            "直属上级",
            "部门经理",
            "HR经理"
        ],
        status: "启用"
    },
    {
        id: "AF005",
        type: "调岗审批",
        steps: [
            "原部门经理",
            "新部门经理",
            "HR经理"
        ],
        status: "启用"
    }
];
}),
"[project]/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://tvyaurfsvziarqpemxza.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2eWF1cmZzdnppYXJxcGVteHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDY5MjYsImV4cCI6MjA4NzU4MjkyNn0.YjLSXxP5nu-J14UqgMwMBUGOSqU85Ky01C3iKrG5nMg");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HRSystemPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2d$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app-sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$organization$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/organization.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$employee$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/employee.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$attendance$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/attendance.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$recruitment$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/recruitment.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$salary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/salary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$performance$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/performance.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$analytics$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/analytics.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$settings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/settings.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$lifecycle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/lifecycle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/scroll-area.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$placeholder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modules/placeholder.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const placeholderConfig = {
};
function ModuleContent({ activeModule }) {
    switch(activeModule){
        case "dashboard":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dashboard"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 27,
                columnNumber: 14
            }, this);
        case "organization":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$organization$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrganizationModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 29,
                columnNumber: 14
            }, this);
        case "position":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$organization$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PositionModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 31,
                columnNumber: 14
            }, this);
        case "employee":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$employee$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmployeeModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 33,
                columnNumber: 14
            }, this);
        case "attendance":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$attendance$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AttendanceModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 35,
                columnNumber: 14
            }, this);
        case "recruitment":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$recruitment$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RecruitmentModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 37,
                columnNumber: 14
            }, this);
        case "salary":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$salary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SalaryModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 39,
                columnNumber: 14
            }, this);
        case "performance":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$performance$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerformanceModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 41,
                columnNumber: 14
            }, this);
        case "analytics":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$analytics$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnalyticsModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 43,
                columnNumber: 14
            }, this);
        case "settings":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$settings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SettingsModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 45,
                columnNumber: 14
            }, this);
        case "onboarding":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$lifecycle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OnboardingModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 47,
                columnNumber: 14
            }, this);
        case "probation":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$lifecycle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProbationModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 49,
                columnNumber: 14
            }, this);
        case "transfer":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$lifecycle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransferModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 51,
                columnNumber: 14
            }, this);
        case "resignation":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$lifecycle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResignationModule"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 53,
                columnNumber: 14
            }, this);
        default:
            const config = placeholderConfig[activeModule];
            if (config) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$placeholder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaceholderModule"], {
                    title: config.title,
                    description: config.description
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 57,
                    columnNumber: 16
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modules$2f$placeholder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaceholderModule"], {
                title: "功能开发中",
                description: `模块 [${activeModule}] 正在加紧开发中，敬请期待...`
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this);
    }
}
function HRSystemPage() {
    const [activeModule, setActiveModule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    // Sync state with URL hash
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleHashChange = ()=>{
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                setActiveModule(hash);
            }
        };
        // Initial load
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return ()=>window.removeEventListener("hashchange", handleHashChange);
    }, []);
    const handleModuleChange = (module)=>{
        setActiveModule(module);
        window.location.hash = module;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarProvider"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2d$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppSidebar"], {
                activeModule: activeModule,
                onModuleChange: handleModuleChange
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarInset"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppHeader"], {
                        activeModule: activeModule
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollArea"], {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleContent, {
                                activeModule: activeModule
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_a35aa2db._.js.map