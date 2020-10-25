import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import notifyStore from "@stores/notifyStore";
import "./NotifyItem.scss";

const NotifyItem = inject("notifyStore")(
  observer(({ NotifyStore, id, msg, timer }) => {
    useEffect(() => {
      setTimeout(() => {
        notifyStore.removeArrMsgItem(id);
      }, timer);
    });

    return <div className="notify-item">{msg}</div>;
  })
);

export default NotifyItem;
