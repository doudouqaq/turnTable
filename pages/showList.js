import React, { Component } from 'react';
import { List, Typography, Divider } from 'antd';
import { Table, Tag } from 'antd';
import axios from 'axios'
import CommonLayout from './components/commonLayout'

class showList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recordList: []
        }
    }
    componentDidMount() {
        axios.get('http://192.168.5.29:3000/listRecord', {
        // axios.get('http://47.102.118.76:3000/listRecord', {
        }).then((response) => {
            console.log(response.data);
            let list = response.data.map((item) => {
                return "用户账号为 " + item.account + " 的用户在" + item.time + "获得了" + item.level
            })
            console.log(list)
            this.setState({ recordList: list })

            console.log(this.state.recordList)
        }).catch(function (error) {
            console.log(error)
        });
    }

    render() {
        console.log(this.state.recordList)
        return (
            <CommonLayout>
            <>
                <List
                    header={<div>中奖记录</div>}
                    bordered
                    dataSource={this.state.recordList}
                    renderItem={item => (
                        <List.Item>
                            {/* <Typography.Text mark>[ITEM]</Typography.Text> {item} */}
                            {item}
                        </List.Item>
                    )}
                />
                {/* <Table columns={columns} dataSource={this.state.recordList} /> */}
            </>
            </CommonLayout>

        );
    }
}

export default showList;
