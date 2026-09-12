import { MainLayout } from "@/components/templates/main-layout";
import { Spinner } from "@/components/atoms";

/**
 * Route-transition fallback. The App Router renders this in place of the page
 * while a client-side navigation is still fetching the destination's payload -
 * 1-3 s on this host - so the user sees the header, a spinner and a stable
 * layout instead of the previous page sitting frozen.
 *
 * Wrapped in MainLayout on purpose: pages render MainLayout themselves, so
 * without it the header/footer would vanish for the duration of the fallback
 * and snap back when the page arrives.
 */
export default function Loading() {
    return (
        <MainLayout>
            <div
                className="container mx-auto flex min-h-[50vh] items-center justify-center px-4 py-20"
                aria-busy="true"
                aria-live="polite"
            >
                <Spinner />
            </div>
        </MainLayout>
    );
}
