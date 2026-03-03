"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Award, TrendingUp, Plus, Eye, BarChart3, Star } from "lucide-react"
import { performanceData } from "@/lib/mock-data"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

const ratingColors: Record<string, string> = {
  "A+": "bg-success/10 text-success border-success/20",
  "A": "bg-success/10 text-success border-success/20",
  "B+": "bg-primary/10 text-primary border-primary/20",
  "B": "bg-warning/10 text-warning border-warning/20",
  "C": "bg-destructive/10 text-destructive border-destructive/20",
}

const radarData = [
  { subject: "工作质量", A: 92, fullMark: 100 },
  { subject: "工作效率", A: 85, fullMark: 100 },
  { subject: "团队协作", A: 88, fullMark: 100 },
  { subject: "创新能力", A: 78, fullMark: 100 },
  { subject: "专业技能", A: 95, fullMark: 100 },
  { subject: "沟通表达", A: 82, fullMark: 100 },
]

const ratingDistribution = [
  { rating: "A+", count: 2, percentage: 14 },
  { rating: "A", count: 3, percentage: 21 },
  { rating: "B+", count: 4, percentage: 29 },
  { rating: "B", count: 4, percentage: 29 },
  { rating: "C", count: 1, percentage: 7 },
]

const kpiTemplates = [
  { name: "销售业绩达成率", weight: 30, target: "100万", type: "定量" },
  { name: "客户满意度", weight: 20, target: "90分", type: "定量" },
  { name: "项目按时完成率", weight: 25, target: "95%", type: "定量" },
  { name: "团队协作评分", weight: 15, target: "优秀", type: "定性" },
  { name: "创新贡献", weight: 10, target: "至少1项", type: "定性" },
]

export function PerformanceModule() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">绩效管理</h1>
          <p className="text-muted-foreground text-sm mt-1">管理绩效考核方案、KPI指标设定与考核结果</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 size-4" />发起考核</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>发起绩效考核</DialogTitle>
              <DialogDescription>设置考核周期和参与人员</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>考核名称</Label>
                <Input placeholder="如: 2026年Q1绩效考核" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>考核周期</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="选择周期" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">月度</SelectItem>
                      <SelectItem value="quarterly">季度</SelectItem>
                      <SelectItem value="yearly">年度</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>考核模板</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="选择模板" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kpi">KPI考核</SelectItem>
                      <SelectItem value="360">360度评估</SelectItem>
                      <SelectItem value="okr">OKR评估</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>备注说明</Label>
                <Textarea placeholder="可选，添加备注" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button>发起考核</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "考核中", value: "1", icon: Target, color: "text-primary" },
          { label: "平均得分", value: "85.3", icon: BarChart3, color: "text-success" },
          { label: "已完成考核", value: "14", icon: Award, color: "text-chart-2" },
          { label: "待评分", value: "23", icon: Star, color: "text-warning" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex size-10 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="results">
        <TabsList>
          <TabsTrigger value="results">考核结果</TabsTrigger>
          <TabsTrigger value="kpi">KPI指标</TabsTrigger>
          <TabsTrigger value="analysis">绩效分析</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Q4 2025 绩效考核结果</CardTitle>
                <Badge variant="secondary">已完成</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>员工信息</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>KPI得分</TableHead>
                    <TableHead>评级</TableHead>
                    <TableHead>评语</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">{item.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{item.kpiScore}</span>
                          <Progress value={item.kpiScore} className="h-1.5 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={ratingColors[item.rating] || ""}>
                          {item.rating}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{item.comment}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="size-8"><Eye className="size-3.5" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpi" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">KPI指标模板</CardTitle>
                  <CardDescription>通用绩效考核指标设置</CardDescription>
                </div>
                <Button size="sm" variant="outline"><Plus className="mr-2 size-4" />添加指标</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>指标名称</TableHead>
                    <TableHead>权重</TableHead>
                    <TableHead>目标值</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>权重占比</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpiTemplates.map((kpi) => (
                    <TableRow key={kpi.name}>
                      <TableCell className="font-medium">{kpi.name}</TableCell>
                      <TableCell>{kpi.weight}%</TableCell>
                      <TableCell className="text-muted-foreground">{kpi.target}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{kpi.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={kpi.weight} className="h-1.5 w-20" />
                          <span className="text-xs text-muted-foreground">{kpi.weight}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">评级分布</CardTitle>
                <CardDescription>Q4 2025 员工评级占比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ratingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="rating" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="count" name="人数" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">能力雷达图</CardTitle>
                <CardDescription>团队平均能力维度分析</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                    <PolarRadiusAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <Radar name="评分" dataKey="A" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
