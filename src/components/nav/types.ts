export interface NavItemOptionsProps {
    depth?: number;
    hasChild?: boolean;
}

export interface NavItemStateProps {
    open?: boolean;
    active?: boolean;
    disabled?: boolean;
    hidden?: boolean;
}

export type NavItemDataProps = {
    path: string;
    title: string;
    icon?: string | React.ReactNode;
    info?: React.ReactNode;
    caption?: string;
    auth?: string[];
    children?: NavItemDataProps[];
} & NavItemStateProps;
