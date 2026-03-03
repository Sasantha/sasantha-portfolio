/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sasantha-portfolio.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  autoLastmod: true,
  sitemapSize: 5000,

  changefreq: "monthly",
  priority: 0.7,
  exclude: ["/server-sitemap.xml"],

  transform: async (config, path) => {
    const routeConfig = {
      "/": { changefreq: "weekly", priority: 1.0 },
      "/projects": { changefreq: "weekly", priority: 0.9 },
      "/contact": { changefreq: "monthly", priority: 0.6 },
    };

    const selected = routeConfig[path] ?? {
      changefreq: config.changefreq,
      priority: config.priority,
    };

    return {
      loc: path,
      changefreq: selected.changefreq,
      priority: selected.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://sasantha-portfolio.vercel.app/sitemap.xml"],
  },
};
