import { React } from 'react';
import { Row, Col, Form, Input, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { axiosDataSubmit } from '../../../redux/crud/axios/actionCreator';

function AddNew() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: state.AxiosCrud.loading,
    };
  });
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    dispatch(
      axiosDataSubmit({
        ...values,
      }),
    );
    form.resetFields();
  };

  return (
    <>
      <PageHeader
        className="flex items-center justify-between px-8 py-[25px] bg-transparent [&>div>div]:flex [&>div>div]:items-center gap-[12px] [&>div]:flex [&>div]:flex-wrap [&>div]:items-center [&>div]:justify-between [&>div]:w-full [&>div]:gap-[10px] [&>div>.ant-page-header-heading-left]:m-0 [&>div>.ant-page-header-heading-left]:gap-[12px] ant-page-header-ghost"
        buttons={[
          <Button
            className="bg-primary hover:bg-hbr-primary border-solid border-1 border-primary text-white dark:text-white87 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px]"
            size="default"
            key="1"
            type="primary"
          >
            <Link to="/admin/brand">View All</Link>
          </Button>,
        ]}
        ghost
        title="Add New"
      />
      <main className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={15}>
          <Col xs={24}>
            <div className="bg-white rounded-10 dark:bg-white10 p-[25px]">
              <Row justify="center">
                <Col xl={10} md={16} xs={24}>
                  <Form
                    className="mt-[25px]"
                    style={{ width: '100%' }}
                    layout="vertical"
                    form={form}
                    name="addNew"
                    onFinish={handleSubmit}
                  >
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Brand required!' }]}>
                      <Input />
                    </Form.Item>

                    <Form.Item name="is_active" label="Status" rules={[{ required: true, message: 'Please select a status!' }]} >
                      <Radio.Group>
                        <Radio checked value={1}>Active</Radio>
                        <Radio value={0}>Deactivated</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <div className="text-end record-form-actions">
                      <Button htmlType="Save" type="primary">
                        {isLoading ? 'Loading...' : 'Submit'}
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default AddNew;
