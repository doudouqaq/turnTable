import React, { Component } from 'react';
import { Button, Input, Layout } from 'antd';
// import './register.css'
import axios from 'axios'
import CommonLayout from './components/commonLayout'

// console.log(window)
const { Header, Footer, Sider, Content } = Layout;
class register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: ''
        };
    };
    handleAccountChange(event) {
        this.setState({ account: event.target.value })
    };
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    };
    login(event) {
        var that = this;
        // axios.post('http://47.102.118:3000/register', {
        axios.post('http://192.168.5.29:3000/register', {
            account: that.state.account,
            password: that.state.password
        }).then((response) => {
            console.log(response)
            if (response.data.message === '成功') {
                alert("注册成功")
                Router.push({
                    pathname: '/'
                })
            } else {
                alert(response.data.message)
            }
        })
    }
    render() {
        const layout = {
            width: `100%`,
            height: `100%`
        }
        const header = {
            height: `25%`,
            fontSize: `50px`,
            disply: `flex`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            flexDirection: `column`
        }
        const content = {
            height: `50%`,
            disply: `flex`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            flexDirection: `column`

        }
        const footer = {
            height: `25%`
        }
        return (
            <CommonLayout>
                <Layout style={layout}>
                    <Header style={header}>注册</Header>
                    <Content style={content}>
                        <Input className="input" placeholder="input account" value={this.state.account} onChange={(event) => this.handleAccountChange(event)} />
                        <Input.Password visibilityToggle="false" className="input" placeholder="input password" value={this.state.password} onChange={(event) => this.handlePasswordChange(event)} />
                    </Content>
                    <Footer className="footer" style={footer}>
                        <Button type="primary" block onClick={(event) => this.login(event)}>注册</Button>
                    </Footer>
                </Layout>
            </CommonLayout>
        );
    }
}

export default register;
