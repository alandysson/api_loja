import { Product } from './entities/product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useValue: Product,
  },
];
