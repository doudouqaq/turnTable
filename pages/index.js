import React, { Component } from 'react';
import { Button, Input, Layout } from 'antd';
import axios from 'axios'
import Router from 'next/router'
import CommonLayout from './components/commonLayout'
const { Header, Footer, Sider, Content } = Layout;

export default class login extends Component {
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
  login() {
    console.log("1111")
    var that = this;
    axios.get('http://192.168.5.29:3000/login', {
      // axios.get('http://47.102.118.76:3000/login', {
      params: {
        account: that.state.account,
        password: that.state.password
      }
    }).then((response) => {
      console.log(response)
      if (response.data.message === '成功') {
        Router.push({
          pathname: '/turnTable',
          params: {
            account: this.state.account
          }
        })
        var storage = window.sessionStorage;
        storage.setItem('isLogin', true);
        storage.setItem('account', this.state.account);
      } else {
        alert("密码错误")
      }
    })
    // this.props.history.push('/turnTable');

  }
  register() {
    Router.push({
      pathname: '/register',
      params: {
        account: this.state.account
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
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      flexDirection: `column`
    }
    const content = {
      height: `50%`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      flexDirection: `column`

    }
    const footer = {
      height: `25%`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      flexDirection: `row`
    }
    return (
      <CommonLayout>
        <style jsx>{`
          .input{
            display:block;
            border-radius: 3px;
            margin: 30px;
          }
          .header{
              width: 25%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 40px;
          }
          .footer{
              display: flex;
              justify-content: center;
              align-items: center;
          }
          button{
              width: 150px;
              height: 60px;
              border-radius: 10px;
              background-color: yellowgreen;
              font-size: 30px;
              margin: 40px;
          }
          
          .ant-input-suffix{
              display: none;
          }
          
          input{
              width: 400px;
              height: 40px;
              font-size: 40px;
          }
        `}</style>
        <Layout style={layout}>
          <Header style={header}>登录</Header>
          <Content style={content}>
            <Input className="input" placeholder="input account" value={this.state.account} onChange={(event) => this.handleAccountChange(event)} />
            <Input.Password visibilityToggle="false" className="input" placeholder="input password" value={this.state.password} onChange={(event) => this.handlePasswordChange(event)} />
          </Content>
          <Footer className="footer" style={footer}>
            <Button type="primary" block onClick={(event) => this.login(event)}>登录</Button>
            <Button type="primary" block onClick={() => this.register()}>注册</Button>
          </Footer>
        </Layout>
      </CommonLayout>
    );
  }
}