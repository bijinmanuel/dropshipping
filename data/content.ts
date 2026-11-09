export interface FAQItem {
  question: string;
  answer: string;
  category: 'orders' | 'shipping' | 'returns' | 'quality' | 'dropshipping';
}

export const FAQS: FAQItem[] = [
  {
    question: 'How does VÉRDEN fulfill and ship orders worldwide?',
    answer: 'We operate a decentralized direct-from-artisan fulfillment network. Rather than warehousing items in conventional third-party warehouses where dust and handling degrade materials, our pieces are inspected, boxed, and dispatched directly from our verified master artisan ateliers and certified climate-controlled regional logistic hubs in Italy, Japan, Scandinavia, and precision tech hubs. This eliminates intermediary markups and guarantees authenticity.',
    category: 'dropshipping',
  },
  {
    question: 'How can I track the exact progress of my delivery?',
    answer: 'The moment your order passes inspection at the dispatch atelier, you receive an automated shipping notification with your live tracking code (e.g., VRD-94827104). You can track every milestone—from artisan packaging, customs dispatch, transatlantic air cargo, to local last-mile courier handoff—directly on our Track Order page.',
    category: 'shipping',
  },
  {
    question: 'What is your 30-day trial and return policy?',
    answer: 'We want every object in your home to bring profound satisfaction. If any piece does not fit your space or aesthetic expectations, you may return it within 30 days of receipt in its original packaging. We arrange complimentary courier pickup and issue a 100% refund to your original payment method upon receipt.',
    category: 'returns',
  },
  {
    question: 'Are customs fees or import duties included?',
    answer: 'Yes. All prices displayed on VÉRDEN include all applicable import duties, customs tariffs, and local sales taxes (DDP - Delivered Duty Paid). You will never encounter unexpected fees upon door arrival.',
    category: 'shipping',
  },
  {
    question: 'How do you verify supplier quality before customer dispatch?',
    answer: 'Every partner atelier is held to strict VÉRDEN manufacturing tolerances. Before any parcel is sealed, a 7-point photographic quality check is logged into our digital quality registry, checking finish uniformity, structural joinery, electrical certification (CE/UL), and shockproof drop-tested packaging.',
    category: 'quality',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, PayPal, and interest-free installment plans through Klarna and Afterpay.',
    category: 'orders',
  },
];
