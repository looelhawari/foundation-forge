"use client";

/**
 * Router Compatibility Layer
 * ─────────────────────────────────────────────────────────
 * Provides react-router-dom-compatible APIs using Next.js App Router.
 * This allows existing components to keep their <Link to="..."> syntax
 * and hook usage (useNavigate, useLocation, etc.) without code changes.
 *
 * MIGRATION RULE: NO visual/behavioral changes. Only infrastructure swap.
 */

import React from "react";
import NextLink from "next/link";
import {
    useRouter as useNextRouter,
    usePathname,
    useParams as useNextParams,
    useSearchParams as useNextSearchParams,
} from "next/navigation";

// ─────────────────────────────────────────────────────────
// Link component — maps `to` prop to Next.js `href`
// ─────────────────────────────────────────────────────────
interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    to: string;
    replace?: boolean;
    state?: any;
    children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ to, replace, state, children, ...rest }, ref) => {
        return (
            <NextLink ref={ref} href={to} replace={replace} {...rest}>
                {children}
            </NextLink>
        );
    }
);
Link.displayName = "Link";

// ─────────────────────────────────────────────────────────
// NavLink — compatible with react-router-dom NavLink
// Supports callback-style className with isActive/isPending
// ─────────────────────────────────────────────────────────
interface NavLinkProps {
    to: string;
    end?: boolean;
    className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
    children?: React.ReactNode | ((props: { isActive: boolean; isPending: boolean }) => React.ReactNode);
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    target?: string;
    rel?: string;
    style?: React.CSSProperties;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ to, end = false, className, children, onClick, target, rel, style }, ref) => {
        const pathname = usePathname();
        const isActive = end ? pathname === to : pathname.startsWith(to);
        const isPending = false; // Next.js doesn't have a pending state for navigation

        const resolvedClassName = typeof className === "function"
            ? className({ isActive, isPending })
            : className;

        const resolvedChildren = typeof children === "function"
            ? children({ isActive, isPending })
            : children;

        return (
            <NextLink ref={ref} href={to} className={resolvedClassName} onClick={onClick} target={target} rel={rel} style={style}>
                {resolvedChildren}
            </NextLink>
        );
    }
);
NavLink.displayName = "NavLink";

// ─────────────────────────────────────────────────────────
// useNavigate — returns a navigate function
// ─────────────────────────────────────────────────────────
function useNavigate() {
    const router = useNextRouter();
    return React.useCallback(
        (to: string | number, options?: { replace?: boolean; state?: any }) => {
            if (typeof to === "number") {
                if (to === -1) {
                    router.back();
                } else {
                    // Next.js doesn't support forward navigation by number
                    router.back();
                }
                return;
            }

            if (options?.replace) {
                router.replace(to);
            } else {
                router.push(to);
            }
        },
        [router]
    );
}

// ─────────────────────────────────────────────────────────
// useLocation — returns a location-like object
// ─────────────────────────────────────────────────────────
function useLocation() {
    const pathname = usePathname();

    return React.useMemo(
        () => ({
            pathname,
            search: typeof window !== "undefined" ? window.location.search : "",
            hash: typeof window !== "undefined" ? window.location.hash : "",
            state: null as any, // Next.js doesn't support location state
            key: "default",
        }),
        [pathname]
    );
}

// ─────────────────────────────────────────────────────────
// useParams — re-export from Next.js
// ─────────────────────────────────────────────────────────
function useParams<T extends Record<string, string> = Record<string, string>>(): T {
    return useNextParams() as T;
}

// ─────────────────────────────────────────────────────────
// useSearchParams — compatible wrapper
// Returns [searchParams, setSearchParams] like react-router-dom v6
// ─────────────────────────────────────────────────────────
function useSearchParams(): [URLSearchParams, (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void] {
    const searchParams = useNextSearchParams();
    const router = useNextRouter();
    const pathname = usePathname();

    const setSearchParams = React.useCallback(
        (nextParams: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => {
            const newParams = typeof nextParams === "function"
                ? nextParams(new URLSearchParams(searchParams.toString()))
                : nextParams;
            router.push(`${pathname}?${newParams.toString()}`);
        },
        [searchParams, router, pathname]
    );

    return [new URLSearchParams(searchParams.toString()), setSearchParams];
}

// ─────────────────────────────────────────────────────────
// Navigate component — redirects imperatively
// ─────────────────────────────────────────────────────────
interface NavigateProps {
    to: string;
    replace?: boolean;
    state?: any;
}

function Navigate({ to, replace = false }: NavigateProps) {
    const router = useNextRouter();

    React.useEffect(() => {
        if (replace) {
            router.replace(to);
        } else {
            router.push(to);
        }
    }, [to, replace, router]);

    return null;
}

// ─────────────────────────────────────────────────────────
// BrowserRouter — no-op wrapper (routing is handled by Next.js)
// ─────────────────────────────────────────────────────────
function BrowserRouter({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

// Stub for Routes/Route (not used in Next.js but prevents import errors)
function Routes({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

function Route(_props: any) {
    return null;
}

// ─────────────────────────────────────────────────────────
// Re-export types for compatibility
// ─────────────────────────────────────────────────────────
type NavLinkPropsCompat = NavLinkProps;

export {
    Link,
    NavLink,
    NavLink as RouterNavLink,
    Navigate,
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useLocation,
    useParams,
    useSearchParams,
};

export type { NavLinkProps, LinkProps };
