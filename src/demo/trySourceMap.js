import { rawSourceMap } from "./sourcemap.js";
//错误位置
const pos = {
  row: 1,
  column: 946
};
// 保留错误代码片段前后行数
export const snippetNum = 10;

export const analysisFun = async () => {
  const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
  // 传入要查找的行列数，查找到压缩前的源文件及行列数
  const sourcemapData = consumer.originalPositionFor({
    line: pos.row, // 压缩后的行数
    column: pos.column // 压缩后的列数
  });
  // console.log("源代码信息:\n ", JSON.stringify(sourcemapData));

  if (!sourcemapData.source) return;

  const sources = consumer.sources;
  // 根据查到的source，到源文件列表中查找索引位置
  const index = sources.indexOf(sourcemapData.source);
  // 到源码列表中查到源代码
  const content = consumer.sourcesContent[index];

  // 将源代码串按"行结束标记"拆分为数组形式
  const rawLines = content.split(/\r?\n/g);
  console.log(1111, rawLines);
  // 输出源码行，因为数组索引从0开始，故行数需要-1
  let code = [];
  for (
    let i = sourcemapData.line - snippetNum;
    i < sourcemapData.line + snippetNum;
    i++
  ) {
    if (i >= 0) {
      code.push(rawLines[i]);
    }
  }
  console.log("具体代码:\n ", sourcemapData, code.join("\n"));
  return { sourcemapData, code: code.join("\n") };
};
