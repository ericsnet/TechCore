export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: string;
  originalPrice: string | null;
  discount: number | null;
  categoryId: number | null;
  brand: string | null;
  images: string[];
  features: string[];
  specs: Record<string, string>;
  amazonUrl: string | null;
  rating: string | null;
  reviewCount: number | null;
  inStock: boolean | null;
  isFeatured: boolean | null;
  isBestseller: boolean | null;
  isNew: boolean | null;
  isActive?: boolean | null;
  createdAt: Date;
  categoryName?: string | null;
  categorySlug?: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  createdAt: Date;
  productCount?: number;
}

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  title: string | null;
  content: string;
  verified: boolean | null;
  helpful: number | null;
  createdAt: Date;
}

export interface Admin {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}
