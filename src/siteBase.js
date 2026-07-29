const isGitHubProjectSite = window.location.hostname.endsWith('.github.io')

export const siteBase = isGitHubProjectSite ? '/landpage-T-G/' : '/'
