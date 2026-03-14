import type { CmsPost } from "@/lib/swipall/types/types";
import { cacheLife } from "next/cache";
import type { JSX } from "react";
import { FooterCategoriesSection } from "./sections/footer-categories-section";
import { FooterLinksSection } from "./sections/footer-links-section";
import { FooterSocialSection } from "./sections/footer-social-section";
import { getFooterBlockType, type FooterBlockType } from "./footer-section-types";

interface FooterSectionRendererProps {
    post: CmsPost;
}

const SECTION_RENDERERS: Record<FooterBlockType, (props: { post: CmsPost }) => JSX.Element | Promise<JSX.Element | null>> = {
    "footer-links": FooterLinksSection,
    "footer-categories": FooterCategoriesSection,
    "footer-social": FooterSocialSection,
};

export async function FooterSectionRenderer({ post }: FooterSectionRendererProps) {
    "use cache";
    cacheLife("hours");

    const type = getFooterBlockType(post);
    if (!type) {
        return null;
    }

    const Renderer = SECTION_RENDERERS[type];
    return <Renderer post={post} />;
}
