export function getImageUrl(image: string): string {
  if (!image) return "";

  if (
    /^https?:\/\//i.test(image) ||
    image.startsWith("data:")
  ) {
    return image;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(
    /\/api\/?$/,
    ""
  );

  if (!apiUrl) {
    return image.startsWith("/") ? image : `/${image}`;
  }

  return `${apiUrl}${image.startsWith("/") ? "" : "/"}${image}`;
}
