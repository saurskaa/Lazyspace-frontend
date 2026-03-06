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
            priority: 0.9,
        },
        {
            url: `${baseUrl}/how-it-works`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/omegle-alternative`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}