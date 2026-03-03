"use client"

import { useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Dashboard } from "@/components/modules/dashboard"
import { OrganizationModule, PositionModule } from "@/components/modules/organization"
import { EmployeeModule } from "@/components/modules/employee"
import { AttendanceModule } from "@/components/modules/attendance"
import { RecruitmentModule } from "@/components/modules/recruitment"
import { SalaryModule } from "@/components/modules/salary"
import { PerformanceModule } from "@/components/modules/performance"
import { AnalyticsModule } from "@/components/modules/analytics"
import { SettingsModule } from "@/components/modules/settings"
import { OnboardingModule, ProbationModule, TransferModule, ResignationModule } from "@/components/modules/lifecycle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlaceholderModule } from "@/components/modules/placeholder"

const placeholderConfig: Record<string, { title: string; description: string }> = {
  // 可以在此为未上线模块填充文案，例如：
  // "service": { title: "自助平台", description: "自助平台正在建设中" },
}

function ModuleContent({ activeModule }: { activeModule: string }) {
  switch (activeModule) {
    case "dashboard":
      return <Dashboard />
    case "organization":
      return <OrganizationModule />
    case "position":
      return <PositionModule />
    case "employee":
      return <EmployeeModule />
    case "attendance":
      return <AttendanceModule />
    case "recruitment":
      return <RecruitmentModule />
    case "salary":
      return <SalaryModule />
    case "performance":
      return <PerformanceModule />
    case "analytics":
      return <AnalyticsModule />
    case "settings":
      return <SettingsModule />
    case "onboarding":
      return <OnboardingModule />
    case "probation":
      return <ProbationModule />
    case "transfer":
      return <TransferModule />
    case "resignation":
      return <ResignationModule />
    default:
      const config = placeholderConfig[activeModule]
      if (config) {
        return <PlaceholderModule title={config.title} description={config.description} />
      }
      return (
        <PlaceholderModule 
          title="功能开发中" 
          description={`模块 [${activeModule}] 正在加紧开发中，敬请期待...`} 
        />
      )
  }
}

const normalizeModuleFromPath = (pathname: string) => {
  const segment = pathname.replace(/^[#/]+/, "").split("/").filter(Boolean)[0]
  return segment || "dashboard"
}

export default function HRApp() {
  const router = useRouter()
  const pathname = usePathname()

  const activeModule = useMemo(() => normalizeModuleFromPath(pathname || "/"), [pathname])

  const handleModuleChange = (module: string) => {
    const target = module.replace(/^\/+/, "")
    const path = target === "dashboard" || target === "" ? "/" : `/${target}`
    router.push(path)
  }

  return (
    <SidebarProvider>
      <AppSidebar activeModule={activeModule} onModuleChange={handleModuleChange} />
      <SidebarInset>
        <AppHeader activeModule={activeModule} />
        <ScrollArea className="flex-1">
          <div className="p-6">
            <ModuleContent activeModule={activeModule} />
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}
