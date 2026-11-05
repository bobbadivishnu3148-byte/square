export type Language = 'en' | 'te';
export type UserRole = 'buyer' | 'seller';

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  // Seller-specific cooperative fields
  societyName?: string;
  cooperativeRegNo?: string;
  clusterLocation?: string;
  craftSpecialization?: string;
  bankIFSC?: string;
  verifiedStatus?: boolean;
}

export interface PriceBreakdown {
  artisanShare: number; // in INR
  artisanPercentage: number;
  hubShare: number; // in INR
  hubPercentage: number;
  platformShare: number; // in INR
  platformPercentage: number;
  retailShowroomEst: number; // Middleman markup in city stores
  buyerSavings: number;
}

export interface AuthenticityProof {
  giCertificateNumber: string;
  clusterLocation: string;
  geoCoordinates: string;
  artisanMasterName: string;
  cooperativeRegNo: string;
  craftMethod: string;
  materialPurity: string;
  dyeOrFinishType: string;
  labTestReport: string;
  verificationAuditDate: string;
  inspectorName: string;
  qrHash: string;
}

export type ProductCategory =
  | 'Etikoppaka Toys'
  | 'Kondapalli Toys & Dolls'
  | 'Terracotta & Pot Art'
  | 'Woodcraft & Cutlery'
  | 'Bell & Brass Metal'
  | 'Leather Art & Paintings'
  | 'Palm Leaf & Lace'
  | 'Stone Craft & Idols'
  | 'Handloom & Textiles'
  | 'Handloom Saree'
  | 'Wooden Crafts'
  | 'Heritage Canvas & Metal';

export interface Product {
  id: string;
  hub: string;
  sku: string;
  title: string;
  category: ProductCategory;
  price: number;
  status: 'Verified';
  dispatchSLA: string; // e.g. "Dispatch < 24 hrs"
  dispatchHoursMax: number;
  imageUrl: string;
  cluster: string;
  description: string;
  weightGrams?: number;
  material: string;
  dimensions?: string;
  priceBreakdown: PriceBreakdown;
  authenticityProof: AuthenticityProof;
  isSample: boolean;
}

export interface VideoSnippet {
  id: string;
  title: string;
  artisanName: string;
  experienceYears: number;
  cluster: string;
  hub: string;
  productId: string;
  videoThumb: string;
  craftAction: string;
  craftSpecialty: string;
  artisanQuote: string;
  liveViewersCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNote?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  artisanPayoutTotal: number;
  hubPayoutTotal: number;
  platformFeeTotal: number;
  dispatchDeadline: string; // ISO string
  shippingAddress: {
    fullName: string;
    city: string;
    phone: string;
    addressLine: string;
  };
  paymentMethod: 'UPI';
  upiApp: 'Google Pay' | 'PhonePe' | 'Paytm' | 'BHIM';
  status: 'Confirmed' | 'Cluster Packaging' | 'Dispatched' | 'Delivered';
  cooperativeReceiptHash: string;
}

export interface AICurationResult {
  formattedSummary: string;
  recommendationTitle: string;
  hubName: string;
  clusterOrigin: string;
  craftType: string;
  estimatedPrice: number;
  dispatchSLA: string;
  giTagProof: string;
  matchReason: string;
  authenticityAuditHighlight: string;
  keyHighlights: string[];
  matchedCatalogId?: string;
  artisanQuote?: string;
}
