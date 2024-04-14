export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `1 day ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return `1 hour ago`;
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return `1 minute ago`;
  } else {
    return `just now`;
  }
};
