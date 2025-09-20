import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Details from "../pages/details/Details";
import Form from "../pages/form/Form";
import Table from "../pages/table/Table";

const AppRoutes: React.FC =() => {
    return (
        <Routes>
            <Route index element={<Table />} />
            <Route path='/form' element={<Form />} />
            <Route path='/details' element={<Details />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AppRoutes;