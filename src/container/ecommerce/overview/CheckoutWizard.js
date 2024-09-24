import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Row, Col, Form, Input, Select, Radio, Table } from 'antd';
import { Link } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { useDispatch, useSelector } from 'react-redux';
import { Steps } from '../../../components/steps/steps';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { GlobalUtilityStyle } from '../../styled';
import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../redux/cart/actionCreator';

const { Option } = Select;
function CheckOut() {
  const dispatch = useDispatch();
  const { cartData, rtl } = useSelector((state) => {
    return {
      cartData: state.cart.data,
      isLoading: state.cart.loading,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  const [form] = Form.useForm();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
  });

  const { status, isFinished, current } = state;

  useEffect(() => {
    if (cartGetData) {
      dispatch(cartGetData());
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    const activeElement = document.querySelectorAll('.ant-steps-item-active');
    const successElement = document.querySelectorAll('.ant-steps-item-finish');

    activeElement.forEach((element) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        if (bgImage.classList.contains('success-step-item')) {
          bgImage.classList.remove('success-step-item');
        } else {
          bgImage.classList.remove('wizard-step-item');
        }
        bgImage.classList.add('wizard-steps-item-active');
      }
    });

    successElement.forEach((element) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        bgImage.classList.remove('wizard-steps-item-active');
        bgImage.classList.add('success-step-item');
        // if(bgImage.classList.has('.ant-steps-item-active'))
      }
    });
  });

  const incrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) + 1;
    dispatch(cartUpdateQuantity(id, data, cartData));
  };

  const decrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) >= 2 ? parseInt(quantity, 10) - 1 : 1;
    dispatch(cartUpdateQuantity(id, data, cartData));
  };

  const cartDeleted = (id) => {
    const confirm = window.confirm('Are you sure to delete this product?');
    if (confirm) dispatch(cartDelete(id, cartData));
  };

  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const done = () => {
    const confirm = window.confirm('Are sure to submit order?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });
    }
  };

  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const dataSource = [];

  let subtotal = 0;

  if (cartData !== null) {
    cartData.map((data) => {
      const { id, img, name, quantity, price, size, color } = data;
      subtotal += parseInt(quantity, 10) * parseInt(price, 10);
      return dataSource.push({
        key: id,
        product: (
          <div className="w-[300px]">
            <div className="flex items-center gap-x-[25px]">
              <img
                className="max-w-20 max-h-20 rounded-[10px]"
                style={{ width: 80 }}
                src={require(`../../../${img}`)}
                alt=""
              />
              <figcaption>
                <div>
                  <Heading as="h6" className="mb-2 text-base font-medium text-dark dark:text-white87">
                    {name}
                  </Heading>
                  <ul className="flex items-center gap-x-5">
                    <li className="inline-flex gap-x-[5px]">
                      <span className="text-dark dark:text-white87 text-[15px] font-medium">Size :</span>
                      <span className="text-body dark:text-white60 text-[15px]">{size}</span>
                    </li>
                    <li className="inline-flex gap-x-[5px]">
                      <span className="text-dark dark:text-white87 text-[15px] font-medium"> Color :</span>
                      <span className="text-body dark:text-white60 text-[15px]">{color}</span>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </div>
          </div>
        ),
        price: <span className="text-body dark:text-white60 text-[15px]">${price}</span>,
        quantity: (
          <div className="flex items-center gap-x-4">
            <Button
              onClick={() => decrementUpdate(id, quantity)}
              className="flex items-center justify-center bg-section dark:bg-white10 w-9 h-9 p-0 text-body dark:text-white60 border-none rounded-[10px]"
              type="default"
            >
              <UilMinus className="w-3 h-3" />
            </Button>
            {quantity}
            <Button
              onClick={() => incrementUpdate(id, quantity)}
              className="flex items-center justify-center bg-section dark:bg-white10 w-9 h-9 p-0 text-body dark:text-white60 border-none rounded-[10px]"
              type="default"
            >
              <UilPlus className="w-3 h-3" />
            </Button>
          </div>
        ),
        total: (
          <span className="text-dark dark:text-white87 text-[15px] font-medium">${(quantity * price).toFixed(2)}</span>
        ),
        action: (
          <div className="table-action">
            <Button
              onClick={() => cartDeleted(id)}
              className="btn-icon"
              to="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <UilTrashAlt />
            </Button>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <Steps
      isswitch
      current={0}
      status={status}
      steps={[
        {
          title: 'Create Account',
          content: (
            <div className="w-[580px] sm:px-[25px]">
              <Row justify="center">
                <Col sm={22} xs={24}>
                  <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                    1. Please Create Your Account
                  </Heading>
                  <Form form={form} name="account">
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b36] [&>.ant-form-item-row>div>div>div>input]:rounded-4 dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 [&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60"
                      name="username"
                      label="Username"
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b36] [&>.ant-form-item-row>div>div>div>input]:rounded-4 dark:[&>.ant-form-item-row>div>div>div>input]:text-white60 [&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60"
                      name="email"
                      rules={[{ type: 'email' }]}
                      label="Email Address"
                    >
                      <Input placeholder="name@gmail.com" />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      className="[&>div>div>div>div>span>span>svg]:w-[16px] ltr:[&>div>div>div>div>span>.ant-input-prefix]:mr-[10px] rtl:[&>div>div>div>div>span>.ant-input-prefix]:ml-[10px] [&>div>div>div>div>span>span>svg]:h-[16px] [&>div>div>div>div>span>span>svg]:text-light-extra dark:[&>div>div>div>div>span>span>svg]:h-[16px] [&>div>div>div>div>span>span>svg]:text-white60 [&>div>div>div>div>span>span>span>svg]:text-light-extra dark:[&>div>div>div>div>span>span>span>svg]:text-white60 [&>div>.ant-form-item-label]:text-start [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:pr-[20px] [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:py-0 dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:bg-[#282b36] dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:border-white10 [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:bg-transparent dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:bg-transparent dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:text-white60 [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:py-3 [&>.ant-form-item-row]:flex-col dark:[&>.ant-form-item-row>div>label]:text-white60"
                      name="password"
                      initialValue="1234567"
                    >
                      <Input.Password placeholder="Enter Password" />
                    </Form.Item>
                    <span className="text-theme-gray dark:text-white60 input-message">
                      Enter a valid password. Min 6 characters long
                    </span>
                  </Form>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          title: 'Shipping Address',
          content: (
            <div className="w-[580px] sm:px-[25px]">
              <Row justify="center">
                <Col sm={22} xs={24}>
                  <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                    2. Please Fill in Your Shipping Address
                  </Heading>
                  <Form form={form} name="address">
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                      name="name"
                      label="Contact Name"
                    >
                      <Input placeholder="Ibn adam" />
                    </Form.Item>
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                      name="company"
                      label={
                        <span>
                          Company Name <span>(Optional)</span>
                        </span>
                      }
                    >
                      <Input placeholder="adam" />
                    </Form.Item>
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                      name="phone"
                      label="Phone Number"
                    >
                      <Input placeholder="+880" />
                    </Form.Item>
                    <Form.Item
                      className="[&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60"
                      name="country"
                      initialValue=""
                      label="Country/Region"
                    >
                      <Select
                        className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 "
                        style={{ width: '100%' }}
                      >
                        <Option value="">Please Select</Option>
                        <Option value="bangladesh">Bangladesh</Option>
                        <Option value="india">India</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                      name="street"
                      label="Street Address"
                    >
                      <Input placeholder="House Number and Street Name" />
                    </Form.Item>
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                      name="street2"
                      label=""
                    >
                      <Input placeholder="Apartment, Suite, Unit etc." />
                    </Form.Item>
                    <Form.Item
                      className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                      name="city"
                      label="City"
                    >
                      <Input placeholder="Enter City" />
                    </Form.Item>
                    <Form.Item
                      className="mb-0 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                      name="zip"
                      label="Zip/Postal Code"
                    >
                      <Input placeholder="Enter Zip" />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          title: 'Payment Method',
          content: (
            <div className="w-[580px] sm:px-[25px] ssm:px-[15px]">
              <Row justify="center">
                <Col sm={22} xs={24}>
                  <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                    3. Please Select Your Payment Method
                  </Heading>
                  <Radio.Group style={{ width: '100%' }}>
                    <div className="mb-[25px]">
                      <Radio
                        style={{ width: '100%' }}
                        value="card"
                        className="[&>span:not(.ant-radio)]:w-full ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span.ant-radio]:mt-[30px]"
                      >
                        <Cards
                          headless
                          className="[&>.ant-card-body]:p-[25px] sm:[&>.ant-card-body]:p-[15px] bg-[#f7f8fa] dark:bg-[#282b36] border-1 border-solid border-normal dark:border-white10"
                          bodyStyle={{
                            borderRadius: '20px',
                          }}
                        >
                          <div className="flex items-center justify-between flex-wrap mb-[20px] gap-[10px]">
                            <span className="text-body dark:text-white60">Credit/Debit Card</span>
                            <div className="flex items-start gap-[15px]">
                              <img
                                style={{ width: '50px' }}
                                src={require('../../../static/img/cards-logo/ms.png')}
                                alt=""
                              />
                              <img
                                style={{ width: '50px' }}
                                src={require('../../../static/img/cards-logo/american-express.png')}
                                alt=""
                              />
                              <img
                                style={{ width: '50px' }}
                                src={require('../../../static/img/cards-logo/visa.png')}
                                alt=""
                              />
                            </div>
                          </div>
                          <Cards
                            className="[&>.ant-card-body]:p-[25px] dark:bg-[#1b1d2a]"
                            headless
                            style={{ marginBottom: 0 }}
                          >
                            <Form form={form} name="info">
                              <Form.Item
                                className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b35] [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                                name="number"
                                label="Card Number"
                              >
                                <Input placeholder="6547-8702-6987-2527" />
                              </Form.Item>
                              <Form.Item
                                className="[&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b35] [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                                name="name"
                                label="Name on Card"
                              >
                                <Input placeholder="Full name" />
                              </Form.Item>
                              <Form.Item
                                className="[&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60"
                                name="month"
                                initialValue=""
                                label="Expiration Date"
                              >
                                <Select
                                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray dark:[&>div]:rounded-md [&>.ant-select-arrow]:text-white60 [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 dark:[&>div]:bg-[#282b35]"
                                  style={{ width: '100%' }}
                                >
                                  <Option value="">MM</Option>
                                  {month.map((value) => (
                                    <Option key={value} value={value}>
                                      {value}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                className="[&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60"
                                name="year"
                                initialValue=""
                              >
                                <Select
                                  className="[&>div]:border-normal dark:[&>div]:border-white10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray dark:[&>div]:rounded-md dark:[&>.ant-select-arrow]:text-white60 [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white60 dark:[&>div]:bg-[#282b35]"
                                  style={{ width: '100%' }}
                                >
                                  <Option value="">YY</Option>
                                  <Option value={new Date().getFullYear()}>{new Date().getFullYear()}</Option>
                                  {month.map((value) => (
                                    <Option
                                      key={value}
                                      value={parseInt(new Date().getFullYear(), 10) + parseInt(value, 10)}
                                    >
                                      {parseInt(new Date().getFullYear(), 10) + parseInt(value, 10)}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                className="mb-0 [&>.ant-form-item-row>div>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>div>input]:border-white10 dark:[&>.ant-form-item-row>div>div>div>div>input]:bg-[#282b35] [&>.ant-form-item-row>div>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white60 [&>.ant-form-item-row]:flex-col"
                                name="cvv"
                                label="CVV"
                              >
                                <div className="flex items-center flex-wrap gap-[10px]">
                                  <Input className="max-w-[120px]" placeholder="XXX" />
                                  <Link className="" to="#">
                                    What is this?
                                  </Link>
                                </div>
                              </Form.Item>
                            </Form>
                          </Cards>
                        </Cards>
                      </Radio>
                    </div>
                    <div className="mb-[25px]">
                      <Radio
                        value="payPal"
                        style={{ width: '100%' }}
                        className="ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-regular dark:[&>span:not(.ant-radio)]:border-white10 [&>span:not(.ant-radio)]:rounded-[10px]"
                      >
                        Pay With PayPal
                        <img className="xs:hidden" src={require('../../../static/img/PayPalLogo.png')} alt="paypal" />
                      </Radio>
                    </div>
                    <div className="">
                      <Radio
                        value="cash"
                        style={{ width: '100%' }}
                        className="ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-regular dark:[&>span:not(.ant-radio)]:border-white10 [&>span:not(.ant-radio)]:rounded-[10px]"
                      >
                        Cash on delivery
                      </Radio>
                    </div>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          title: 'Review Order',
          content:
            status !== 'finish' ? (
              <div className="w-full 3xl:px-[30px] ssm:px-[15px]">
                <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                  4. Review and confirm Order
                </Heading>
                <GlobalUtilityStyle>
                  <div className="p-[25px] ssm:px-[15px] rounded-[10px] border border-normal dark:border-white10">
                    <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] ssm:px-[15px] rounded-[15px]">
                      <div>
                        <Heading
                          as="h5"
                          className="flex items-center justify-between mb-[22px] text-body dark:text-white60 text-lg ssm:text-base font-normal"
                        >
                          Shipping Information
                          <Link to="#" className="inline-flex items-center gap-x-[5px] text-sm">
                            <UilEdit className="w-[14px] h-[14px]" />
                            Edit
                          </Link>
                        </Heading>
                      </div>
                      <article>
                        <Radio.Group style={{ width: '100%' }}>
                          <Radio value="ms" style={{ width: '100%' }}>
                            <div className="mx-3">
                              <Heading as="h6" className="mb-2 text-[15px] font-medium">
                                Ibn Adam
                              </Heading>
                              <Heading as="h6" className="mb-2 text-[15px] font-medium">
                                Phone: +61412345678
                              </Heading>
                              <p className="text-[15px] text-body dark:text-white60">
                                795 Folsom Ave, Suite 600 <br />
                                San Francisco, CA 94107 <br />
                                United States
                              </p>
                            </div>
                          </Radio>
                        </Radio.Group>
                        <Link className="text-[13px] font-medium" to="#">
                          + Add New Address
                        </Link>
                      </article>
                    </div>
                    <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
                      <div>
                        <Heading
                          as="h5"
                          className="flex items-center justify-between mb-[25px] text-body dark:text-white60 text-lg font-normal"
                        >
                          Payment Method
                        </Heading>
                      </div>
                      <Radio.Group style={{ width: '100%' }}>
                        <Radio value="ms" style={{ width: '100%' }}>
                          <div className="mb-2 text-[15px] font-medium">
                            <img src={require('../../../static/img/ms.svg')} alt="" />
                            **** **** **** 2597
                          </div>
                        </Radio>
                      </Radio.Group>
                      <Link className="text-[13px] font-medium" to="#">
                        + Add New Card
                      </Link>
                    </div>
                    <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
                      <div className="border-b table-responsive table-bg-transparent table-head-none hover-tr-none table-td-border-none border-regular dark:border-white10">
                        <Table pagination={false} dataSource={dataSource} columns={columns} />
                      </div>
                      <Row justify="end">
                        <Col xxl={8} xl={5} md={9} sm={14} xs={24} offset={!rtl ? 10 : 0}>
                          <div className="invoice-summary-inner">
                            <ul className="flex flex-col mt-5 mb-[10px]">
                              <li className="inline-flex justify-between">
                                <span className="text-dark dark:text-white87 text-[15px] font-medium">Subtotal :</span>
                                <span className="text-dark dark:text-white87 text-[15px] font-medium">{`$${subtotal}`}</span>
                              </li>
                              <li className="inline-flex justify-between">
                                <span className="text-dark dark:text-white87 text-[15px] font-medium">Discount :</span>
                                <span className="text-dark dark:text-white87 text-[15px] font-medium">{`$${-20}`}</span>
                              </li>
                              <li className="inline-flex justify-between">
                                <span className="text-dark dark:text-white87 text-[15px] font-medium">
                                  Shipping Charge :
                                </span>
                                <span className="text-dark dark:text-white87 text-[15px] font-medium">{`$${30}`}</span>
                              </li>
                            </ul>
                            <Heading className="flex justify-between" as="h4">
                              <span className="text-base font-medium text-dark dark:text-white87">Total : </span>
                              <span className="text-lg font-semibold text-primary">{`$${subtotal + 30 - 20}`}</span>
                            </Heading>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </GlobalUtilityStyle>
              </div>
            ) : (
              <Row justify="center" style={{ width: '100%' }}>
                <Col xl={22} xs={24}>
                  <div className="checkout-successful 3xl:px-[30px]">
                    <Cards
                      headless
                      bodyStyle={{
                        borderRadius: '20px',
                      }}
                    >
                      <Cards headless>
                        <span className="icon-success">
                          <UilCheck />
                        </span>
                        <Heading as="h3">Payment Successful</Heading>
                        <p>Thank you! We have received your Payment</p>
                      </Cards>
                    </Cards>
                  </div>
                </Col>
              </Row>
            ),
        },
      ]}
      onNext={next}
      onPrev={prev}
      onDone={done}
      isfinished={isFinished}
    />
  );
}

export default CheckOut;
