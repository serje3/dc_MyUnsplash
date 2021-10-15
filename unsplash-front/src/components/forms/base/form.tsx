import React, {CSSProperties} from "react";
import {IFormProps} from "../../../utils/props/formProps";

export default class Form extends React.Component<IFormProps, {style: CSSProperties}>{
    constructor(props: any) {
        super(props);
        this.state = {
            style: {
                display: this.props.style?.display || 'none'
            }
        }
    }

    render() {

        return (
            <div ref={this.props.reference} className="window__wrapper" style={this.state.style}>
                <form method={this.props.method} onSubmit={this.props.onSubmit}>
                {this.props.children}
                </form>
            </div>
        );
    }
}