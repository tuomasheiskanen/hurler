

// organizaztion
// organization/{id}

const organization = {}

organization.get() //list
organization.get(1)
organization.delete(1)
organization.post({})
organization.put(1, {})

organization
  .list()
  .response({
    status: 'success',
    model: [{}, {}, {}]
  })


// organization/{id}/users
// organization/{id}/users/{userId}

organization.get(1).users.list()  