"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, TrendingDown, Users, Clock, DollarSign, Percent } from "lucide-react"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts"

const headcountTrend = [
  { month: "2025-07", total: 125, turnover: 3.2 },
  { month: "2025-08", total: 128, turnover: 2.8 },
  { month: "2025-09", total: 131, turnover: 2.1 },
  { month: "2025-10", total: 136, turnover: 2.5 },
  { month: "2025-11", total: 139, turnover: 1.5 },
  { month: "2025-12", total: 141, turnover: 3.0 },
  { month: "2026-01", total: 149, turnover: 1.8 },
  { month: "2026-02", total: 141, turnover: 1.2 },
]

const ageDistribution = [
  { range: "20-25", count: 18, color: "var(--chart-1)" },
  { range: "26-30", count: 52, color: "var(--chart-2)" },
  { range: "31-35", count: 42, color: "var(--chart-3)" },
  { range: "36-40", count: 20, color: "var(--chart-4)" },
  { range: "40+", count: 7, color: "var(--chart-5)" },
]

const educationData = [
  { level: "博士", count: 5, color: "var(--chart-1)" },
  { level: "硕士", count: 38, color: "var(--chart-2)" },
  { level: "本科", count: 72, color: "var(--chart-3)" },
  { level: "大专", count: 20, color: "var(--chart-4)" },
  { level: "其他", count: 4, color: "var(--chart-5)" },
]

const departmentCost = [
  { name: "技术部", salary: 120, headcount: 45 },
  { name: "销售部", salary: 65, headcount: 25 },
  { name: "市场部", salary: 48, headcount: 18 },
  { name: "运营部", salary: 35, headcount: 15 },
  { name: "产品部", salary: 32, headcount: 12 },
  { name: "设计部", salary: 25, headcount: 10 },
  { name: "财务部", salary: 18, headcount: 8 },
  { name: "人力资源部", salary: 15, headcount: 6 },
]

const kpiList = [
  { label: "员工总数", value: "139", change: "+3.7%", trend: "up", icon: Users },
  { label: "月度离职率", value: "1.2%", change: "-0.6%", trend: "down", icon: Percent },
  { label: "人均薪资成本", value: "2.16万", change: "+2.3%", trend: "up", icon: DollarSign },
  { label: "平均在职时长", value: "2.8年", change: "+0.3", trend: "up", icon: Clock },
]

export function AnalyticsModule() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">数据分析与报表</h1>
          <p className="text-muted-foreground text-sm mt-1">人力资源数据统计分析、人才结构与成本分析</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="2026">
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026年</SelectItem>
              <SelectItem value="2025">2025年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Download className="mr-2 size-4" />导出报表</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiList.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <kpi.icon className="size-5" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                {kpi.trend === "up" ? (
                  <TrendingUp className="size-3.5 text-success" />
                ) : (
                  <TrendingDown className="size-3.5 text-success" />
                )}
                <span className="text-xs text-success">{kpi.change}</span>
                <span className="text-xs text-muted-foreground">较上月</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">人力概览</TabsTrigger>
          <TabsTrigger value="structure">人才结构</TabsTrigger>
          <TabsTrigger value="cost">成本分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">员工人数与离职率趋势</CardTitle>
              <CardDescription>近8个月在职人数与月度离职率变化</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={headcountTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="total" name="在职人数" stroke="var(--chart-1)" strokeWidth={2} dot={{ fill: "var(--chart-1)" }} />
                  <Line yAxisId="right" type="monotone" dataKey="turnover" name="离职率(%)" stroke="var(--chart-3)" strokeWidth={2} dot={{ fill: "var(--chart-3)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">年龄分布</CardTitle>
                <CardDescription>员工年龄段分布</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="55%" height={220}>
                    <PieChart>
                      <Pie data={ageDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={4} dataKey="count">
                        {ageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2">
                    {ageDistribution.map((item) => (
                      <div key={item.range} className="flex items-center gap-2 text-sm">
                        <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.range}岁</span>
                        <span className="ml-auto font-medium text-foreground">{item.count}人</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">学历分布</CardTitle>
                <CardDescription>员工学历结构</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="55%" height={220}>
                    <PieChart>
                      <Pie data={educationData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={4} dataKey="count">
                        {educationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2">
                    {educationData.map((item) => (
                      <div key={item.level} className="flex items-center gap-2 text-sm">
                        <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.level}</span>
                        <span className="ml-auto font-medium text-foreground">{item.count}人</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cost" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">各部门薪资成本</CardTitle>
              <CardDescription>部门薪资总额对比（单位：万元）</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={departmentCost} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="salary" name="薪资总额(万)" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
