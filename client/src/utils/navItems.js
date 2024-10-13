import { getVisibleNavItems } from "./navVisibility";

export const NAV_ITEMS = (role_id) => {
  return getVisibleNavItems(role_id);
};
