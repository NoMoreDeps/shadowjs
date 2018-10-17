import * as React from "react";
declare var Prism: any;

type Props = {
  language: string;
}

export default class extends React.PureComponent<Props> {
  mainElement: HTMLElement;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    Prism.highlightAllUnder(this.mainElement);
  }

  render() {
    return <pre ref={(elt) => {this.mainElement = elt}}><code className={`line-numbers language-${this.props.language}`}>{this.props.children}</code></pre>;
  }
}