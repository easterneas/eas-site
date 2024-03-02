type BaseLayoutProps = {
  meta: Partial<Omit<Post, "excerpt">> & Pick<Post, "excerpt">;
}