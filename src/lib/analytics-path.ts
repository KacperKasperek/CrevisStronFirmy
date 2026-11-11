export function isAdminPanelPath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0];
  return pathname === "/panel" || pathname.startsWith("/panel/");
}

export function isExcludedAnalyticsPath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0];
  return isAdminPanelPath(pathname) || pathname === "/demo1" || pathname.startsWith("/demo1/");
}
