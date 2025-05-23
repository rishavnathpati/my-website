import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden bg-black/30 border border-border">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="flex-grow p-5">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>
      <CardFooter className="p-5 bg-muted/30 border-t border-border flex justify-between items-center">
        <Skeleton className="h-8 w-24" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
} 