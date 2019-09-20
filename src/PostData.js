import React, { Component } from 'react'

export default class extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: '',
        }
    }

    render() {
        const {
            state: { value }
        } = this;

        return (
            <form noValidate onSubmit={this.handlePostData}>
                <input type="text" title="Name" placeholder="Name" value={value} onChange={this.setData} />
                <br/>
                <button type="submit">Add</button>
            </form>
        )
    }

    setData = ({ target: { value } }) => this.setState({ value });

    handlePostData = async (event) => {
        event.preventDefault();

        try {
            await this.props.postDataFunc(this.state.value);
            this.setState({ value: '' })
        } catch (e) {
            console.error(e);
        }
    }
}