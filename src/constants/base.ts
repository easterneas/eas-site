type MenuItem = {
  name: string,
  link: string,
  type: "logo" | "normal",
}

export const MENU_ITEMS: MenuItem[] = [
  { name: "Home", link: "/", type: "logo" },
  { name: "About", link: "/about", type: "normal" },
  { name: "Portfolio", link: "/portfolios", type: "normal" },
  { name: "Blog", link: "/blog", type: "normal" }
]
