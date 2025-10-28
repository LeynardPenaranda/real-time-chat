import { App as AntdApp } from "antd";
import Content from "./layout-components/content";
import Header from "./layout-components/header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdApp>
      {" "}
      {/* ✅ Provides global context for message, modal, notification, etc. */}
      <div>
        <Header />
        <Content>{children}</Content>
      </div>
    </AntdApp>
  );
};

export default LayoutProvider;
