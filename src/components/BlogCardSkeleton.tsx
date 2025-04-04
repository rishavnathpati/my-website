import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="flex-grow p-5">
        <div className="flex items-center space-x-4 text-xs mb-2">
          <Skeleton className="h-4 w-24" /> {/* Date */}
          <Skeleton className="h-4 w-20" /> {/* Read time */}
        </div>
        <Skeleton className="h-6 w-full mb-2" /> {/* Title line 1 */}
        <Skeleton className="h-6 w-5/6 mb-4" /> {/* Title line 2 */}
        <Skeleton className="h-4 w-full mb-1" /> {/* Excerpt line 1 */}
        <Skeleton className="h-4 w-full mb-1" /> {/* Excerpt line 2 */}
        <Skeleton className="h-4 w-3/4 mb-4" /> {/* Excerpt line 3 */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>
      {/* No CardFooter needed for blog posts based on BlogHighlights */}
    </Card>
  );
}