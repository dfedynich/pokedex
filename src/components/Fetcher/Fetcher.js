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

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state);
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true }, this.handleChange);

        try {
            const result = await this.props.request();
            this.setState({
                data: result,
                isLoading: false
            }, this.handleChange);
        } catch (error) {
            console.error(error);
            this.setState({
                error,
                isLoading: false
            }, this.handleChange);
        }
    }

    render() {
        return this.props.children ? this.props.children(this.state) : null;
    }
}