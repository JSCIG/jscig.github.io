//    >>> ECMAScript Proposal crawler <<<
//
//  [Data source]  https://github.com/tc39/proposals
//
//  [Example code]  copy(JSON.stringify(getProposals(3, $0), null, 4))
//
//    (c)2020  @TechQuery

function getNames({ childNodes }) {
  return Array.from(
    childNodes,
    ({ nodeType, nodeValue }) => nodeType === 3 && nodeValue
  ).filter(Boolean);
}

function getProposals(stage, { children }) {
  return Array.from(children, ({ children }) => {
    const repository = children[0].firstElementChild,
      timestamp = children[4]?.firstElementChild;

    return {
      stage,
      name: repository.textContent,
      link: repository.href,
      authors: getNames(children[1]),
      champions: getNames(children[2]),
      test_link: children[3].firstElementChild.href,
      updated_at: timestamp?.textContent,
      meeting_link: timestamp?.href,
    };
  });
}
