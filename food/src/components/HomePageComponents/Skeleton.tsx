import { Skeleton } from "../ui/skeleton";


export function Skaleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-66 w-full rounded-xl" />
    </div>
  )
}
