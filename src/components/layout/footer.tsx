import { getPosts } from '@/lib/swipall/rest-adapter';
import type { CmsPost } from '@/lib/swipall/types/types';
import { cacheLife } from 'next/cache';
import Image from "next/image";
import { FooterSectionRenderer } from './footer/footer-section-renderer';
import { getFooterBlockType } from './footer/footer-section-types';


async function Copyright() {
    'use cache'
    cacheLife('days');

    return (
        <div>
            © {new Date().getFullYear()} Hanny Pulido. Todos Los Derechos Reservados.
        </div>
    )
}

const FOOTER_PARENT_SLUG = 'ecommerce-footer';

async function fetchFooterBlocks() {    
    try {
        const postsResponse = await getPosts({ parent__slug: FOOTER_PARENT_SLUG });        
        return (postsResponse.results ?? [])
            .filter((post) => getFooterBlockType(post))
            .sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0));
    } catch {
        return [] as CmsPost[];
    }
}

function getFooterGridClassName(blockCount: number) {
    if (blockCount <= 1) {
        return 'grid grid-cols-1 gap-8';
    }
    if (blockCount === 2) {
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
    }
    if (blockCount === 3) {
        return 'grid grid-cols-1 md:grid-cols-3 gap-8';
    }
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
}

export async function Footer() {
    'use cache'
    cacheLife('days');
    const blocks = await fetchFooterBlocks();

    return (
        <footer className="border-t border-border mt-auto" style={{ backgroundColor: '#FFEBF7'}}>
            <div className="container mx-auto px-4 py-12">
                {blocks.length > 0 ? (
                    <div className={getFooterGridClassName(blocks.length)}>
                        {blocks.map((post) => (
                            <FooterSectionRenderer key={post.slug} post={post} />
                        ))}
                    </div>
                ) : null}

                <div
                    className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <Copyright />
                    <div className="flex items-center gap-2">
                        <span>Powered by</span>
                        <a
                            href="https://swipall.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                        >
                            <Image src="/swipall-icon.svg" alt="Swipall" width={40} height={27} className="h-4 w-auto dark:invert" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
