import React, { Component, Fragment } from 'react'

export default class extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false,
            children: 'Not loaded'
        }
    }

    render() {
        const {
            props: { buttonMessage = 'Load' },
            state: { children }
        } = this;

        return (
            <Fragment>
                <pre>{children}</pre>
                <br/>
                <button type="button" onClick={this.handleLoadData}>{buttonMessage}</button>
            </Fragment>
        )
    }

    handleLoadData = async () => {
        const wrong = 'Something went wrong';
        let children;

        this.setState({ isLoading: true, children: 'Loading' });

        try {
            children = await this.props.loadDataFunc() || wrong
        } catch (e) {
            console.error(e);
            children = wrong
        }
        this.setState({ isLoading: false, children })
    }
}