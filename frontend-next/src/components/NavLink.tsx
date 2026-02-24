"use client";

import { forwardRef } from "react";
import { NavLink as RouterNavLink } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps {
    to: string;
    className?: string;
    activeClassName?: string;
    pendingClassName?: string;
    children?: React.ReactNode;
    [key: string]: any;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
    ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
        return (
            <RouterNavLink
                ref={ref}
                to={to}
                className={({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                    cn(className, isActive && activeClassName, isPending && pendingClassName)
                }
                {...props}
            />
        );
    },
);

NavLink.displayName = "NavLink";

export { NavLink };
