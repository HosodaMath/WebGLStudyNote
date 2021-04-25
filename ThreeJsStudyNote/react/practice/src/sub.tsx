import * as React from "react";

// Ipropsインターフェースの定義
interface Iprops {
  name: string;
}

//  Istateインターフェースの定義
interface IState {
  count: number;
}

export class Sub extends React.Component<Iprops, IState> {
  constructor(props: Iprops | Readonly<Iprops>) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    console.log("クリックされました。");

    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <div>{this.state.count}</div>
        <button onClick={this.handleClick.bind(this)}>Add + 1</button>
      </div>
    );
  }
}
