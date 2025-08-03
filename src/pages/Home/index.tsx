const modules = import.meta.glob("./views/*.tsx", { eager: true });
const pages: Record<string, any> = {};
Object.entries(modules).forEach(([path, mod]) => {
  // Remove './views/' and '.tsx'
  const name = path.replace(/^\.\/views\/(.*)\.tsx$/, "$1");
  // @ts-ignore
  pages[name] = (mod as any).default;
});
export default pages;
