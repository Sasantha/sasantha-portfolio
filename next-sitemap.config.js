/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sasantha-portfolio.vercel.app",
  generateRobotsTxt: true,

  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://sasantha-portfolio.vercel.app/sitemap.xml",
    ],
  },
};
