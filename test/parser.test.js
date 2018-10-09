import test from 'ava'
import Parser from '../src/parser'
import apiDescription from './api_description'

test('should parse simple list resource', t => {
  const path = 'first'
  const segments = Parser.parseUrl(path)
  
  t.is(segments.length, 1, 'it should only have one segment')
  const firstSegment = segments[0]
  t.true(firstSegment.isResource, 'it should be a resource segment')
  t.true(firstSegment.isLast, 'it should be the last segment')
  t.false(firstSegment.isIdentifier, 'it should not be an identifier segment')
})

test('should omit leading forwardslash', t =>  {
  const path = '/first'
  const segments = Parser.parseUrl(path)
  t.is(segments.length, 1, 'it should resolve only one segment')
})

test('should resolve list and identifier segments', t => {
  const path = 'first/{id}'
  const segments = Parser.parseUrl(path)
  t.is(segments.length, 2, 'it should have two segments')

  const firstSegment = segments[0]
  t.true(firstSegment.isResource, 'it should be a resource')
  t.false(firstSegment.isIdentifier, 'it should not be an identifier')
  t.false(firstSegment.isLast, 'it should not be the last segment')

  const identifierSegment = segments[1]
  t.true(identifierSegment.isResource, 'it should be a resource')
  t.true(identifierSegment.isIdentifier, 'it should be an identifier')
  t.true(identifierSegment.isLast, 'it should be the last segment')
})

test('should identifie non-resource segments', t => {
  const path = 'first/second/{id}'
  const segments = Parser.parseUrl(path)
  t.is(segments.length, 3, 'it should have two segments')

  const firstSegment = segments[0]
  t.false(firstSegment.isResource, 'it should be a resource')
  t.false(firstSegment.isIdentifier, 'it should not be an identifier')
  t.false(firstSegment.isLast, 'it should not be the last segment')

  const secondSegment = segments[1]
  t.true(secondSegment.isResource, 'it should be a resource')
  t.false(secondSegment.isIdentifier, 'it should not be an identifier')
  t.false(secondSegment.isLast, 'it should not be the last segment')

  const identifierSegment = segments[2]
  t.true(identifierSegment.isResource, 'it should be a resource')
  t.true(identifierSegment.isIdentifier, 'it should be an identifier')
  t.true(identifierSegment.isLast, 'it should be the last segment')  
})

test('should resolve complex deep path', t => {
  const path = 'first/second/{thirdId}/fourth/{fifthId}'
  const segments = Parser.parseUrl(path)
  t.is(segments.length, 5, 'it should have two segments')

  const firstSegment = segments[0]
  t.false(firstSegment.isResource, 'it should be a resource')
  t.false(firstSegment.isIdentifier, 'it should not be an identifier')
  t.false(firstSegment.isLast, 'it should not be the last segment')

  const secondSegment = segments[1]
  t.true(secondSegment.isResource, 'it should be a resource')
  t.false(secondSegment.isIdentifier, 'it should not be an identifier')
  t.false(secondSegment.isLast, 'it should not be the last segment')

  const thirdIdentifierSegment = segments[2]
  t.true(thirdIdentifierSegment.isResource, 'it should be a resource')
  t.true(thirdIdentifierSegment.isIdentifier, 'it should be an identifier')
  t.false(thirdIdentifierSegment.isLast, 'it should be the last segment')  

  const fourth = segments[3]
  t.true(fourth.isResource, 'it should be a resource')
  t.false(fourth.isIdentifier, 'it should not be an identifier')
  t.false(fourth.isLast, 'it should not be the last segment')

  const fourthIdentifierSegment = segments[4]
  t.true(fourthIdentifierSegment.isResource, 'it should be a resource')
  t.true(fourthIdentifierSegment.isIdentifier, 'it should be an identifier')
  t.true(fourthIdentifierSegment.isLast, 'it should be the last segment')  
 
})