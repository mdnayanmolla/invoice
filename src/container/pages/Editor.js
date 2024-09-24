import React from 'react';
import { Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';



function Editors() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Editors',
    },
  ];
  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Editors"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
        </Row>
      </main>
    </>
  );
}

export default Editors;
