/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import Heading from '../../components/heading/heading';
import DataTable from '../../components/table/DataTable';

import { GlobalUtilityStyle, PaginationStyle } from '../styled';
import { brandDataDelete, brandDataRead, brandDataSearch } from '../../redux/brand/actionCreator';
import { tableReadData } from '../../redux/data-filter/actionCreator';

function DataTables() {
  const dispatch = useDispatch();

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Table',
    },
  ];

  useEffect(() => {
    if (dispatch) {
      dispatch(brandDataRead());
    }
  }, [dispatch]);

  const { TableData,status } = useSelector((states) => {
    return {
      TableData: states.BrandCrud.data.data ?? [],
      status:  states.BrandCrud,
    };
  });
console.log(status);
  const tableDataScource = [];

  if (TableData.length > 0) {
    TableData.map((item) => {
      const { id, name, status, date } = item;
      return tableDataScource.push({
        id: <span className="text-body dark:text-white60 text-[15px] font-medium">{`#${id}`}</span>,
        name: <span className="text-body dark:text-white60 text-[15px] font-medium">{name}</span>,
        date: <span className="text-body dark:text-white60 text-[15px] font-medium">{date}</span>,
        status: (
          <span
            className={`inline-flex items-center justify-center bg-${status}-transparent text-${status} min-h-[24px] px-3 text-xs font-medium rounded-[15px]`}
          >
            {status}
          </span>
        ),
        action: (
          <div className="min-w-[150px] text-end -m-2">
            <Link className="inline-block m-2" to="#">
              <UilEye className="w-4 text-light-extra dark:text-white60" />
            </Link>
            <Link className="inline-block m-2" to="#">
              <UilEdit className="w-4 text-light-extra dark:text-white60" />
            </Link>
            <Link className="inline-block m-2" to="#">
              <UilTrash className="w-4 text-light-extra dark:text-white60" />
            </Link>
          </div>
        ),
      });
    });
  }

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Manage Brand"
        subTitle={
          <Link
            className="bg-primary hover:bg-hbr-primary border-solid border-1 border-primary text-white dark:text-white87 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px]"
            to="/admin/brand/add"
          >
            <UilPlus className="w-[15px] h-[15px]" /> <span>Add New</span>
          </Link>
        }
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <GlobalUtilityStyle>
          <Row gutter={15}>
            <Col xs={24} className="mb-[25px]">
              <PaginationStyle>
                <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
                  <div className="py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                    <Heading as="h4" className="text-lg font-medium mb-0">
                      Brand List
                    </Heading>
                  </div>
                  <div className="p-[25px]">
                    <DataTable
                      filterOption
                      filterOnchange
                      tableData={tableDataScource}
                      columns={dataTableColumn}
                      rowSelection={false}
                    />
                  </div>
                </div>
              </PaginationStyle>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </>
  );
}

export default DataTables;
