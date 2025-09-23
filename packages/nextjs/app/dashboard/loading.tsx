import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-32 h-6" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-64 h-8 mb-2" />
          <Skeleton className="w-96 h-5" />
        </div>

        {/* Balance Cards Skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-4 h-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-20 h-8 mb-1" />
                <Skeleton className="w-16 h-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions and Advances Skeleton */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-48 h-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="w-full h-10" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Skeleton */}
        <div className="grid lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-48 h-4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="w-24 h-5" />
                        <Skeleton className="w-16 h-5" />
                      </div>
                      <Skeleton className="w-32 h-4 mb-1" />
                      <Skeleton className="w-20 h-4 mb-1" />
                      <Skeleton className="w-28 h-3" />
                    </div>
                  ))}
                </div>
                <Skeleton className="w-full h-10 mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
