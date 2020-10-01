import React from "react";
import { observer, inject } from "mobx-react";
import { useStores } from "@hooks/use-stores";
import notifyStore from "@stores/notifyStore";
import "./Notify.scss";

const Notify = observer(({ msg }) => {
  const { notifyStore } = useStores();

  return <div className="notify">{notifyStore.message}</div>;
});

export default Notify;
