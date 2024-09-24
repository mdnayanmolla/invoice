import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Radio, Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { axiosDataUpdate, axiosDataSingle } from '../../../redux/crud/axios/actionCreator';
function Edit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { crud, isLoading } = useSelector((state) => {
    return {
      crud: state.SingleAxiosCrud.data,
      isLoading: state.AxiosCrud.loading,
    };
  });

  const [form] = Form.useForm();
  useEffect(() => {
    if (axiosDataSingle) {
      dispatch(axiosDataSingle(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  const handleSubmit = (values) => {
    dispatch(
      axiosDataUpdate(id, {
        ...values,
      }),
    );
  };

  return (
    <>
      <PageHeader
        className="hexadash-page-header-main"
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/brand">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Update Your Recored"
      />
      <main className="min-h-[715px] lg:min-h-[580px]">
        <Row gutter={15}>
          <Col xs={24}>
            <div>
              <Cards headless>
                {crud === null ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
                      <div>
                        {crud.name !== undefined ? (
                          <Form
                            className="add-record-form"
                            style={{ width: '100%' }}
                            layout="vertical"
                            form={form}
                            name="edit"
                            onFinish={handleSubmit}
                            initialValues={crud}
                          >
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Brand required!' }]}>
                              <Input />
                            </Form.Item>

                            <Form.Item
                              name="is_active"
                              label="Status"
                              rules={[{ required: true, message: 'Please select a status!' }]}
                            >
                              <Radio.Group>
                                <Radio value={1}>Active</Radio>
                                <Radio value={0}>Deactivated</Radio>
                              </Radio.Group>
                            </Form.Item>
                            <div className="record-form-actions text-end">
                              <Button htmlType="submit" type="primary">
                                {isLoading ? 'Loading...' : 'Update'}
                              </Button>
                            </div>
                          </Form>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                )}
              </Cards>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

Edit.propTypes = {
  match: PropTypes.object,
};

export default Edit;