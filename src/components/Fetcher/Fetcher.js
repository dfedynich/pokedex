import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Fetcher extends PureComponent {
    static propTypes = {
        request: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const result = await this.props.request();
            this.setState({
                data: result,
                isLoading: false
            });
        } catch (error) {
            console.error(error);
            this.setState({
                error,
                isLoading: false
            });
        }
    }

    render() {
        return this.props.children(this.state);
    }
}