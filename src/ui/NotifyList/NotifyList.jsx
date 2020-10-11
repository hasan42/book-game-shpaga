import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import notifyStore from "@stores/notifyStore";
import "./NotifyList.scss";
import NotifyItem from "../NotifyItem/NotifyItem";

/* перевести на жизненные циклы */

@inject("notifyStore")
@observer
class NotifyList extends Component {

  render() {
    return (
      <div className="notify-list">
        {notifyStore.messageArray.map((item) => (
          <NotifyItem key={item.id} {...item} />
        ))}
      </div>
    )
  }
}

export default NotifyList;
