import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Facebook, Globe, Instagram, MessageCircle, Twitter, Youtube } from "lucide-react";
import type { CmsPost } from "@/lib/swipall/types/types";
import { parseFooterPostBody } from "../footer-section-types";

interface FooterSocialBody {
    items?: Array<{
        network?: string;
        url?: string;
        label?: string;
    }>;
}

interface FooterSocialSectionProps {
    post: CmsPost;
}

const NETWORK_ICONS: Record<string, LucideIcon> = {
    instagram: Instagram,
    facebook: Facebook,
    tiktok: Globe,
    twitter: Twitter,
    youtube: Youtube,
    pinterest: Globe,
    whatsapp: MessageCircle,
};

export function FooterSocialSection({ post }: FooterSocialSectionProps) {
    const body = parseFooterPostBody<FooterSocialBody>(post.body);
    const items = (body?.items ?? []).filter((item) => item.url && (item.label || item.network));

    if (items.length === 0) {
        return null;
    }

    return (
        <div>
            {post.title ? <p className="text-sm font-semibold mb-4">{post.title}</p> : null}
            <ul className="space-y-2 text-sm text-muted-foreground">
                {items.map((item, index) => {
                    const network = item.network?.toLowerCase() ?? "";
                    const Icon = NETWORK_ICONS[network] ?? Globe;
                    const label = item.label ?? network;

                    return (
                        <li key={`${post.slug}-social-${index}`}>
                            <Link
                                href={item.url!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                            >
                                <Icon className="size-4" aria-hidden="true" />
                                <span>{label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
