import React, { useState, useEffect } from "react";
import moment from "moment";
import queryString from "query-string";
import { detailsStatisticStore } from "../../../../api/adminAPI";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import DatePickers from "../../../../components/Date Picker/DatePicker.component";

export default function DetailsStatiscStore(props) {
  const search = queryString.parse(props.query);
  const storeID = search.id;
  const [store, setStore] = useState([]);
  const [dateSelect, setDateSelect] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    await detailsStatisticStore(storeID).then((res) => {
      setStore(res.data);
      console.log(res.data);
      props.handleLoading(false);
    });
  }, [storeID]);
  const converDate = (date) => {
    return moment(date).format("DD/MM/YYYY, LTS");
  };

  const handleChangeDate = (date) => {
    setDateSelect(date);
  };

  console.log(store);
  let rows = [
    {
      id: 0,
      customer: "",
      code: "",
      total: 0,
      amount: "",
      staff: "",
      time: "",
    },
  ];
  if (store.length !== 0) {
    rows = store.deal
      ?.filter((date) => {
        if (dateSelect) {
          return (
            moment(date.deal.deal.created).format("DD/MM/YYYY") === dateSelect
          );
        } else {
          return date;
        }
      })
      .map((e, index) => {
        return {
          id: index + 1,
          customer: e.customer.name,
          code: e.deal.deal.number,
          total: e.deal.deal.quantity,
          amount: e.deal.deal.amount,
          staff: e.staff.fullName,
          time: converDate(e.deal.deal.created),
        };
      });
  }

  const columns = [
    {
      field: "customer",
      headerName: "Khách hàng",
      width: 160,
    },
    {
      field: "code",
      headerName: "Mã vé",
      width: 160,
    },
    {
      field: "total",
      headerName: "Số lượng",
      width: 140,
    },
    {
      field: "amount",
      headerName: "Tổng tiền",
      width: 160,
    },
    {
      field: "staff",
      headerName: "Nhân viên",
      width: 160,
    },
    {
      field: "time",
      headerName: "Thời gian",
      width: 200,
    },
  ];
  const total = () => {
    let total = 0;
    for (let item of rows) {
      total = total + item.total;
    }
    return <span>Tổng vé bán được: {total}</span>;
  };

  return (
    <Grid className="main">
      <div className="title-header">
        <span>
          Thống kê đại lý: ({" "}
          <span style={{ color: "green" }}>{store?.store?.storeName}</span> )
        </span>
      </div>
      <hr />
      <div className="mt-3 ml-2">
        <DatePickers handleChangeDate={handleChangeDate} />
      </div>
      <div className="mt-3 ml-2">{total()}</div>
      <hr />
      <div className="mt-3">
        <TableComponent rows={rows} columns={columns} />
      </div>
    </Grid>
  );
}
