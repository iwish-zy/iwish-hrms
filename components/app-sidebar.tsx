"use client"

import {
  Building2,
  Users,
  UserPlus,
  CalendarDays,
  Wallet,
  Target,
  User,
  BarChart3,
  Settings,
  LayoutDashboard,
  ChevronDown,
  FileText,
  UserCheck,
  Clock,
  Gift,
  Briefcase,
  Award,
  ClipboardList,
  Shield,
  Wrench,
  UserCog,
  LogIn,
  LogOut,
  ArrowRightLeft,
  Timer,
  CreditCard,
  Star,
  PieChart,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import useSWR from "swr"

// Icon mapping to convert string name from database to Lucide component
const IconMap: Record<string, any> = {
  Building2,
  Users,
  UserPlus,
  CalendarDays,
  Wallet,
  Target,
  User,
  BarChart3,
  Settings,
  LayoutDashboard,
  ChevronDown,
  FileText,
  UserCheck,
  Clock,
  Gift,
  Briefcase,
  Award,
  ClipboardList,
  Shield,
  Wrench,
  UserCog,
  LogIn,
  LogOut,
  ArrowRightLeft,
  Timer,
  CreditCard,
  Star,
  PieChart,
}

interface MenuItem {
  id: string
  label: string
  icon: string | null
  parent_id: string | null
  badge: string | null
  route?: string | null
}

interface AppSidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function AppSidebar({ activeModule, onModuleChange }: AppSidebarProps) {
  const { data: menuItems = [] } = useSWR<MenuItem[]>("/api/menu", fetcher)

  // Separate dashboard from groups
  const dashboardItem = menuItems.find(item => item.id === "dashboard")
  
  // Define groups manually based on parent_id structure from SQL
  const groupConfigs = [
    { id: "organization_group", label: "组织与主数据" },
    { id: "employee_group", label: "员工全生命周期" },
    { id: "attendance_group", label: "考勤与假期" },
    { id: "salary_group", label: "薪绩激励" },
    { id: "service_group", label: "自助平台" },
    { id: "data_group", label: "数据与决策" },
    { id: "system_group", label: "系统管理" },
  ]

  const moduleGroups = groupConfigs.map(group => ({
    label: group.label,
    items: menuItems.filter(item => item.parent_id === group.id)
  })).filter(group => group.items.length > 0)

  const normalizeRoute = (route?: string | null, id?: string) => {
    const target = (route || id || "").replace(/^\/+/, "")
    if (!target || target === "dashboard") return "/"
    return `/${target}`
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
            IW
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">艾维人事</span>
            <span className="text-[11px] text-sidebar-foreground/50">HR Management System</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {dashboardItem && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeModule === dashboardItem.id}
                      onClick={() => {
                        onModuleChange(dashboardItem.route || dashboardItem.id)
                      }}
                      tooltip={dashboardItem.label}
                    >
                    {dashboardItem.icon && IconMap[dashboardItem.icon] ? (
                      (() => {
                        const Icon = IconMap[dashboardItem.icon]
                        return <Icon className="size-4" />
                      })()
                    ) : (
                      <LayoutDashboard className="size-4" />
                    )}
                    <span>{dashboardItem.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {moduleGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full">
                  {group.label}
                  <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={activeModule === item.id || activeModule === (item.route || "")}
                          onClick={() => {
                            onModuleChange(item.route || item.id)
                          }}
                          tooltip={item.label}
                        >
                          {item.icon && IconMap[item.icon] ? (
                            (() => {
                              const Icon = IconMap[item.icon]
                              return <Icon className="size-4" />
                            })()
                          ) : (
                            <div className="size-4" />
                          )}
                          <span>{item.label}</span>
                          {item.route && (
                            <Badge variant="secondary" className="ml-2 text-[10px] bg-sidebar-primary/10 text-sidebar-foreground">
                              {normalizeRoute(item.route, item.id)}
                            </Badge>
                          )}
                          {item.badge && (
                            <Badge className="ml-auto h-5 px-1.5 text-[10px] bg-sidebar-primary text-sidebar-primary-foreground">
                              {item.badge}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="钱七 - HR经理">
              <Avatar className="size-8">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                  钱
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium text-sidebar-foreground">钱七</span>
                <span className="text-xs text-sidebar-foreground/50">HR经理 / 系统管理员</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
