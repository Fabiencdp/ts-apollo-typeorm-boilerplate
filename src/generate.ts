import { generate } from 'graphql-code-generator';

function generateTypes() {
  const config = {
    overwrite: true,
    schema: 'http://localhost:4000/graphql',
    generates: {
      'generated/types.d.ts': {
        plugins: [
          'typescript-common',
          'typescript-server',
          'typescript-resolvers',
        ],
      },
      'generated/schema.graphql': {
        plugins: [
          'schema-ast',
        ],
      },
    },
  };

  try {
    generate(config);
  } catch (err) {
    console.error('Generation error', err.message);
  }
}

generateTypes();
