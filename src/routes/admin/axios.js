import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const BrandView = lazy(() => import('../../container/brand/Index'));
const BrandAdd = lazy(() => import('../../container/brand/Add'));
const BrandEdit = lazy(() => import('../../container/brand/Edit'));
const NotFound = lazy(() => import('../../container/pages/404'));

function AxiosRoute() {
  return (
    <Routes>
      <Route path="/" element={<BrandView />} />
      <Route path="/add" element={<BrandAdd />} />
      <Route path="/edit/:id" element={<BrandEdit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AxiosRoute;
