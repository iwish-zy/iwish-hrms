"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, TrendingUp, DollarSign, Users, Download, Calculator, FileText } from "lucide-react"
import { salaryData, payrollList } from "@/lib/mock-data"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart } from "recharts"

const benefitsData = [
  { category: "五险一金", items: ["养老保险 (企业16%+个人8%)", "医疗保险 (企业8%+个人2%)", "失业保险 (企业0.7%+个人0.3%)", "工伤保险 (企业0.2%)", "生育保险 (企业0.5%)", "住房公积金 (企业12%+个人12%)"] },
  { category: "固定补贴", items: ["交通补贴 500元/月", "餐饮补贴 400元/月", "通讯补贴 200元/月", "住房补贴 1000元/月"] },
  { category: "节日福利", items: ["春节礼品 500元", "中秋礼品 300元", "端午礼品 200元", "生日礼金 500元", "结婚礼金 2000元"] },
  { category: "培训发展", items: ["年度培训预算 5000元/人", "外部课程报销 80%", "技术认证补贴 (全额)", "学历提升补贴 50%"] },
]

// 薪资结构分布图
const structureData = payrollList.map(p => ({
  name: p.name,
  baseSalary: p.baseSalary,
  positionSalary: p.positionSalary,
  performanceBonus: p.performanceBonus,
  overtimePay: p.overtimePay,
  allowance: p.allowance,
}))

export function SalaryModule() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">薪酬管理</h1>
          <p className="text-muted-foreground text-sm mt-1">薪资结构: 基本工资 + 岗位工资 + 绩效奖金 + 加班费 + 补贴，自动计算个税/社保/公积金</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Calculator className="mr-2 size-4" />薪资核算</Button>
          <Button variant="outline" size="sm"><FileText className="mr-2 size-4" />生成工资条</Button>
          <Button variant="outline" size="sm"><Download className="mr-2 size-4" />导出</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "本月工资总额", value: "300万", icon: Wallet, sub: "含奖金补贴" },
          { label: "人均薪资", value: "21,583", icon: DollarSign, sub: "元/月" },
          { label: "社保公积金", value: "48万", icon: TrendingUp, sub: "企业部分" },
          { label: "发薪人数", value: "139", icon: Users, sub: "本月" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <span className="text-xs text-muted-foreground">{stat.sub}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="payroll">
        <TabsList>
          <TabsTrigger value="payroll">薪资明细</TabsTrigger>
          <TabsTrigger value="structure">薪资结构</TabsTrigger>
          <TabsTrigger value="trend">薪资趋势</TabsTrigger>
          <TabsTrigger value="benefits">福利管理</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">2026年2月薪资明细</CardTitle>
                  <CardDescription>薪资 = 基本 + 岗位 + 绩效 + 加班 + 补贴 - 社保 - 公积金 - 个税</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">共 {payrollList.length} 人</Badge>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>员工</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead className="text-right">基本工资</TableHead>
                    <TableHead className="text-right">岗位工资</TableHead>
                    <TableHead className="text-right">绩效奖金</TableHead>
                    <TableHead className="text-right">加班费</TableHead>
                    <TableHead className="text-right">补贴</TableHead>
                    <TableHead className="text-right">社保</TableHead>
                    <TableHead className="text-right">公积金</TableHead>
                    <TableHead className="text-right">个税</TableHead>
                    <TableHead className="text-right">实发</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.department}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{item.baseSalary.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{item.positionSalary.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-success">{item.performanceBonus > 0 ? `+${item.performanceBonus.toLocaleString()}` : "0"}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{item.overtimePay > 0 ? `+${item.overtimePay.toLocaleString()}` : "0"}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{item.allowance.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-destructive">-{item.socialInsurance.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-destructive">-{item.housingFund.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-destructive">-{item.tax.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">{item.netSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={item.status === "已发放" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">薪资结构分布</CardTitle>
              <CardDescription>各员工薪资组成比例对比</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={structureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                  <Bar dataKey="baseSalary" name="基本工资" stackId="salary" fill="var(--chart-1)" />
                  <Bar dataKey="positionSalary" name="岗位工资" stackId="salary" fill="var(--chart-2)" />
                  <Bar dataKey="performanceBonus" name="绩效奖金" stackId="salary" fill="var(--chart-3)" />
                  <Bar dataKey="overtimePay" name="加班费" stackId="salary" fill="var(--chart-4)" />
                  <Bar dataKey="allowance" name="补贴" stackId="salary" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trend" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">薪资成本趋势</CardTitle>
              <CardDescription>近6个月公司薪资总额变化（单位：万元）</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                  <Area type="monotone" dataKey="totalSalary" name="工资总额" fill="var(--chart-1)" fillOpacity={0.15} stroke="var(--chart-1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="socialInsurance" name="社保公积金" fill="var(--chart-2)" fillOpacity={0.15} stroke="var(--chart-2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="bonus" name="奖金" fill="var(--chart-3)" fillOpacity={0.15} stroke="var(--chart-3)" strokeWidth={2} />
                  <Area type="monotone" dataKey="tax" name="个税" fill="var(--chart-4)" fillOpacity={0.15} stroke="var(--chart-4)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {benefitsData.map((benefit) => (
              <Card key={benefit.category}>
                <CardHeader>
                  <CardTitle className="text-base">{benefit.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {benefit.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-lg border border-border p-3">
                        <div className="size-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
