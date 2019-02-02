import React from 'react'
import {
    Form, Row, Input, Button, Col, Drawer, message
} from 'antd';
import config from '../../config'
const { rootUrl } = config
const { TextArea } = Input;

class AddProduct extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.editProduct !== this.props.editProduct && this.props.editProduct) {
            const { description, name, price, unit } = this.props.editProduct
            this.props.form.setFieldsValue({
                description, name, price, unit
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.editProduct ? this.editProduct(values) : this.addProduct(values)
            }
        });
    }

    addProduct = async (props) => {
        try {
            const res = await fetch(`${rootUrl}product`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: 'POST',
                body: JSON.stringify(props)
            })
            const {success, message: { msg }} = await res.json()
            if (success){
                message.success(msg)
                this.props.getProductLists()
                this.props.handleShowFrom({ productForm: false })
            }
        } catch (error) {
            console.log(error)
            message.error('เซิฟตาย')
        }
    }

    editProduct = async (props) => {
        try {
            const res = await fetch(`${rootUrl}product`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: 'PUT',
                body: JSON.stringify({ ...props, productId: this.props.editProduct.productId })
            })
            const { success, message: { msg } } = await res.json()
            if (success) {
                message.success(msg)
                this.props.getProductLists()
                this.props.handleShowFrom({ productForm: false })
            }
        } catch (error) {
            console.log(error)
            message.error('เซิฟตาย')
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleShowFrom, productForm } = this.props
        return (
            <Drawer
                title={this.props.editProduct ? 'แก้ไข' : 'เพิ่ม'}
                width={520}
                onClose={() => handleShowFrom({ productForm: false, editProduct: null })}
                visible={productForm}
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label='ชื่อสินค้า'>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'กรุณาเพิ่มชื่อสินค้า' }],
                        })(
                            <Input placeholder="ชื่อสินค้า" />
                        )}
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label='price'>
                                {getFieldDecorator('price', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input type="number" placeholder="" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='unit'>
                                {getFieldDecorator('unit', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input placeholder="" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label='คำอธิบาย'>
                        {getFieldDecorator('description', {
                            rules: [{ required: false, message: 'Please input your Password!' }],
                        })(
                            <TextArea rows={4} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">{this.props.editProduct ? 'แก้ไข' : 'เพิ่ม'}</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        )
    }
}

AddProduct = Form.create({ name: 'AddProduct' })(AddProduct);
export default AddProduct