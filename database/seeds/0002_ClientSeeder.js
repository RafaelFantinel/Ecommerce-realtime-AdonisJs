'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')
class ClientSeeder {
  async run () {
    const role = await Role.findBy('slug','client')

    const clients = await Factory.model('App/models/User').createMany(100);
    await Promise.all(clients.map(async client =>{//attach relaciona (N,N) banco
      await client.roles().attach([role.id])
    })
    )
    const user = await User.create({
      name: 'Rafael',
      surname: 'Fantinel',
      email: 'rafaeldeoliveirafantinel@hotmail.com',
      password: 'etruporia2014'
    })
    const adminRole = await Role.findBy('slug','admin')
    await user.roles().attach([role.id])
  }
}

module.exports = ClientSeeder
