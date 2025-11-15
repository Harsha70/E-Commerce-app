// app/products/[slug]/loading.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbsSkeleton } from "@/components/breadcrumbs-skeleton";

export default function LoadingProductPage() {
  return (
    <main className="container mx-auto p-4">
      <BreadcrumbsSkeleton />
      <Card className="mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Title */}
          <Skeleton className="h-8 w-2/3" />

          {/* Price + Badge */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>

          <Separator />

          {/* Description Title */}
          <Skeleton className="h-5 w-32" />

          {/* Description body */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
