"use client";
import { ConfigProvider } from "antd";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#31304D",
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 48,
            boxShadow: "none",
            colorPrimaryHover: "#31304D",
            controlOutline: "none",
            colorBorder: "#31304D",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
