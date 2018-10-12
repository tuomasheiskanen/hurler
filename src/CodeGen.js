


class CodeGen {
  static process(segments) {
    for(let i=0; i<segments.length; i++){

    }
  }
}

function processSegment(segment){
  const name = segment.name

}

const segmentTemplate = `
class Organization {
  constructor(path = undefined) {
    this.name = 'organization'
    this.get = this.get.bind(this)
    this.response = this.response.bind(this)
    this.path = '${path || ''}/${this.name}'
  }

  /**
   * a GET request with an optional resource identifier
   * 
   * @param {*} id - optional resource id
   */
  get(id = undefined) {
    this.method = 'GET'
    if (id) {
      const path = '${this.path}/${id}'
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
}`

console.log(segmentTemplate)