import { Product, ProductVariant } from './product';

export interface CartItem {
  id: string; // Unique cart item ID (productId + variantId)
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  carrier: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  supplierSku: string;
  fulfillmentStatus: 'unfulfilled' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  trackingCarrier?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderTrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string; // e.g. "VRD-94827104"
  createdAt: string;
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: {
    method: string;
    cost: number;
  };
  tax: number;
  total: number;
  paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'klarna';
  paymentStatus: 'paid' | 'pending' | 'failed';
  fulfillmentStatus: 'processing' | 'supplier_confirmed' | 'in_transit' | 'out_for_delivery' | 'delivered';
  trackingNumber: string;
  trackingCarrier: string;
  trackingEvents: OrderTrackingEvent[];
  dropshipLogistics: {
    supplierOrderDispatched: boolean;
    dispatchTimestamp?: string;
    originWarehouse: string;
    destinationCountry: string;
  };
}
