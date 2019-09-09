import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink, Switch, Redirect } from "react-router-dom";
import { RouteWithSubRoutes } from "../../Routes";

const TabsNavigation = styled.div`
    display: flex;
    justify-content: center;  
`;

const TabsNavigationList = styled.ul`
    display: flex;
    
    margin: 0;
    padding: 0;
    overflow: hidden;
    
    border: 1px solid;
    border-radius: 3px;
    
    list-style: none;
`;

const NavLinkStyled = styled(NavLink)`
    padding: 0.25em 1em;
    text-decoration: none;
    transition: 0.2s all ease-out;
    line-height: 1.4;
    color: #4169E1;
    
    &.isActive {
        color: white;
        background: #4169E1;
    }
`;

export default class RouteTabs extends PureComponent {

    static propTypes = {
        defaultActiveRoutePath: PropTypes.string,
        routes: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            component: PropTypes.func.isRequired,
            exact: PropTypes.bool
        })).isRequired
    };

    renderTabsNavigationList() {
        return (
            <TabsNavigationList>
                {this.props.routes.map((route, index) => {
                    return (
                        <li key={index}>
                            <NavLinkStyled
                                to={route.path}
                                exact
                                activeClassName="isActive"
                            >
                                {route.title}
                            </NavLinkStyled>
                        </li>
                    );
                })}
            </TabsNavigationList>
        );
    }

    renderTabsContent() {

        const defaultActiveRoutePath = this.props.defaultActiveRoutePath || this.props.routes[0].path;
        return (
            <Switch>
                {this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}

                <Redirect from="/" to={defaultActiveRoutePath} exact />
            </Switch>
        )
    }

    render() {
        return (
            <section>
                <TabsNavigation>
                    {this.renderTabsNavigationList()}
                </TabsNavigation>

                {this.renderTabsContent()}
            </section>
        );
    }
};