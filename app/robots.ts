// app/robots.ts
import { MetadataRoute } from "next";
import { AppConst } from "@/constants/AppConstants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${AppConst.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
    };
}