export function isAdminPanelPath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0];
  return pathname === "/panel" || pathname.startsWith("/panel/");
}
