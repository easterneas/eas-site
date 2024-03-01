type Contact = Timestamp & {
  name: string;
  type: "email" | "phone" | "url";
  value: string;
  image: StrapiImageData
  color?: string;
}