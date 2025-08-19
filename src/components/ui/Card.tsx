import { cn } from "@/utils/cn"


interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    ref?: React.Ref<HTMLDivElement>
}

const CardRoot = ({ className, children, ref, ...props }: CardRootProps) => {
    return (
        <div
            ref={ref}
            className={cn(
                "font-sans",
                "group relative rounded-lg border border-card-border bg-card-background/50 text-card-foreground shadow-sm",
                "bg-linear-to-r from-neutral-200/70 dark:from-neutral-950/70 from-0% via-neutral-200/50 dark:via-neutral-950/50 via-30% to-transparent to-100%",
                "p-4 sm:p-5 transition-all duration-200 ease-in-out",
                "w-full min-w-[18.75rem]",
                "hover:shadow-md hover:bg-card-background/80 hover:border-border-primary/20",
                "dark:hover:bg-card-background/90 dark:hover:border-border-primary/30",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                className,
            )}
            role="article"
            {...props}
        >
            {children}
        </div>
    )
}
CardRoot.displayName = "Card.Root"


interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    ref?: React.Ref<HTMLDivElement>
}

const CardHeader = ({ className, children, ref, ...props }: CardHeaderProps) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-col space-y-2 pb-3",
                "sm:space-y-3 sm:pb-4",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}
CardHeader.displayName = "Card.Header"


interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    ref?: React.Ref<HTMLHeadingElement>
}

const CardTitle = ({ className, children, as: Comp = "h3", ref, ...props }: CardTitleProps) => {
    return (
        <Comp
            ref={ref}
            className={cn(

                "text-lg font-semibold leading-tight tracking-tight",
                "sm:text-lg sm:leading-tight",
                "transition-colors duration-200 ease-in-out",
                "text-card-foreground group-hover:text-text-primary",

                "min-h-[24px]",
                className,
            )}
            {...props}
        >
            {children}
        </Comp>
    )
}
CardTitle.displayName = "Card.Title"


interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode
    ref?: React.Ref<HTMLParagraphElement>
}

const CardDescription = ({ className, children, ref, ...props }: CardDescriptionProps) => {
    return (
        <p
            ref={ref}
            className={cn(

                "max-w-3xs",
                "text-sm text-muted-foreground truncate",
                "sm:text-base",

                "leading-relaxed",
                className,
            )}
            {...props}
        >
            {children}
        </p>
    )
}
CardDescription.displayName = "Card.Description"


interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    ref?: React.Ref<HTMLDivElement>
}

const CardActions = ({ className, children, ref, ...props }: CardActionsProps) => {
    return (
        <div ref={ref} className={cn("flex items-center justify-between pt-3 mt-auto", "sm:pt-4", className)} {...props}>
            {children}
        </div>
    )
}
CardActions.displayName = "Card.Actions"


interface ExpirationTimeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode
    ref?: React.Ref<HTMLSpanElement>
}

const ExpirationTime = ({ className, children, ref, ...props }: ExpirationTimeProps) => {
    return (
        <span ref={ref} className={cn("text-xs text-muted-foreground font-medium", "sm:text-sm", className)} {...props}>
            {children}
        </span>
    )
}
ExpirationTime.displayName = "Card.ExpirationTime"




export const Card = {
    Root: CardRoot,
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Actions: CardActions,
    ExpirationTime: ExpirationTime
}
