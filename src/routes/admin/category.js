import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../container/pages/404";

const Category = lazy(()=> import('../../container/category/Category'));

function categoryRoutes(){
    return (
       <Routes>
          <Route path="/" element={<Category/>}></Route>
          <Route path="*" element={<NotFound/>} />
       </Routes>
    );
}
export default categoryRoutes