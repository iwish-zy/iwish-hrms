"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Briefcase, Users, UserCheck, Clock, Eye, MessageSquare } from "lucide-react"
import { recruitments } from "@/lib/mock-data"
import { useState } from "react"

const recruitStatusColors: Record<string, string> = {
  "招聘中": "bg-primary/10 text-primary border-primary/20",
  "面试中": "bg-warning/10 text-warning border-warning/20",
  "已完成": "bg-success/10 text-success border-success/20",
}

const candidates = [
  { id: "CA001", name: "刘一", position: "高级前端工程师", stage: "技术面试", rating: 4.2, source: "猎聘", date: "2026-02-20" },
  { id: "CA002", name: "陈二", position: "产品经理", stage: "HR面试", rating: 3.8, source: "Boss直聘", date: "2026-02-21" },
  { id: "CA003", name: "张卫", position: "高级前端工程师", stage: "终面", rating: 4.5, source: "内推", date: "2026-02-18" },
  { id: "CA004", name: "李萌", position: "UI/UX设计师", stage: "初筛", rating: 3.5, source: "拉勾", date: "2026-02-23" },
  { id: "CA005", name: "王刚", position: "Java开发工程师", stage: "技术面试", rating: 4.0, source: "内推", date: "2026-02-22" },
  { id: "CA006", name: "赵薇", position: "数据分析师", stage: "笔试", rating: 3.9, source: "智联", date: "2026-02-19" },
]

const stageColors: Record<string, string> = {
  "初筛": "bg-muted text-muted-foreground",
  "笔试": "bg-chart-5/10 text-chart-5",
  "技术面试": "bg-primary/10 text-primary",
  "HR面试": "bg-warning/10 text-warning",
  "终面": "bg-success/10 text-success",
}

export function RecruitmentModule() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">招聘管理</h1>
          <p className="text-muted-foreground text-sm mt-1">管理招聘需求、候选人跟踪与面试安排</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 size-4" />发布职位</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>发布招聘职位</DialogTitle>
              <DialogDescription>填写职位信息并发布到招聘渠道</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>职位名称</Label>
                <Input placeholder="请输入职位名称" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>所属部门</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="选择部门" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">技术部</SelectItem>
                    <SelectItem value="product">产品部</SelectItem>
                    <SelectItem value="design">设计部</SelectItem>
                    <SelectItem value="sales">销售部</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>薪资范围</Label>
                <Input placeholder="如: 25-35K" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>招聘人数</Label>
                <Input type="number" placeholder="1" />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <Label>职位描述</Label>
                <Textarea placeholder="请输入职位描述和要求" className="min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button>发布职位</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "招聘中职位", value: "5", icon: Briefcase },
          { label: "总候选人", value: "217", icon: Users },
          { label: "待面试", value: "41", icon: Clock },
          { label: "本月录用", value: "3", icon: UserCheck },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
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

      <Tabs defaultValue="positions">
        <TabsList>
          <TabsTrigger value="positions">招聘职位</TabsTrigger>
          <TabsTrigger value="candidates">候选人管理</TabsTrigger>
          <TabsTrigger value="talent-pool">人才库</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {recruitments.map((job) => (
              <Card key={job.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{job.position}</h3>
                        {job.urgent && <Badge variant="destructive" className="text-xs">急聘</Badge>}
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{job.department}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className={recruitStatusColors[job.status] || ""}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">投递人数</span>
                      <span className="text-lg font-semibold text-foreground">{job.applicants}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">面试安排</span>
                      <span className="text-lg font-semibold text-foreground">{job.interviews}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>招聘进度</span>
                      <span>{Math.round((job.interviews / job.applicants) * 100)}%</span>
                    </div>
                    <Progress value={(job.interviews / job.applicants) * 100} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="搜索候选人..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>候选人</TableHead>
                    <TableHead>应聘职位</TableHead>
                    <TableHead>当前阶段</TableHead>
                    <TableHead>评分</TableHead>
                    <TableHead>来源</TableHead>
                    <TableHead>投递日期</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates
                    .filter((c) => c.name.includes(search) || c.position.includes(search))
                    .map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">{candidate.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{candidate.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{candidate.position}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={stageColors[candidate.stage] || ""}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-foreground">{candidate.rating}</span>
                            <span className="text-xs text-muted-foreground">/5</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{candidate.source}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{candidate.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="size-8"><Eye className="size-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="size-8"><MessageSquare className="size-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="talent-pool" className="mt-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Users className="size-12 text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-medium text-foreground">人才库</h3>
              <p className="mt-1 text-sm text-muted-foreground">未录用但优秀的候选人将自动归入人才库，便于后续联系</p>
              <Button variant="outline" className="mt-4">查看人才库</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
