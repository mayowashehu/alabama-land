export const generateMetaTags = (page: string) => {
  const baseTitle = 'Alabama Onas — Sagamu Land'
  const tagline = 'Buy Peace, Build Legacy.'

  const pages: Record<string, { title: string; description: string }> = {
    home: {
      title: `${baseTitle} | ${tagline}`,
      description:
        'Buy verified land in Sagamu, Ogun State. 47 plots sold. 100% document delivery. Buy Peace, Build Legacy.',
    },
    listings: {
      title: `Available Plots | ${baseTitle}`,
      description:
        'Browse available verified land plots in Sagamu, Ogun State. View prices, documents, and reserve your plot.',
    },
    listing: {
      title: `Listing Details | ${baseTitle}`,
      description:
        'View verified land plot details in Sagamu, Ogun State. Check documents, pricing, and availability.',
    },
    about: {
      title: `About Mrs. Alaba Afusat | ${baseTitle}`,
      description:
        'Meet Mrs. Alaba Afusat, founder of Alabama Onas. 47 plots sold. 12 estates developed. Your trusted land dealer in Sagamu.',
    },
    blog: {
      title: `Blog | ${baseTitle}`,
      description: 'Learn about buying land in Ogun State, document types, and investment tips for Sagamu property.',
    },
    login: {
      title: `Admin Login | ${baseTitle}`,
      description: 'Admin login portal for Alabama Onas land management.',
    },
    dashboard: {
      title: `Admin Dashboard | ${baseTitle}`,
      description: 'Manage listings, leads, and business operations.',
    },
  }

  return pages[page] || pages.home
}
