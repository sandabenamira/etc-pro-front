import React from 'react';
import { ResponsiveContainer} from 'recharts';
 import {salesStatisticData} from "./data";
import SalesGauge from "../../../components/dashboard/eCommerce/SalesGauge";

const SalesStatistic = () => {
  return (
    <div className="jr-card">
      <div className="jr-card-header d-flex align-items-center">
        <h3 className="mb-0">Etat Discipline</h3>
      </div>


        <div className="col-lg-7 col-12 mb-5 mb-lg-1">
          <ResponsiveContainer width="200%">
          <SalesGauge/>
          </ResponsiveContainer>
        </div>
          </div>
  );
};

export default SalesStatistic;
