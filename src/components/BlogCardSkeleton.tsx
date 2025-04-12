import { Card, CardContent, CardHeader } from "./ui/card"; // Use relative path
import { Skeleton } from "./ui/skeleton"; // Use relative path

export function BlogCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden bg-black/30 border border-border"> {/* Match card styling */}
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="flex-grow p-5">
        {/* Skeleton for Date/Read Time */}
        <div className="flex items-center space-x-4 text-xs mb-2">
          <Skeleton className="h-4 w-24" /> {/* Date */}
          <Skeleton className="h-4 w-20" /> {/* Read time */}
        </div>
        {/* Skeleton for Title */}
        <Skeleton className="h-6 w-full mb-2" /> {/* Title line 1 */}
        <Skeleton className="h-6 w-5/6 mb-4" /> {/* Title line 2 */}
        {/* Skeleton for Excerpt */}
        <Skeleton className="h-4 w-full mb-1" /> {/* Excerpt line 1 */}
        <Skeleton className="h-4 w-full mb-1" /> {/* Excerpt line 2 */}
        <Skeleton className="h-4 w-3/4 mb-4" /> {/* Excerpt line 3 */}
        {/* Skeleton for Tags */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-md" /> {/* Use rounded-md like Badge */}
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </CardContent>
      {/* No CardFooter */}
    </Card>
  );
}
