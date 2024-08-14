import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-all',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline:
                    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
            duolingo: {
                true: 'border-b-4 active:border-b active:translate-y-[1px] border-t border-l border-r',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
        compoundVariants: [
            {
                variant: 'default',
                duolingo: true,
                className: 'border-b-green-700',
            },
            {
                variant: 'destructive',
                duolingo: true,
                className: 'border-b-red-700',
            },
        ],
    },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
