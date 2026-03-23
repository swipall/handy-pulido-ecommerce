import type { CmsPost } from "@/lib/swipall/types/types";
import { cacheLife } from "next/cache";
import type { JSX } from "react";
import { FooterCategoriesSection } from "./sections/footer-categories-section";
import { FooterLinksSection } from "./sections/footer-links-section";
import { getFooterSectionKind, type FooterSectionKind } from "./footer-section-types";

interface FooterSectionRendererProps {
    post: CmsPost;
}

const SECTION_RENDERERS: Record<FooterSectionKind, (props: { post: CmsPost }) => JSX.Element | null | Promise<JSX.Element | null>> = {
    links: FooterLinksSection,
    taxonomies: FooterCategoriesSection,
};

export async function FooterSectionRenderer({ post }: FooterSectionRendererProps) {
    "use cache";
    cacheLife("hours");

    const kind = getFooterSectionKind(post);
    if (!kind) {
        return null;
    }

    const Renderer = SECTION_RENDERERS[kind];
    return <Renderer post={post} />;
}
