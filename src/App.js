import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { analysisFun, snippetNum } from "./demo/trySourceMap.js";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      sourcemapData: {}
    };
  }

  async componentDidMount() {
    let res = await analysisFun();
    this.setState({
      code: res.code,
      sourcemapData: res.sourcemapData
    });
  }

  render() {
    let { code, sourcemapData } = this.state;
    let lineNum = sourcemapData ? sourcemapData.line - snippetNum + 1 : 1;
    return (
      <div>
        <SyntaxHighlighter
          language="javascript"
          style={base16AteliersulphurpoolLight}
          showLineNumbers
          startingLineNumber={lineNum > 0 ? lineNum : 1}
          wrapLines={true}
          lineProps={(num) =>
            num == sourcemapData.line
              ? { class: "mark-line" }
              : { class: "line" }
          }
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default App;
