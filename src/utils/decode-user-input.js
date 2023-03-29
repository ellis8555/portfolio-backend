const sanitizeComment = (stringToDecode) => {
  const decodeHtmlEntities = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&#47;": "/",
  };
  const decodedString = stringToDecode.replace(
    /(&lt;|&gt;|&amp;|&quot;|&#39;|&#47;)/g,
    (entity) => decodeHtmlEntities[entity]
  );
  return decodedString;
};

module.exports = sanitizeComment;
