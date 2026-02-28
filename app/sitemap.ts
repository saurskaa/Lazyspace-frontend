// app/sitemap.ts
import { MetadataRoute } from "next";
import { AppConst } from "@/constants/AppConstants";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = AppConst.NEXT_PUBLIC_FRONTEND_URL;

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/chat`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];
}