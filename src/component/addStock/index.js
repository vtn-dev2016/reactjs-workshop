import React from 'react'
import {
    Form, Input, Button, Select, Drawer, message
} from 'antd';
import config from '../../config'

const { Option } = Select
class AddStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            warehouseList: []
        }
    }

    async componentDidMount() {
        try {
            const res1 = await fetch(`${config.rootUrl}products`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: 'GET',
            })

            const res2 = await fetch(`${config.rootUrl}warehouses`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: 'GET',
            })
            const result1 = await res1.json()
            const result2 = await res2.json()

            if (result1.success) {
                this.setState({ productList: result1.productList })
            } else {
                message.error(message);
            }

            if (result2.success) {
                this.setState({ warehouseList: result2.warehouseList })
            } else {
                message.error(message);
            }

        } catch (error) {
            message.error('มีบางอย่างผิดพลาดกรุณาลองใหม่');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.addStock(values)
            }
        });
    }

    addStock = async (props) => {
        try {
            const res = await fetch(`${config.rootUrl}stock`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: 'POST',
                body: JSON.stringify(props)
            })
            const result = await res.json()
            if (result.success) {
                message.success(result.message)
                this.props.getProductLists()
                this.props.handleShowFrom({ stockForm: false })
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleShowFrom, stockForm } = this.props
        const productOption = this.state.productList.map(({ name, productId }) => <Option key={productId} value={productId}>{name}</Option>)
        const warehousesOption = this.state.warehouseList.map(({ name, warehouseId }) => <Option key={warehouseId} value={warehouseId}>{name}</Option>)
        return (
            <Drawer
                title="เพิ่มสต๊อค"
                width={520}
                onClose={() => handleShowFrom({ stockForm: false })}
                visible={stockForm}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='ชื่อสินค้า'>
                        {getFieldDecorator('productId', {
                            rules: [{ required: true, message: 'กรุณาเพิ่มชื่อสินค้า' }],
                        })(
                            <Select placeholder='เลือกสินค้า'>
                                {productOption}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label='จำนวน'>
                        {getFieldDecorator('quantity', {
                            rules: [{ required: true, message: 'กรุณาเพิ่มจำนวนสินค้า' }],
                        })(
                            <Input type="number" placeholder="จำนวน" />
                        )}
                    </Form.Item>
                    <Form.Item label='คัลงสิค้า'>
                        {getFieldDecorator('warehouseId', {
                            rules: [{ required: true, message: 'กรุณาเลือกคลังสิค้า' }],
                        })(
                            <Select placeholder='คลังสินค้า'>
                                {warehousesOption}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">เพิ่ม</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        )
    }
}

AddStock = Form.create({ name: 'AddStock' })(AddStock);
export default AddStock
