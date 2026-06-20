export interface Solution {
  slug: string;
  category: string;
}

export const solutions: Solution[] = [
  { slug: "ai-product-image-generator", category: "aiProductImage" },
  { slug: "amazon-product-image-generator", category: "amazonProductImage" },
  { slug: "ecommerce-detail-page-generator", category: "detailPage" },
  { slug: "product-photo-editing", category: "photoEditing" },
  { slug: "product-video-generator", category: "videoGenerator" },
  { slug: "style-reference-product-photo", category: "styleReference" },
  { slug: "taobao-main-image-generator", category: "taobaoMainImage" },
  { slug: "tiktok-shop-product-image", category: "tiktokShop" },
];
