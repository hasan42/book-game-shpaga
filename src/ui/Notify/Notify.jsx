import React from "react";
import { observer, inject } from "mobx-react";
import notifyStore from "../../stores/notifyStore";
import "./Notify.scss";

const Notify = inject("notifyStore")(
  observer(({ NotifyStore, msg }) => {
    return <div className="notify">{notifyStore.message}</div>;
  })
);

export default Notify;
