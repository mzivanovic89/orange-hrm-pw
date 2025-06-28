import { faker } from '@faker-js/faker';
import { Tag } from 'types/enums/Tag';
import StringUtils from 'util/StringUtils';

type LoginScenario = {
  name: string;
  tags: Tag[];
  username: string;
  password: string;
};

export const validLoginScenarios: LoginScenario[] = [
  {
    name: 'Valid login',
    tags: [Tag.ALL, Tag.FUNCTIONAL, Tag.SMOKE, Tag.AUTH],
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  {
    name: 'Username different letter case',
    tags: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH],
    username: StringUtils.reverseCase(process.env.ADMIN_USERNAME),
    password: process.env.ADMIN_PASSWORD,
  },
];

export const loginValidationScenarios: LoginScenario[] = [
  {
    name: 'Invalid username, valid password',
    tags: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH],
    username: faker.string.alphanumeric({ length: 8 }),
    password: process.env.ADMIN_PASSWORD,
  },
  {
    name: 'Valid username, invalid password',
    tags: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH],
    username: process.env.ADMIN_USERNAME,
    password: faker.string.alphanumeric({ length: 8 }),
  },
  {
    name: 'Invalid username and password',
    tags: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH],
    username: faker.string.alphanumeric({ length: 8 }),
    password: faker.string.alphanumeric({ length: 8 }),
  },
  {
    name: 'Incorrect password case',
    tags: [Tag.ALL, Tag.FUNCTIONAL, Tag.AUTH],
    username: process.env.ADMIN_USERNAME,
    password: StringUtils.reverseCase(process.env.ADMIN_PASSWORD),
  },
];
