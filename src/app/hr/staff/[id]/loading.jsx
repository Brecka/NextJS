export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-8 w-32 bg-gray-200 rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile skeleton */}
        <div className="md:w-1/3 space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-gray-300" />
          </div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Files section skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-gray-200 rounded" />
            <div className="h-8 w-24 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-2/4" />
                <div className="flex justify-between mt-2">
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
