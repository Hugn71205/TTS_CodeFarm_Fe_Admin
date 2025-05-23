import { faker } from '@faker-js/faker';

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  gender: 'Nam' | 'Nữ' | 'Unisex';
}

export function createFakePerfume(): Perfume {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    brand: faker.company.name(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.urlPicsumPhotos(),
    description: faker.commerce.productDescription(),
    gender: faker.helpers.arrayElement(['Nam', 'Nữ', 'Unisex']),
  };
}

export const mockPerfumes = Array.from({ length: 10 }, createFakePerfume);
