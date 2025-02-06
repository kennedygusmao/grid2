import { faker } from '@faker-js/faker';


export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    priceHistory: number[];
    lastUpdated: Date;
  }

export const generateProducts = (count: number): Product[] => {
  faker.seed(123); // Para dados consistentes
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),
    priceHistory: Array.from({ length: 12 }, () =>
      parseFloat(faker.commerce.price({ min: 10, max: 1000 }))
    ),
    lastUpdated: faker.date.recent({ days: 30 })
  }));
};