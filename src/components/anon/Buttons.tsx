import { deleteAnonURL } from "@/actions/anon/actions";
import { Button } from "../ui/Button";
import { cn } from "@/utils/cn";
import { X } from "../ui/icons/X";

interface DeleteButtonProps {
  id: string
  children?: React.ReactNode
  loading?: boolean
  className?: string
}

export function DeleteAnonURL({ children, id, loading, className }: DeleteButtonProps) {
  const deleteAnonURLWithId = deleteAnonURL.bind(null, id)
  return (
    <form action={deleteAnonURLWithId}>
      <Button type="submit" variant="ghost" size="icon" loading={loading}
        className={cn(
          "size-7 p-0.5",
          "relative",
          "before:content-['']",
          "before:absolute before:inset-0 before:z-50 before:block",
          "before:top-2/4 before:left-2/4 before:transform-[translate(-50%,-50%)]",
          "before:w-full before:h-full  before:min-w-11 before:min-h-11",
          className
        )}
        aria-label="Delete shortened URL">
        {!loading && <X className="h-4 w-4 block" />}
      </Button>
    </form>
  );
}