import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
    // Base styles - common to all variants
    [
        'inline-flex items-center justify-center gap-2',
        'font-semibold tracking-wide antialiased',
        'rounded-md border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'active:scale-[0.98] transform-gpu',
        'cursor-pointer',
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-neutral-900 text-white border-transparent',
                    'hover:bg-neutral-800 active:bg-neutral-950',
                    'focus-visible:ring-neutral-400',
                    'dark:bg-neutral-100 dark:text-neutral-900',
                    'dark:hover:bg-neutral-200 dark:active:bg-neutral-50',
                    'dark:focus-visible:ring-neutral-600',
                ],
                primary: [
                    'bg-lime-400 text-black border-transparent',
                    'hover:bg-lime-700 active:bg-lime-800',
                    'focus-visible:ring-lime-400',
                    'dark:bg-lime-600 dark:hover:bg-lime-800 dark:active:bg-lime-900',
                    'dark:focus-visible:ring-lime-500',
                ],
                destructive: [
                    'bg-red-600 text-white border-transparent',
                    'hover:bg-red-700 active:bg-red-800',
                    'focus-visible:ring-red-400',
                    'dark:bg-red-700 dark:hover:bg-red-800 dark:active:bg-red-900',
                    'dark:focus-visible:ring-red-500',
                ],
                outline: [
                    'bg-transparent text-neutral-900 border-neutral-300',
                    'hover:bg-neutral-50 hover:border-neutral-400',
                    'active:bg-neutral-100',
                    'focus-visible:ring-neutral-400',
                    'dark:text-neutral-100 dark:border-neutral-700',
                    'dark:hover:bg-neutral-900 dark:hover:border-neutral-600',
                    'dark:active:bg-neutral-800',
                    'dark:focus-visible:ring-neutral-500',
                ],
                secondary: [
                    'bg-neutral-100 text-neutral-900 border-transparent',
                    'hover:bg-neutral-200 active:bg-neutral-300',
                    'focus-visible:ring-neutral-400',
                    'dark:bg-neutral-800 dark:text-neutral-100',
                    'dark:hover:bg-neutral-700 dark:active:bg-neutral-600',
                    'dark:focus-visible:ring-neutral-500',
                ],
                ghost: [
                    'bg-transparent text-neutral-900 border-transparent',
                    'hover:bg-neutral-100 active:bg-neutral-200',
                    'focus-visible:ring-neutral-400',
                    'dark:text-neutral-100',
                    'dark:hover:bg-neutral-800 dark:active:bg-neutral-700',
                    'dark:focus-visible:ring-neutral-500',
                ],
                link: [
                    'bg-transparent text-neutral-900 border-transparent underline-offset-4',
                    'hover:underline active:no-underline',
                    'focus-visible:ring-neutral-400 focus-visible:ring-offset-0',
                    'dark:text-neutral-100',
                    'dark:focus-visible:ring-neutral-500',
                ],
                success: [
                    'bg-lime-600 text-white border-transparent',
                    'hover:bg-lime-700 active:bg-lime-800',
                    'focus-visible:ring-lime-400',
                    'dark:bg-lime-700 dark:hover:bg-lime-800 dark:active:bg-lime-900',
                    'dark:focus-visible:ring-lime-500',
                ],
            },
            size: {
                sm: 'text-xs px-3 py-1.5 h-8',
                default: 'text-sm px-4 py-2 h-10',
                lg: 'text-base px-6 py-3 h-12',
                xl: 'text-lg px-8 py-4 h-14',
                icon: 'h-10 w-10 p-2.5',
                'icon-sm': 'h-8 w-8 p-2',
            },
            fullWidth: {
                true: 'w-full',
                false: 'w-auto',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            fullWidth: false,
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    srText?: string
    ref?: React.Ref<HTMLButtonElement>
}

export function Button({
    className,
    variant,
    size,
    fullWidth,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    srText,
    disabled,
    children,
    type = 'button',
    ref,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading

    return (
        <button
            className={cn(
                buttonVariants({ variant, size, fullWidth }),
                loading && 'cursor-wait',
                className
            )}
            ref={ref}
            disabled={isDisabled}
            type={type}
            aria-disabled={isDisabled}
            aria-busy={loading}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {!loading && leftIcon && (
                <span className="flex-shrink-0" aria-hidden="true">
                    {leftIcon}
                </span>
            )}
            {srText && <span className="sr-only">{srText}</span>}
            {children}
            {!loading && rightIcon && (
                <span className="flex-shrink-0" aria-hidden="true">
                    {rightIcon}
                </span>
            )}
        </button>
    )
}

export { buttonVariants }
