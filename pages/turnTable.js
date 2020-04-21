import React, { Component } from "react";
import { Button, Input, Layout } from 'antd';
import Router from 'next/router'
import axios from 'axios'
import throttle from 'lodash.throttle';
import CommonLayout from './components/commonLayout'

const { Header, Footer, Sider, Content } = Layout;
export default class TurnTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prizeMap: {
                "0-60": "三等奖",
                "60-120": "谢谢参与",
                "120-180": "一等奖",
                "180-240": "再接再厉",
                "240-300": "二等奖",
                "300-360": "幸运奖"
            },
            // 旋转次数
            rotateTimes: 1,
            // 用户获得的奖项
            userPrize: "",
            // 当前旋转的角度
            currentAngle: 0,
        };
        this.start = this.start.bind(this);
        this.startThrottled = throttle(this.start, 5000);
    }
    // 开始抽奖
    start() {
        let storage = window.sessionStorage;
        axios.get('http://192.168.5.29:3000/start', {
            // axios.get('http://47.102.118.76:3000/start', {
            params: {
                account: storage.getItem("account")
            }
        }).then((response) => {
            console.log(response.data.prize);
            this.setState({ userPrize: response.data.prize });
            // 获取角度区间
            const possibleRangeArr = Object.entries(this.state.prizeMap)
                .map(([key, value]) => {
                    if (value === this.state.userPrize) {
                        return key;
                    }
                })
                .filter(Boolean);
            const randomRangeStr = possibleRangeArr[Math.floor(Math.random() * possibleRangeArr.length)];
            //获取随机旋转度数：
            const randomRangeArr = randomRangeStr.split("-");
            const randomAngle = Math.floor(Math.random() * (randomRangeArr[1] / 1 - 5 - (randomRangeArr[0] / 1 + 5)) + randomRangeArr[0] / 1);
            this.setState({
                rotateTimes: this.state.rotateTimes + 1,
                currentAngle: randomAngle + 360 * 5 * this.state.rotateTimes
            });

        }).catch(function (error) {
            console.log(error)
        });
    }
    // 退出登陆
    logout() {
        let storage = window.sessionStorage;
        storage.setItem('isLogin', false);
        Router.push({
            pathname: '/'
        })
    }
    // 显示抽奖记录
    showlist() {
        Router.push({
            pathname: '/showList'
        })
    }
    render() {
        const style = {
            transform: `rotateZ(${this.state.currentAngle}deg)`
        };
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
            flexDirection: `row`
        }
        const content = {
            height: `75%`,
            disply: `flex`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            flexDirection: `column`

        }
        let storage = window.sessionStorage;
        if (storage.getItem("isLogin") != "true") {
            Router.push({
                pathname: '/'
            })
        }
        return (
            <CommonLayout>
                <Layout style={layout}>
                    <Header style={header}>
                        <Button type="primary" block onClick={() => this.showlist()}>查看记录</Button>
                        <Button type="primary" block onClick={() => this.logout()}>退出登录</Button>
                    </Header>

                    <Content style={content}>
                        <div className="prize">
                            <div className="arrow" onClick={this.startThrottled}></div>
                            <div className="turnTable" style={style}></div>
                        </div>
                    </Content>
                    <style jsx>{`
                        .html{
                            height: 100%;
                            width: 100%;
                        }
                        .container{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                        }
                        .prize{
                            position: relative;
                            width: 400px;
                            height: 400px;
                        }
                        .arrow{
                            position: absolute;
                            z-index: 1000;
                            left: 50%;
                            top: 50%;
                            transform: translateX(calc( -50% + 1px )) translateY( -50% );
                            width: 106px;
                            height: 146px;
                            background: url("/static/arrow.png") no-repeat center/400px;
                        }
                        
                        .turnTable{
                            z-index: 0;
                            width: 100%;
                            height: 100%;
                            background:url("/static/turnTable.png") no-repeat center/contain;
                            transition:all 4s ease;
                        }
                    `}</style>
                </Layout>
            </CommonLayout>
        );

    }
}


