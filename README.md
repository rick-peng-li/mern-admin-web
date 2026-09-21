# MERN Admin Web

`mern-admin-web` 是一个基于 MERN 技术栈的后台管理系统，包含管理员认证、客户管理、线索管理、产品管理、仪表盘统计和账户设置等完整前后端功能。前端使用 React + Ant Design 构建管理界面，后端使用 Express + MongoDB 提供认证与业务 API。

## 项目定位

- 适合作为中小型后台管理项目的基础工程
- 提供可直接运行的管理员登录与 JWT 鉴权链路
- 提供客户、线索、产品、管理员四类核心业务数据的 CRUD 能力
- 提供基于真实数据库数据的 Dashboard 概览与最近数据展示

## 功能模块

- 认证模块
  - 管理员登录
  - 退出登录
  - JWT 鉴权
  - 受保护路由控制

- 仪表盘模块
  - 线索预算汇总
  - 客户、产品、管理员总量统计
  - 线索转化与产品可用率展示
  - 最近线索、最近产品列表

- 管理员模块
  - 管理员列表
  - 管理员新增、查看、编辑、删除
  - 管理员密码修改
  - 当前登录管理员资料查看

- 客户模块
  - 客户列表
  - 客户新增、查看、编辑、删除
  - 客户搜索
  - 自定义选择客户页面

- 线索模块
  - 线索列表
  - 线索新增、查看、编辑、删除
  - 线索搜索

- 产品模块
  - 产品列表
  - 产品新增、查看、编辑、删除
  - 产品搜索

## 页面说明

- `/login`
  - 管理员登录页
  - 使用后端真实登录接口

- `/`
  - Dashboard 首页
  - 展示总览统计、线索与产品概况、最近数据

- `/customer`
  - 客户管理页
  - 对应客户 CRUD 接口

- `/selectcustomer`
  - 自定义客户选择页
  - 适合做搜索选择、表单联动等场景

- `/lead`
  - 线索管理页
  - 对应线索 CRUD 接口

- `/product`
  - 产品管理页
  - 对应产品 CRUD 接口

- `/admin`
  - 管理员管理页
  - 支持管理员新增、编辑、删除、密码更新

- `/settings`
  - 当前登录管理员资料页
  - 展示账户基础信息并支持退出登录

- `/logout`
  - 退出登录页
  - 会调用后端退出接口并清理本地登录态

## 接口说明

所有接口统一挂载在 `/api` 下。

### 认证接口

- `POST /api/login`
  - 管理员登录

- `POST /api/logout`
  - 退出登录

### Dashboard 接口

- `GET /api/dashboard/summary`
  - 返回首页统计数据、线索概况、产品概况、最近线索、最近产品

### 管理员接口

- `GET /api/admin/profile`
  - 返回当前登录管理员资料

- `POST /api/admin/create`
- `GET /api/admin/read/:id`
- `PATCH /api/admin/update/:id`
- `DELETE /api/admin/delete/:id`
- `PATCH /api/admin/password-update/:id`
- `GET /api/admin/search`
- `GET /api/admin/list`

### 客户接口

- `POST /api/client/create`
- `GET /api/client/read/:id`
- `PATCH /api/client/update/:id`
- `DELETE /api/client/delete/:id`
- `GET /api/client/search`
- `GET /api/client/list`

### 线索接口

- `POST /api/lead/create`
- `GET /api/lead/read/:id`
- `PATCH /api/lead/update/:id`
- `DELETE /api/lead/delete/:id`
- `GET /api/lead/search`
- `GET /api/lead/list`

### 产品接口

- `POST /api/product/create`
- `GET /api/product/read/:id`
- `PATCH /api/product/update/:id`
- `DELETE /api/product/delete/:id`
- `GET /api/product/search`
- `GET /api/product/list`

## 技术栈

- 后端
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - express-session
  - JSON Web Token

- 前端
  - React 17
  - React Router 5
  - Redux
  - Redux Thunk
  - Ant Design 4
  - Axios
  - CRACO
  - Less

## 架构说明

- 后端采用 `routes -> controllers -> models` 分层结构
- 通用 CRUD 逻辑抽离到 `controllers/crudController`
- 认证接口与业务接口分离，业务接口统一经过 JWT 校验
- 前端采用页面、模块、组件、表单拆分结构
- 数据请求统一走 `frontend/src/request`
- 登录态使用 cookie 中的 `x-auth-token` 维护

## 目录结构

```text
mern-admin-web
├── app.js                     # Express 应用配置
├── server.js                  # 后端启动入口
├── controllers/               # 控制器
├── handlers/                  # 错误处理
├── models/                    # Mongoose 模型
├── routes/                    # API 路由
├── setup/                     # 初始化脚本
├── public/                    # 后端静态资源
├── frontend/                  # React 前端
│   ├── public/
│   └── src/
├── .variables.env.example     # 环境变量示例
├── package.json               # 后端依赖
└── README.md
```

## 环境要求

- Node.js 14.x
- MongoDB 4.x 或更高版本
- npm 6.x 或更高版本

## 安装与启动

### 1. 安装后端依赖

```bash
npm install
```

### 2. 配置后端环境变量

复制示例文件并填写实际配置：

```bash
cp .variables.env.example .variables.env
```

`.variables.env` 需要包含以下字段：

```env
PORT=8888
DATABASE=mongodb://127.0.0.1:27017/mern-admin-web
SECRET=mern_admin_web_secret
KEY=mern_admin_web_sid
JWT_SECRET=mern_admin_web_jwt_secret
```

### 3. 初始化默认管理员

```bash
npm run setup
```

初始化完成后会创建默认管理员账号：

- Email: `admin@demo.com`
- Password: `123456`

### 4. 启动后端服务

```bash
npm run dev
```

或

```bash
npm start
```

默认启动地址：

- Backend: `http://localhost:8888`

### 5. 安装前端依赖

```bash
cd frontend
npm install
```

### 6. 启动前端服务

```bash
npm start
```

默认启动地址：

- Frontend: `http://localhost:3000`

## 前后端联调说明

- 前端本地开发默认请求 `http://localhost:8888/api/`
- 生产环境或 `REACT_APP_DEV_REMOTE=remote` 时，请求线上 API
- 后端业务接口需要有效的 `x-auth-token`
- 登录成功后，前端会自动写入 token 并用于后续 CRUD 请求

## 常用脚本

### 后端

```bash
npm start        # 启动后端
npm run dev      # nodemon 开发模式
npm run setup    # 初始化默认管理员
```

### 前端

```bash
npm start        # 启动前端
npm run build    # 打包前端
npm test         # 运行测试
```

## 当前项目特点

- 主导航页面都已对应可用页面或接口
- Dashboard 使用真实接口返回的统计数据
- Settings 页面使用真实管理员资料接口
- 登录、退出登录、CRUD 请求使用统一鉴权链路
- 已清理模板遗留文档、重复静态文件和无引用演示代码
