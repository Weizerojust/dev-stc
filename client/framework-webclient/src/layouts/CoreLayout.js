import React, { Component, PropTypes } from 'react'
import 'STYLES/antd.min.css'
import 'STYLES/core.scss'
import './CoreLayout.scss'

import { Layout, Menu, Icon, Row, Tabs, message, Form, Affix, Button, Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import tabsMap from '../routes/tabsMap';

import {sysFetch} from '../utils/FetchUtil';
import {ProjectView} from "ROUTES/Project";

export const mainKey = 'projectList';

export default class CoreLayout extends Component
{
	constructor(props) {
		super(props);
	};

	static propTypes = {
	    sysUser: PropTypes.object.isRequired,
		modules: PropTypes.array.isRequired,
		panes: PropTypes.array.isRequired,
        activeKey: PropTypes.string.isRequired,
        addTab: PropTypes.func.isRequired,
        removeTab: PropTypes.func.isRequired,
        switchTab: PropTypes.func.isRequired
	};

    handleMenuClick = (e) =>{
        if(e.key==="logout"){
            sessionStorage.removeItem('sysUser');
            sessionStorage.removeItem('sysModules');
            message.info('退出成功，正在跳转');
            this.props.router.replace('/login');
        }
    };

    onEdit = (targetKey) => {
        this.props.removeTab(targetKey);
    };

    onChange = (activeKey) => {
        this.props.switchTab(activeKey);
    };

    mainPane = (
        <TabPane tab={'项目管理'} key={mainKey} closable={false}>
            {React.createElement(ProjectView)}
        </TabPane>
    )

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
    );

	render(){
	    console.log(this.props.panes);
		return (
			<Layout>
                <Affix offsetTop={0}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Dropdown overlay={this.menu}>
                            <Button style={{ marginLeft: 8 }}>
                                <Icon type="user"/> {this.props.sysUser.username} <Icon type="down" />
                            </Button>
                        </Dropdown>
                    </Header>
                </Affix>
                <Content style={{ margin: '0px 16px', padding: 24, background: '#fff', minHeight: 800 }}>
                    <Tabs
                        className="contentTab"
                        type="editable-card"
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                        hideAdd="true"
                        activeKey={this.props.activeKey}>
                        {this.mainPane}
                        {this.props.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                    </Tabs>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    出品：南京大学计算机系15级软工在线业务组
                </Footer>
            </Layout>
		);
	}
}


function findMenuByKey(key, menus) {
	let _menu = null;

	for(let i=0; i<menus.length; i++) {
        let menu = menus[i];

        if (menu.id === key) {
            _menu = menu;
            return _menu;
        }
    }
	return _menu;
}

function findPageByPath(path, pages) {
	for(let i=0; i<pages.length; i++) {
		let page = pages[i];

		if(page.path === path) {
			return page.component;
		}
	}
	return null;
}
