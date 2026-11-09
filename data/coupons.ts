import { Coupon } from '@/types/cart';

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'VERDEN15',
    discountType: 'percentage',
    discountValue: 15,
    description: '15% off your entire curation for Privé Members',
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% off your inaugural curation',
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
    description: 'Complimentary priority air courier delivery',
  },
];
