import * as path from 'path';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

//! glob does not work within jest environment, so I have to import every resolver manually
import resolversArray from './resolversArray';
import Auth from '../../middleware/Auth';

export default async (emitSchema = false): Promise<GraphQLSchema> => {
  const schemaFilePath = emitSchema
    ? path.resolve(__dirname, process.env.SCHEMA_PATH || './schema.graphql')
    : false;
  //   const resolversPath = path.join(
  //     __dirname,
  //     process.env.RESOLVER_PATH || '../module/**/resolver.ts',
  //   );
  return buildSchema({
    resolvers: [...resolversArray],
    emitSchemaFile: schemaFilePath,
    authChecker: Auth,
    validate: true,
  });
};
