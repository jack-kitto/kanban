import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeProject() {
  return {
    title: faker.lorem.words({min: 1, max: 5}),
    description: faker.lorem.words(5),
  };
}
export function fakeProjectComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words({min: 1, max: 5}),
    description: faker.lorem.words(5),
  };
}
export function fakeTask() {
  return {
    title: faker.lorem.words(5),
    description: faker.lorem.sentence({ min: 1, max: 5 }),
    columnTitle: faker.lorem.words(5),
    position: faker.lorem.words(5),
  };
}
export function fakeTaskComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: faker.lorem.sentence({ min: 1, max: 5 }),
    columnTitle: faker.lorem.words(5),
    columnId: faker.string.uuid(),
    position: faker.lorem.words(5),
  };
}
export function fakeColumn() {
  return {
    title: faker.lorem.words(5),
    colour: faker.helpers.arrayElement(['Mimi Pink', 'Alice Blue', 'Light Sky Blue', 'Jordy Blue', 'Aquamarine', 'Aqua Blue', 'Purple Heart', 'Magic Mint', 'Powder blue', 'Slate blue', 'Tekhelet', 'Violet', 'Licorice']),
    position: faker.lorem.words(5),
  };
}
export function fakeColumnComplete() {
  return {
    projectId: faker.string.uuid(),
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    colour: faker.helpers.arrayElement(['Mimi Pink', 'Alice Blue', 'Light Sky Blue', 'Jordy Blue', 'Aquamarine', 'Aqua Blue', 'Purple Heart', 'Magic Mint', 'Powder blue', 'Slate blue', 'Tekhelet', 'Violet', 'Licorice']),
    position: faker.lorem.words(5),
  };
}
export function fakeSubtask() {
  return {
    title: faker.lorem.words({ min: 1, max: 20 }),
    completed: faker.datatype.boolean(),
  };
}
export function fakeSubtaskComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 1, max: 20 }),
    taskId: faker.string.uuid(),
    completed: faker.datatype.boolean(),
  };
}
export function fakeAccount() {
  return {
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
  };
}
export function fakeAccountComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
  };
}
export function fakeSession() {
  return {
    sessionToken: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeSessionComplete() {
  return {
    id: faker.string.uuid(),
    sessionToken: faker.lorem.words(5),
    userId: faker.string.uuid(),
    expires: faker.date.anytime(),
  };
}
export function fakeUser() {
  return {
    name: undefined,
    email: undefined,
    emailVerified: undefined,
    image: undefined,
    currentProjectId: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: undefined,
    email: undefined,
    emailVerified: undefined,
    image: undefined,
    currentProjectId: undefined,
  };
}
export function fakeVerificationToken() {
  return {
    identifier: faker.lorem.words(5),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeVerificationTokenComplete() {
  return {
    identifier: faker.lorem.words(5),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
