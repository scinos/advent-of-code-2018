const buildNode = input => {
  const numChildren = input.shift();
  const numMetadata = input.shift();
  const children = [];
  const metadata = [];

  for (let i = 0; i < numChildren; i += 1) {
    const result = buildNode(input);
    children.push(result);
  }

  for (let i = 0; i < numMetadata; i += 1) {
    metadata.push(input.shift());
  }

  return {
    children,
    metadata,
  };
};

function* walkAllNodes(root) {
  yield root;
  for (const node of root.children) {
    yield* walkAllNodes(node);
  }
}

function* walkIndexedNodes(root) {
  if (root.children.length) {
    for (const metadata of root.metadata) {
      const idx = metadata - 1;
      if (idx >= 0 && idx < root.children.length) {
        yield* walkIndexedNodes(root.children[idx]);
      }
    }
  } else {
    yield root;
  }
}

module.exports.challenge1 = input => {
  const root = buildNode(input);
  return Array.from(walkAllNodes(root)).reduce(
    (acc, node) => acc + node.metadata.reduce((a, b) => a + b),
    0,
  );
};

module.exports.challenge2 = input => {
  const root = buildNode(input);
  return Array.from(walkIndexedNodes(root)).reduce(
    (acc, node) => acc + node.metadata.reduce((a, b) => a + b),
    0,
  );
};
