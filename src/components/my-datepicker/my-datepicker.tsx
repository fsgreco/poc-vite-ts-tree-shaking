import React from 'react';
import { DatePicker, Space } from 'antd';

/* eslint-disable-next-line */
export interface MyDatepickerProps {}

const { RangePicker } = DatePicker;

const MyDatepicker: React.FC = (props: MyDatepickerProps) => (
  <Space direction="vertical" size={12}>
    <RangePicker />
    <RangePicker showTime />
    <RangePicker picker="week" />
    <RangePicker picker="month" />
    <RangePicker picker="quarter" />
    <RangePicker picker="year" />
  </Space>
);

export default MyDatepicker;