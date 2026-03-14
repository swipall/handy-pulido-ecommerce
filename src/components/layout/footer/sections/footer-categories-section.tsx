import Link from "next/link";
import type { CmsPost } from "@/lib/swipall/types/types";
import { parseFooterPostBody } from "../footer-section-types";

interface FooterCategoriesBody {
    items?: Array<{
        label?: string;
        slug?: string;
    }>;
}

interface FooterCategoriesSectionProps {
    post: CmsPost;
}

export function FooterCategoriesSection({ post }: FooterCategoriesSectionProps) {
    const body = parseFooterPostBody<FooterCategoriesBody>(post.body);
    const items = (body?.items ?? []).filter((item) => item.label && item.slug);

    if (items.length === 0) {
        return null;
    }

    return (
        <div>
            {post.title ? <p className="text-sm font-semibold mb-4">{post.title}</p> : null}
            <ul className="space-y-2 text-sm text-muted-foreground">
                {items.map((item, index) => (
                    <li key={`${post.slug}-category-${index}`}>
                        <Link
                            href={`/collection/${item.slug}`}
                            className="hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
