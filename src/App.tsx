import React, { FC } from 'react';
import { Layout } from 'antd';
import './App.css';
import AppLayoutLeft from "./components/AppLayoutLeft/index"
import AppLayoutMain from "./components/AppLayoutMain/index"

const { Header, Footer, Sider, Content } = Layout;

const App: FC = () => (
  <div className="App">
    <Layout>
      <Header className="app-header">
      </Header>
      <Layout className="app-layout">
        <Sider className="app-layout-left">
          <AppLayoutLeft />
        </Sider>
        <Content className="app-layout-main">
          <AppLayoutMain />
        </Content>
        <Sider className="app-layout-right" width="250"></Sider>
      </Layout>
      <Footer className="app-footer"></Footer>
    </Layout>
  </div>
);

export default App;
