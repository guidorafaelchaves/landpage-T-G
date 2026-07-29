const isGitHubProjectSite = window.location.hostname.endsWith('.github.io')
const isGitHubPreview = ['raw.githack.com', 'rawcdn.githack.com'].includes(window.location.hostname)
const previewBase = window.location.pathname.match(/^\/guidorafaelchaves\/landpage-T-G\/[^/]+\/dist\//)?.[0]

export const siteBase = isGitHubProjectSite
  ? '/landpage-T-G/'
  : isGitHubPreview && previewBase
    ? previewBase
    : '/'
