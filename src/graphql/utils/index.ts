

const extractFields = ({ fieldNodes, fragments = undefined }, add = [], exclude = []) => {
  const { selections } = fieldNodes[0].selectionSet;

  // Get root field
  let fields = selections
    .filter(selection => !selection.selectionSet && selection.kind === 'Field')
    .map(({ name: { value } }) => value)
    .filter(field => exclude.indexOf(field) === -1);

  // WIP
  // Include root fragments
  if (fragments) {
    const fragmentArrayFields = Object.values(fragments);
    const fragmentFields = fragmentArrayFields.map(fields => (
      extractFields({ fieldNodes: [fields] })
    ));
    const flattened = fragmentFields.reduce((acc, value) => ([...acc, ...value]), []);

    fields = fields.concat(flattened);
  }

  return fields.concat(add);
};

const getNode = ({ fieldNodes }, name: string) => {
  const fields = fieldNodes
    .map(node => node.selectionSet.selections.find(s => s.name.value === name))
    .filter(node => node);

  return { fieldNodes: fields };
};

export { extractFields, getNode };
