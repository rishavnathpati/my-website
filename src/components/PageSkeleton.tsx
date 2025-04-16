import { Skeleton } from "./ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      {/* Header section */}
      <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-lg mx-auto" />
      </div>
      
      {/* Main content */}
      <div className="space-y-8">
        {/* First section */}
        <div className="bg-black/30 border border-border rounded-lg p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mb-8" />
          
          <div className="space-y-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
        
        {/* Second section */}
        <div className="bg-black/30 border border-border rounded-lg p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton className="aspect-video w-full mb-3" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}