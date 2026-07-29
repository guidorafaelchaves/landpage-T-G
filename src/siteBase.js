const isGitHubProjectSite = window.location.hostname.endsWith('.github.io')
const isGitHubPreview = window.location.hostname === 'raw.githack.com'

export const siteBase = isGitHubProjectSite
  ? '/landpage-T-G/'
  : isGitHubPreview
    ? '/guidorafaelchaves/landpage-T-G/preview/dist/'
    : '/'
