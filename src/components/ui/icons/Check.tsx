/**
 * Check icon component.
 * @param className - Optional CSS class for styling the SVG element.
 */
export interface CheckProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}
export function Check({ className, ...props }: CheckProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}