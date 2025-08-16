/**
 * CalendarClock icon component.
 * @param className - Optional CSS class for styling the SVG element.
 */
export interface CalendarClockProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}
export function CalendarClock({ className, ...props }: CalendarClockProps) {
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
            <path d="M16 14v2.2l1.6 1" />
            <path d="M16 2v4" />
            <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
            <path d="M3 10h5" />
            <path d="M8 2v4" />
            <circle cx="16" cy="16" r="6" />
        </svg>
    );
}