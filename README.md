# Resume

## 目录 

```
├─components                    // 公共组件
│  ├─AppHeader                  // 头部菜单栏（未完成）
│  ├─AppLayoutLeft              // 自定义组件栏
│  ├─AppLayoutMain              // 画图（编辑布局） 
│  │  └─Control                 // 组件功能控件
│  │  
│  └─AppLayoutRight             // 组件属性栏
│     ├─config.tsx              // 样式属性配置文件  
│     └─FormType.tsx            // 自定义表单控件 
│
├─custom-component              // 自定义组件
│  ├─ResumeCard                 // 自定义卡片组件
│  ├─ResumeCompose              // 自定义组合组件
│  ├─ResumeDivider              // 自定义分割线组件
│  ├─ResumeText                 // 自定义文本（内容）组件
│  ├─ResumeImg                  // 自定义图片组件
│  ├─ResumeProgress             // 自定义进度条组件
│  ├─component-list.tsx         // 自定义组件组配置
│  └─index.tsx                  // 注册自定义组件
│
├─utils                         // 工具
│  ├─color-config.tsx           // 颜色面板（未完成）
│  ├─globalID.tsx               // 整体ID计算
│  ├─icon-config.tsx            // icon图标配置
│  └─index.tsx
│
├─commonContext.tsx             // 顶层Context （组件通信/类redux）
│
└─App.tsx                       // 入口文件
```


## 配置自定义组件（custom-component目录下）   

1. 自定义组件组配置
    * 导入自定义组件
    * 配置组件属性样式
        * component => 获取对应组件
        * 组件id（componentId）
        * 组件名（label）
        * 组件属性（propValue）
        * 组件样式（style）

2. 自定义组件
   * 接收组件属性（propValue）
   * 根据属性来编辑组件

3. 注册到自定义组件栏（AppLayoutLeft）中
    * 配置
        * 组件id（componentId）
        * 组件名（label）
        * icon



