import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { useId } from 'react'

const inputVariants = cva(
    [
        'flex w-full rounded-md border transition-all duration-200',
        'bg-white dark:bg-neutral-900',
        'text-neutral-900 dark:text-neutral-100',
        'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'read-only:cursor-default read-only:focus-visible:ring-0',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    ],
    {
        variants: {
            variant: {
                default: [
                    'border-neutral-300 dark:border-neutral-900',
                    'focus-visible:ring-2 focus-visible:ring-lime-500',
                    'dark:focus-visible:ring-offset-neutral-900',
                    'focus-visible:outline-none',
                ],
                error: [
                    'border-red-300 dark:border-red-700',
                    'focus-visible:border-red-400 dark:focus-visible:border-red-600',
                    'focus-visible:ring-red-400 dark:focus-visible:ring-red-500',
                    'bg-red-50/50 dark:bg-red-950/20',
                ],
                success: [
                    'border-green-300 dark:border-green-700',
                    'focus-visible:border-green-400 dark:focus-visible:border-green-600',
                    'focus-visible:ring-green-400 dark:focus-visible:ring-green-500',
                    'bg-green-50/50 dark:bg-green-950/20',
                ],
            },
            size: {
                sm: 'h-8 px-3 py-1.5 text-xs',
                default: 'h-12 px-3 py-3 text-sm',
                lg: 'h-12 px-4 py-3 text-base',
                xl: 'h-14 px-4 py-4 text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

const inputWrapperVariants = cva(
    'relative flex items-center',
    {
        variants: {
            size: {
                sm: 'text-xs',
                default: 'text-sm',
                lg: 'text-base',
                xl: 'text-lg'
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
)

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    loading?: boolean
    label?: string
    helperText?: string
    errorText?: string
    successText?: string
    ref?: React.Ref<HTMLInputElement>
}

export function Input({
    className,
    variant,
    size,
    type = 'text',
    leftIcon,
    rightIcon,
    loading = false,
    label,
    helperText,
    errorText,
    successText,
    disabled,
    id,
    ref,
    ...props
}: InputProps) {
    const inputId = id || `input-${useId()}`
    const helperTextId = `${inputId}-helper`
    const errorTextId = `${inputId}-error`

    // Determine the actual variant based on error/success states
    const actualVariant = errorText ? 'error' : successText ? 'success' : variant

    const isDisabled = disabled || loading

    const paddingLeft = leftIcon ? (size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = (rightIcon || loading) ? (size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-12' : 'pr-10') : ''

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        'block font-medium mb-2',
                        size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
                        actualVariant === 'error'
                            ? 'text-red-700 dark:text-red-400'
                            : actualVariant === 'success'
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-neutral-700 dark:text-neutral-300'
                    )}
                >
                    {label}
                </label>
            )}

            <div className={inputWrapperVariants({ size })}>
                {leftIcon && (
                    <div
                        className={cn(
                            'absolute left-0 flex items-center justify-center pointer-events-none',
                            'text-neutral-500 dark:text-neutral-400',
                            size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
                        )}
                        aria-hidden="true"
                    >
                        {leftIcon}
                    </div>
                )}

                <input
                    type={type}
                    id={inputId}
                    ref={ref}
                    disabled={isDisabled}
                    className={cn(
                        inputVariants({ variant: actualVariant, size }),
                        paddingLeft,
                        paddingRight,
                        className
                    )}
                    aria-describedby={cn(
                        helperText && helperTextId,
                        errorText && errorTextId
                    )}
                    aria-invalid={!!errorText}
                    {...props}
                />

                {(rightIcon || loading) && (
                    <div
                        className={cn(
                            'absolute right-0 flex items-center justify-center',
                            'text-neutral-500 dark:text-neutral-400',
                            size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10',
                            loading ? 'pointer-events-none' : 'pointer-events-auto'
                        )}
                        aria-hidden="true"
                    >
                        {loading ? (
                            <svg
                                className={cn(
                                    'animate-spin',
                                    size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
                                )}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
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
                        ) : (
                            rightIcon
                        )}
                    </div>
                )}
            </div>

            {/* Helper/Error/Success Text */}
            {(helperText || errorText || successText) && (
                <div className="mt-2">
                    {errorText && (
                        <p
                            id={errorTextId}
                            className={cn(
                                'text-red-600 dark:text-red-400',
                                size === 'sm' ? 'text-xs' : 'text-sm'
                            )}
                            role="alert"
                        >
                            {errorText}
                        </p>
                    )}
                    {successText && !errorText && (
                        <p
                            className={cn(
                                'text-green-600 dark:text-green-400',
                                size === 'sm' ? 'text-xs' : 'text-sm'
                            )}
                        >
                            {successText}
                        </p>
                    )}
                    {helperText && !errorText && !successText && (
                        <p
                            id={helperTextId}
                            className={cn(
                                'text-neutral-500 dark:text-neutral-400',
                                size === 'sm' ? 'text-xs' : 'text-sm'
                            )}
                        >
                            {helperText}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export { inputVariants }
