import type { CmsPost } from "@/lib/swipall/types/types";

export const FOOTER_BLOCK_TYPES = {
    Links: "footer-links",
    Categories: "footer-categories",
    Social: "footer-social",
} as const;

export type FooterBlockType = (typeof FOOTER_BLOCK_TYPES)[keyof typeof FOOTER_BLOCK_TYPES];

const FOOTER_TYPE_ORDER: FooterBlockType[] = [
    FOOTER_BLOCK_TYPES.Links,
    FOOTER_BLOCK_TYPES.Categories,
    FOOTER_BLOCK_TYPES.Social,
];

export function getFooterBlockType(post: CmsPost): FooterBlockType | null {
    const categorySlugs = new Set(post.categories?.map((category) => category.slug) ?? []);

    for (const type of FOOTER_TYPE_ORDER) {
        if (categorySlugs.has(type)) {
            return type;
        }
    }

    return null;
}

export function parseFooterPostBody<T>(body: string | null | undefined): T | null {
    if (!body) {
        return null;
    }

    try {
        return JSON.parse(body) as T;
    } catch {
        return null;
    }
}
