import { FC, useReducer } from 'react';
import MyContext from "./commonContext";
import { Layout } from 'antd';
import './App.css';
import AppLayoutLeft from "./components/AppLayoutLeft/index"
import AppLayoutMain from "./components/AppLayoutMain/index"

const { Header, Footer, Sider, Content } = Layout;

const App: FC = () => {
  const useAuth = (): any => {
    const initialState = { componentData: [], selectComponent: {}, selectComponentIndex: "", };
    const reducer = (prevState: any, action: any) => {
      let { data } = action

      switch (action.type) {
        case 'increment':
          return { ...prevState, componentData: [...prevState.componentData, data] };

        case 'change-select':
          return { ...prevState, selectComponent: data, selectComponentIndex: data.id };
        default:
          throw new Error();
      }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const increment = (data: any) => {
      dispatch({ type: 'increment', data: data })
      console.log("App", data)
    }
    return {
      state, increment
    }
  }


  return (
    <div className="App">
      <MyContext.Provider value={useAuth()}>
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

      </MyContext.Provider>
    </div>
  )
};

export default App;
