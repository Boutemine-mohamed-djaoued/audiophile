export default function isNewProduct(createdAt: string) {
  const now: any = new Date();
  const createdDate: any = new Date(createdAt);
  const diffInTime = now - createdDate;
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays < 3;
}