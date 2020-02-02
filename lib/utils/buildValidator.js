import Ajv from 'ajv';
import ajv_errors from 'ajv-errors';
import patternSchema from '../utils/patterns.json';
import buildSchema from './buildSchema';

function buildValidator(schemaData) {
  const schema = buildSchema(schemaData);
  const ajv = new Ajv({ allErrors: true, verbose: true, jsonPointers: true, $data: true, useDefaults: true });
  ajv_errors(ajv);
  ajv.addSchema(patternSchema, 'patterns.json');

  return ajv.compile(schema);
}

export default buildValidator;