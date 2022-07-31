import { FC, useReducer } from 'react';
import MyContext from "./commonContext";
import { Layout } from 'antd';
import './App.css';
import AppLayoutLeft from "./components/AppLayoutLeft/index"
import AppLayoutMain from "./components/AppLayoutMain/index"

const { Header, Footer, Sider, Content } = Layout;

const App: FC = () => {
  const useAuth = (): any => {
    const initialState = { componentData: [], temporaryComponentData: [], selectComponent: {}, selectComponentIndex: -1 };
    const reducer = (prevState: any, action: any) => {
      let { data, index } = action
      switch (action.type) {
        case 'increment':
          return { ...prevState, componentData: [...prevState.componentData, data], temporaryComponentData: [...prevState.temporaryComponentData, data] };
        case 'updata-component-data':
          return { ...prevState, temporaryComponentData: data };
        case 'change-select':
          return { ...prevState, selectComponent: data, selectComponentIndex: index };
        case 'updata-select':
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
    const changeSelectStyle = (data: any, index: number) => {
      let newSelectComponent = { ...state.selectComponent }
      let newTemporaryComponentData = [...state.temporaryComponentData]
      newSelectComponent.style = data

      newTemporaryComponentData.splice(index, 1, newSelectComponent)
      console.log("changeSelectStyle", newTemporaryComponentData)
      dispatch({ type: 'updata-component-data', data: newTemporaryComponentData })
    }
    return {
      state, increment, changeSelect, changeSelectStyle
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
