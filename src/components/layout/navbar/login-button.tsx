'use client'

import { ComponentProps, useTransition } from "react";
import { logoutAction } from "@/app/sign-in/actions";
import { useRouter } from "next/navigation";
import { removeAuthUser } from "@/lib/auth-client";
import { Menu, User } from "lucide-react";

interface LoginButtonProps extends ComponentProps<'button'> {
    isLoggedIn: boolean;
}

export function LoginButton({ isLoggedIn, ...props }: LoginButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <div>
            <div className="hidden">
                <button className=" md:block" {...props} aria-disabled={isPending}
                onClick={() => {
                    if (isLoggedIn) {
                        startTransition(async () => {
                            // Clear user from localStorage
                            removeAuthUser();
                            // Call logout action
                            await logoutAction();
                        })
                    } else {
                        router.push('/sign-in')
                    }
                }}>
                {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
            </button>
            </div>
            
            <button className="flex md:hidden" {...props} aria-disabled={isPending}
                onClick={() => {
                    if (isLoggedIn) {
                        startTransition(async () => {
                            // Clear user from localStorage
                            removeAuthUser();
                            // Call logout action
                            await logoutAction();
                        })
                    } else {
                        router.push('/sign-in')
                    }
                }}>
            {isLoggedIn ? 'Cerrar sesión' : <User />}
        </button>
        </div>

    )
}