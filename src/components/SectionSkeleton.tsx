import { Skeleton } from "./ui/skeleton";

interface SectionSkeletonProps {
  height?: string;
  className?: string;
}

export function SectionSkeleton({ height = "h-[600px]", className = "" }: SectionSkeletonProps) {
  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden bg-black/30 border border-border p-6 ${className}`}>
      {/* Section header */}
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-5 w-full max-w-2xl mb-8" />
      
      {/* Section content - generic layout that works for most sections */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}

// Specific section skeletons with appropriate heights and structures
export function AboutSectionSkeleton() {
  return <SectionSkeleton height="h-[600px]" />;
}

export function ExperienceSectionSkeleton() {
  return <SectionSkeleton height="h-[800px]" />;
}

export function SkillsSectionSkeleton() {
  return <SectionSkeleton height="h-[700px]" />;
}

export function PortfolioHighlightsSkeleton() {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-black/30 border border-border p-6">
      {/* Section header */}
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-5 w-full max-w-2xl mb-8" />
      
      {/* Portfolio cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
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
  );
}

export function BlogHighlightsSkeleton() {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden bg-black/30 border border-border p-6">
      {/* Section header */}
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-5 w-full max-w-2xl mb-8" />
      
      {/* Blog cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton className="aspect-video w-full mb-3" />
            <div className="flex items-center space-x-4 mb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactCTASkeleton() {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden bg-black/30 border border-border p-6">
      {/* Section header */}
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-5 w-full max-w-2xl mb-8" />
      
      {/* Contact form or buttons */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-12 w-64" />
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}