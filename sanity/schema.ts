import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemaTypes/blockContent'
import tag from './schemaTypes/tag'
import post from './schemaTypes/post'
import author from './schemaTypes/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, tag, blockContent],
}
