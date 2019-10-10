
import knex from '@root/connection';

import { User, UserType } from '@root/models/User';

export async function checkPassword() {
  try {
    const user = new User({
      login: 'user',
      name: 'test',
      group_id: 1,
      password: 'test'
    });

    await user.create();
    const isMatch = await user.verifyPassword('test');
    console.log(isMatch);
  } catch (err) {
    console.log(err);
  }
}

export async function showUsers() {
  try {
    const users = await knex('users').select('*');
    console.log(users);
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(user: UserType) {
  try {
    const newUser = new User(user);
    await newUser.create();
  } catch (err) {
    console.log(err);
  }
}