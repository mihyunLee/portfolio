function markdownToObject(markdownData) {
  const dataArray = markdownData.split("\r\n");
  const contentArr = [];
  const result = {};

  for (const item of dataArray) {
    const parts = item.split(">");

    if (parts.length === 2) {
      // 'key> value' -> result[key] = value
      const key = parts[0].trim();
      const value = parts[1].trim();

      result[key] = value;
    } else if (item.indexOf("-") === 0) {
      // '- item' -> result.content = [...etc, '- item']
      contentArr.push(item);
    }
  }

  result.content = contentArr;

  return result;
}

export default markdownToObject;
