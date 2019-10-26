import knex from '@root/connection';

import { User, UserType } from '@root/models/User';

export async function showUsers() {
  try {
    const users = await knex('users').select('*');
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

export async function createAdmin() {
  try {
    const admin = new User({
      login: 'admin',
      name: 'admin',
      password: '123',
      group_id: 2
    });
    await admin.create();
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(user: UserType) {
  try {
    const newUser = new User(user);
    await newUser.create();
  } catch (error) {
    console.log(error);
  }
}
