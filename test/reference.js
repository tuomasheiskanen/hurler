// organization/{id}/users
// organization/{id}/users/{userId}

/**
 * organization.get() //list
 * organization.get(1)
 * organization.delete(1)
 * organization.post({})
 * organization.put(1, {})
 * organization.get(1).users.list()  
 */

class User {
  constructor(path) {
    this.name = 'user'
    this.get = this.get.bind(this)
    this.response = this.response.bind(this)
    this.path = `${path}/${this.name}`
  }

  get(id = undefined) {
    this.method = 'GET'
    if (id) {
      const path = `${this.path}/${id}`
      return {
        response: this.response
      }
    }
    return {
      response: this.response
    }
  }

  response(model) {
    return {
      path: this.path,
      method: this.method,
      response: model
    }
  }

}

class Organization {
  constructor(path = undefined) {
    this.name = 'organization'
    this.get = this.get.bind(this)
    this.response = this.response.bind(this)
    this.path = `${path || ''}/${this.name}`
  }

  /**
   * a GET request with an optional resource identifier
   * 
   * @param {*} id - optional resource id
   */
  get(id = undefined) {
    this.method = 'GET'
    if (id) {
      const path = `${this.path}/${id}`
      return {
        user: new User(path),
        response: this.response
      }
    }
    return {
      response: this.response
    }
  }

  response(model) {
    return {
      path: this.path,
      method: this.method,
      response: model
    }
  }
}

function test() {
  const id = arguments[0]
  console.log(id)
}

const o = new Organization()

let hurl = o.get().response({ something: 'nothing' })
console.log(hurl)
let hurl2 = o.get(1).user.get(3).response({ abc: 123 })
console.log(hurl2)
let hurl3 = o.get(1).user.get(3)
console.log(hurl3)
