import schemaContentTypes from './contentTypes';
import schemaElements from './elements/index';
import schemaPageSections from './pageSections/index';
import schemaSectionBlocks from './sectionBlocks/index';

export const schemaTypes = [
  ...schemaContentTypes,
  ...schemaElements,
  ...schemaPageSections,
  ...schemaSectionBlocks,
];