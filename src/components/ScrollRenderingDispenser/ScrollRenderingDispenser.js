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
        pageSize: 20
    };

    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1,
            renderingItems: props.items.slice(0, props.pageSize)
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollThrottled = throttle(this.handleScroll, 300);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScrollThrottled, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollThrottled, false);
    }

    handleScroll() {
        if (this.checkIfNeedsMoreContent()) {
            const lastRenderingItemIndex = this.state.pageNumber * this.props.pageSize;

            this.setState((prevState, props) => ({
                pageNumber: prevState.pageNumber + 1,
                renderingItems: [
                    ...prevState.renderingItems,
                    ...props.items.slice(lastRenderingItemIndex, lastRenderingItemIndex + props.pageSize)
                ]
            }));
        }
    }

    checkIfNeedsMoreContent() {
        if (this.state.renderingItems.length === this.props.items.length) {
            return false;
        }
        const pixelsFromWindowBottomToBottom = document.body.offsetHeight - window.scrollY - window.innerHeight;
        console.log(pixelsFromWindowBottomToBottom);
        return pixelsFromWindowBottomToBottom < 500;
    }

    render() {
        return this.props.children({items: this.state.renderingItems});
    }
}