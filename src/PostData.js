import React, { Component } from 'react'

export default class extends Component {
    constructor(props, context) {
        super(props, context);

        this.fields = props.fields || ['value'];
        this.state = this.fields.reduce((a, i) => ({...a, [i]: ''}), {})
    }

    render() {
        return (
            <form noValidate onSubmit={this.handlePostData}>
                {
                    this.fields.map(i => (
                        <input
                            type="text"
                            id={i}
                            title={i}
                            placeholder={i}
                            value={this.state[i]}
                            onChange={this.handleChangeInput(i)}/>
                    ))
                }
                <br/>
                <button type="submit">Add</button>
            </form>
        )
    }

    handleChangeInput = field => event => this.setState({[field]: event.target.value});

    handlePostData = async (event) => {
        event.preventDefault();

        try {
            await this.props.postDataFunc(...this.fields.map(i => this.state[i]));
        } catch (e) {
            console.error(e);
        }

        this.fields.forEach(i => this.setState({ [i]: '' }));
    }
}