import { FC, useReducer } from 'react';
import MyContext from "./commonContext";
import { Layout } from 'antd';
import './App.css';
import AppHeader from "./components/AppHeader"
import AppLayoutLeft from "./components/AppLayoutLeft/index"
import AppLayoutMain from "./components/AppLayoutMain/index"
import AppLayoutRight from "./components/AppLayoutRight/index"

const { Header, Footer, Sider, Content } = Layout;

const App: FC = () => {
  const useAuth = (): any => {
    const initialState = { componentData: [], selectComponent: {}, selectComponentIndex: -1 };
    const reducer = (prevState: any, action: any) => {
      let { data, index } = action
      switch (action.type) {
        case 'increment':
          return { ...prevState, componentData: [...prevState.componentData, data] };
        case 'updata-component-data':
          return { ...prevState, componentData: data };
        case 'change-select':
          return { ...prevState, selectComponent: data, selectComponentIndex: index };
        case 'updata-select-component':
          return { ...prevState, selectComponent: data };
        default:
          throw new Error();
      }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const increment = (data: any) => {
      console.log("increment", data)
      dispatch({ type: 'increment', data: data })
      dispatch({ type: 'change-select', data: data, index: state.componentData.length })
    }
    const changeSelect = (data: any = {}, index: number = -1) => {
      console.log("changeSelect", data, index)
      dispatch({ type: 'change-select', data: data, index: index })
    }
    const updataComponentData = (data: any) => {
      console.log("updataComponentData", data)
      dispatch({ type: 'updata-component-data', data: data })
    }
    const updataSelectComponent = (data: any) => {
      console.log("updataSelectComponent", data)
      dispatch({ type: 'updata-select-component', data: data })
    }
    return {
      state, increment, changeSelect, updataComponentData, updataSelectComponent
    }
  }


  return (
    <div className="App">
      <MyContext.Provider value={useAuth()}>
        <Layout>
          <Header className="app-header">
            <AppHeader />
          </Header>
          <Layout className="app-layout">
            <Sider className="app-layout-left">
              <AppLayoutLeft />
            </Sider>
            <Content className="app-layout-main">
              <AppLayoutMain />
            </Content>
            <Sider className="app-layout-right" width="400">
              <AppLayoutRight />
            </Sider>
          </Layout>
          <Footer className="app-footer"></Footer>
        </Layout>

      </MyContext.Provider>
    </div>
  )
};

export default App;
