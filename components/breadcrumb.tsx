"use client"

import { Breadcrumb } from "@chakra-ui/react"
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function BreadcrumbCustom() {
    const paths = usePathname();
    const pathNames = paths.split('/').filter(path => path);
    return (
        <Breadcrumb.Root>
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="/" as={Link}>Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                {pathNames.map((link: string, index: number) => {
                    const isLastIndex = index === (pathNames.length - 1);

                    return (
                        <>
                            <Breadcrumb.Item key={`pokemon-${link}`}>
                                {!isLastIndex && <Breadcrumb.CurrentLink>{link}</Breadcrumb.CurrentLink>}
                                {isLastIndex && <Breadcrumb.CurrentLink>{link}</Breadcrumb.CurrentLink>}
                            </Breadcrumb.Item>
                            {!isLastIndex && <Breadcrumb.Separator />}
                        </>
                    )
                }
                )}
            </Breadcrumb.List>
        </Breadcrumb.Root>

    )
}
