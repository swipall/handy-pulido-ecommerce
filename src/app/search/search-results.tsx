import { ProductGrid } from "@/components/commerce/product-grid";
import { ProductGridSkeleton } from "@/components/shared/product-grid-skeleton";
import { getAuthUserCustomerId } from '@/lib/auth';
import { buildSearchInput, getCurrentPage } from "@/lib/search-helpers";
import { searchProducts } from '@/lib/swipall/rest-adapter';
import { Suspense } from "react";

interface SearchResultsProps {
    searchParams: Promise<{
        page?: string
    }>
}

export async function SearchResults({searchParams}: SearchResultsProps) {
    const searchParamsResolved = await searchParams;
    const page = getCurrentPage(searchParamsResolved);
    const customerId = await getAuthUserCustomerId();

    const productDataPromise = searchProducts(
        buildSearchInput({searchParams: searchParamsResolved}),
        customerId
    );


    return (
        <div className="flex gap-8">
            <div className="flex-1">
                <Suspense fallback={<ProductGridSkeleton/>}>
                    <ProductGrid productDataPromise={productDataPromise} currentPage={page} take={12}/>
                </Suspense>
            </div>
        </div>
    )
}