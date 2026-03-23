import Link from "next/link";
import type { CmsPost } from "@/lib/swipall/types/types";
import { FOOTER_SECTION_KINDS, parseFooterPostBody } from "../footer-section-types";

interface FooterLinksBody {
    kind?: string;
    items?: Array<{
        label?: string;
        link?: string;
    }>;
}

interface FooterLinksSectionProps {
    post: CmsPost;
}

export function FooterLinksSection({ post }: FooterLinksSectionProps) {
    const body = parseFooterPostBody<FooterLinksBody>(post.body);
    if (body?.kind !== FOOTER_SECTION_KINDS.Links) {
        return null;
    }

    const items = (body?.items ?? []).filter((item) => item.label && item.link);

    if (items.length === 0) {
        return null;
    }

    const renderLabel = (label: string) => {
        const hasHtmlTag = /<[^>]+>/.test(label);
        if (!hasHtmlTag) {
            return label;
        }

        return <span dangerouslySetInnerHTML={{ __html: label }} />;
    };

    return (
        <div>
            {post.title ? <p className="text-sm font-semibold mb-4">{post.title}</p> : null}
            <ul className="space-y-2 text-sm text-muted-foreground">
                {items.map((item, index) => (
                    <li key={`${post.slug}-link-${index}`} className="text-black">
                        <Link
                            href={item.link!}
                            className="hover:text-foreground transition-colors"
                            target={item.link?.startsWith("http") ? "_blank" : undefined}
                            rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                            {renderLabel(item.label!)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
