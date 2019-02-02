import React from 'react'
import { Modal, Table, Divider, message } from 'antd';
import config from '../../config'


function showConfirm() {
    Modal.confirm({
        title: 'Do you want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() { },
    });
}


function info(stockHistoryList) {
    const columns = [{
        title: 'ชื่อคลังสิค้า',
        dataIndex: 'warehouseName',
        key: 'warehouseName',
    }, {
        title: 'จำนวน',
        dataIndex: 'quantity',
        key: 'quantity',
    }];
    Modal.info({
        title: 'ประวัติการเพิ่มสินค้า',
        content: (
            <div>
                <br />
                <Table dataSource={stockHistoryList} columns={columns} size="small" />
            </div>
        ),
        onOk() { },
    });
}

const getStockHistory = async (productId) => {
    try {
        const res = await fetch(`${config.rootUrl}stock_history?productId=${productId}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: 'GET',
        })
        const { stockHistoryList, success, message } = await res.json()
        if (success) {
            info(stockHistoryList)
        } else {
            message.error(message);
        }
    } catch (error) {
        message.error('มีบางอย่างผิดพลาดกรุณาลองใหม่');
    }
}

const columns = (props) => [{
    title: 'ชื่อสินค้า',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'ราคา/หน่วย',
    dataIndex: 'pricePerUnit',
    key: 'age',
    render: (text, record) => <span>{record.price} บาท/ {record.unit}</span>
}, {
    title: 'รายละเอียดสินค้า',
    dataIndex: 'description',
    key: 'description',
}, {
    title: 'สต๊อค',
    key: 'stock',
    dataIndex: 'stock',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <a onClick={() => getStockHistory(record.productId)}>ประวัติสต๊อค</a>
            <Divider type="vertical" />
            <a onClick={() => props.setEdit(record)}>แก้ไข</a>
            <Divider type="vertical" />
            <a onClick={() => showConfirm()}>ลบ</a>
        </span>
    ),
}];

class productList extends React.Component {
    render() {
        return (
            <div style={{ padding: "0px 20px" }}>
                <Table rowKey="productId" title={() => <h3>รายการสินค้า</h3>} columns={columns(this.props)} dataSource={this.props.data} />
            </div>
        )
    }
}

export default productList