import { Coupon, ShippingMethod } from '@/types/cart';

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'VERDEN15',
    discountType: 'percentage',
    discountValue: 15,
    description: '15% off your entire order for VÉRDEN Privé members',
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% off your initial order',
  },
  {
    code: 'ARCHITECT30',
    discountType: 'fixed',
    discountValue: 30,
    minSpend: 200,
    description: '$30 off orders over $200',
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 15,
    description: 'Complimentary priority courier delivery',
  },
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'ship-standard',
    name: 'Inspected Standard Courier',
    description: 'Direct courier delivery with end-to-end tracking & carbon-neutral offset',
    price: 0, // Free over $150
    estimatedDays: '4 - 7 business days',
    carrier: 'DHL eCommerce & National Post',
  },
  {
    id: 'ship-express',
    name: 'Priority Air Express',
    description: 'Air express cargo dispatch with guaranteed priority fulfillment',
    price: 15,
    estimatedDays: '2 - 4 business days',
    carrier: 'DHL Express Worldwide / FedEx Air',
  },
  {
    id: 'ship-whiteglove',
    name: 'Curated White Glove Delivery',
    description: 'Room-of-choice placement, uncrating, and protective packaging removal',
    price: 45,
    estimatedDays: '3 - 5 business days',
    carrier: 'Specialty Logistics Freight Direct',
  },
];

