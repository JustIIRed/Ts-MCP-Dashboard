export type NavOption = {
  label: string;
  route: string;
};
// NOTE: When adding a new route/page, the label must match the view export in ../pages/Home/views
// Example: label "Terminal" will look for "terminalPage" in the views folder.
// To add a new page:
//   1. Add { label: "Starter", route: "/starter" } here.
//   2. Ensure starterPage is defined in ../pages/Home/views/starterPage.tsx

export const navOptions: NavOption[] = [
  { label: "Terminal", route: "/terminal" },
  { label: "Dashboard", route: "/dashboard" },
  { label: "Settings", route: "/settings" },
];
