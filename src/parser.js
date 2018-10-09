
class Parser {
  static parseUrl(url) {
    if(url[0] === '/'){
      url = url.substring(1)
    }
    return parseSegments(url)
  }
}

class Segment {
  /**
   * 
   * @param {string} name - name of the segment 
   * @param {boolean} isResource - does this segment have any related resources
   * @param {boolean} isLast - is this the last segment in the url path
   */
  constructor(name, isResource, isLast) {
    this.name = name
    this.isResource = isResource
    this.isLast = isLast
    this.isIdentifier = name[0] == '{' // how sophisticated..
  }
}


// const segments = parseSegments('first/second/{third}/fourth/fifth/sixth')
// console.log(segments)

function parseSegments(path) {
  const parts = path.split('/')
  const segmentName = parts[0]

  if (parts.length == 1) {
    const descriptor = new Segment(segmentName, true, true)
    return [descriptor]
  } else {
    const segment = new Segment(segmentName, false, false)
    let segments = parseSegments(parts.slice(1).join('/'))
    if (segment.isIdentifier) {
      segment.isResource = true
    } else {
      // this segment is always a resource if the subsequent segment is an identifier
      segment.isResource = segments[0].isIdentifier
    }
    return [segment, ...segments]
  }
}

export default Parser