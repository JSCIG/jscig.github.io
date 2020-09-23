//    >>> ECMAScript Proposal crawler <<<
//
//  [Data source]  https://github.com/tc39/proposals
//
//  [Example code]  copy(JSON.stringify(getProposals(3, $0), null, 4))
//
//    (c)2020  @TechQuery @JSCIG

function getNames({ childNodes }) {
  return Array.from(
    childNodes,
    ({ nodeType, nodeValue }) => nodeType === 3 && nodeValue
  ).filter(Boolean);
}

function getProposals(stage, { children }) {
  return Array.from(children, ({ children }) => {
    const repository = children[0].firstElementChild,
      timestamp = (stage === 3 ? children[4] : children[3])?.firstElementChild;

    return {
      stage,
      name: repository.textContent,
      link: repository.href,
      authors: getNames(children[1]),
      champions: getNames(children[2]),
      test_link: stage === 3 ? children[3].firstElementChild.href : undefined,
      meeting_link: timestamp?.href,
      updated_at: timestamp?.textContent,
      published_at: stage === 4 ? children[4].textContent : undefined
    };
  });
}
