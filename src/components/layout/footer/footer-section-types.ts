import type { CmsPost } from "@/lib/swipall/types/types";

export const FOOTER_SECTION_KINDS = {
    Links: "links",
    Taxonomies: "taxonomies",
} as const;

export type FooterSectionKind = (typeof FOOTER_SECTION_KINDS)[keyof typeof FOOTER_SECTION_KINDS];

interface FooterBodyBase {
    kind?: string;
}

const VALID_KINDS = new Set<FooterSectionKind>([
    FOOTER_SECTION_KINDS.Links,
    FOOTER_SECTION_KINDS.Taxonomies,
]);

export function getFooterSectionKind(post: CmsPost): FooterSectionKind | null {
    const body = parseFooterPostBody<FooterBodyBase>(post.body);
    if (!body?.kind) {
        return null;
    }

    const normalizedKind = body.kind.toLowerCase() as FooterSectionKind;
    if (VALID_KINDS.has(normalizedKind)) {
        return normalizedKind;
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
