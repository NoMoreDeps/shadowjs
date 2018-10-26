import * as React from "react";
declare var Prism: any;

type Props = {
  language: string;
  text: string;
}

export default class extends React.PureComponent<Props> {
  mainElement: HTMLElement;

  constructor(props: Props) {
    super(props);
  }

  applyHighlihgting(ref: HTMLElement) {
    Prism.highlightAllUnder(ref);
  }

  render() {
    return <pre ref={(elt) => {
      if (!this.mainElement) {
        this.mainElement = elt;
        this.applyHighlihgting(elt)
      }
    }}><code className={`line-numbers language-${this.props.language}`}>{this.props.text}</code></pre>;
  }
}