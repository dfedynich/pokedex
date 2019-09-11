import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

export default class ScrollRenderingDispenser extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        pageSize: PropTypes.number,
        children: PropTypes.func.isRequired
    };

    static defaultProps = {
        items: [],
        pageSize: 25
    };

    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollThrottled = throttle(this.handleScroll, 300);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScrollThrottled, false);
    }

    componentWillUnmount() {
        if (this.handleScrollThrottled) {
            window.removeEventListener('scroll', this.handleScrollThrottled, false);
        }
    }

    handleScroll() {
        if (this.checkIfNeedsMoreContent()) {
            this.setState((prevState) => ({
                pageNumber: prevState.pageNumber + 1
            }));
        }
    }

    checkIfNeedsMoreContent() {
        if (this.state.pageNumber * this.props.pageSize >= this.props.items.length) {
            return false;
        }
        const pixelsFromWindowBottomToBottom = document.body.offsetHeight - window.scrollY - window.innerHeight;
        return pixelsFromWindowBottomToBottom < 500;
    }


    render() {
        const renderingItems = this.props.items.slice(0, this.state.pageNumber * this.props.pageSize);
        return this.props.children({items: renderingItems});
    }
}