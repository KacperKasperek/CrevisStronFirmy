import { and, ne, notLike } from "drizzle-orm";
import { analyticsEvents } from "@/lib/db/schema";

export function excludeAdminPanelActivity() {
  return and(
    ne(analyticsEvents.path, "/panel"),
    notLike(analyticsEvents.path, "/panel/%"),
    notLike(analyticsEvents.path, "/panel?%"),
  );
}
