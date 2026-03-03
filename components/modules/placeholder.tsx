"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Construction } from "lucide-react"

interface PlaceholderModuleProps {
  title: string
  description: string
}

export function PlaceholderModule({ title, description }: PlaceholderModuleProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Construction className="size-8" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">{description}，该功能模块正在开发中，敬请期待。</p>
          <Button variant="outline" className="mt-6">返回工作台</Button>
        </CardContent>
      </Card>
    </div>
  )
}
