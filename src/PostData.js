import React, { Component, Fragment } from 'react'

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
                    this.fields.map((i, index) => (
                        <Fragment key={i}>
                            <input
                                type="text"
                                title={i}
                                placeholder={i}
                                value={this.state[i]}
                                onChange={this.handleChangeInput(i)}/>
                            {(index < this.fields.length - 1) && (<b> , </b>)}
                        </Fragment>
                    ))
                }
                <br/>
                <button type="submit">Add</button>
            </form>
        )
    }

    handleChangeInput = field => event => this.setState({[field]: event.target.value});

    handlePostData = async event => {
        event.preventDefault();

        try {
            const result = await this.props.postDataFunc(...this.fields.map(i => this.state[i]));
            console.log(result)
        } catch (e) {
            console.error(e);
        }

        this.fields.forEach(i => this.setState({ [i]: '' }));
    }
}