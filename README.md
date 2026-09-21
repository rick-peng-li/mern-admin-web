# MERN Admin Web

这是一个已经完成前后端分离重构的现代后台管理项目，前端迁移为 `Vite + React 19`，后端升级为 `Express 5 + Mongoose 9`，目录统一拆分为 `client` 和 `server` 两部分。项目保留并升级了管理员、客户、线索、产品、仪表盘、账户设置等完整业务功能，同时把路由、组件、请求方法、状态管理和服务层全部按新架构重新整理。

## 项目目标

- 完整前后端分离
- 现代化目录结构
- 统一使用新的组件库和最新写法
- 保留原有后台核心功能并保证链路可用
- 让页面、接口、状态流和数据模型之间关系清晰

## 技术栈

### 前端

- React 19
- Vite 8
- React Router 7
- Ant Design 6
- TanStack Query 5
- Zustand 5
- Axios
- Day.js

### 后端

- Node.js
- Express 5
- MongoDB
- Mongoose 9
- Zod 4
- JSON Web Token
- Helmet
- CORS
- Morgan

## 目录结构

```text
mern-admin-web
├── client
│   ├── public
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── lib
│   │   ├── page
│   │   ├── router
│   │   ├── services
│   │   ├── store
│   │   └── utils
│   ├── .env.example
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   └── vite.config.js
├── server
│   ├── scripts
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   ├── tests
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## 前端架构说明

前端已经按新的项目组织方式拆分：

- `router`
  - 单独存放路由定义、登录路由守卫、受保护路由守卫、导航配置
- `page`
  - 所有页面统一放在 `page` 目录
  - 页面按功能模块拆分，例如 `admin`、`customer`、`lead`、`product`
- `components`
  - 公共组件、表单字段组件、布局组件、仪表盘组件、通用 CRUD 组件全部拆开
- `services`
  - 统一放接口请求方法
- `hooks`
  - 抽离页面通用逻辑，例如通用 CRUD 管理逻辑
- `store`
  - 登录态统一使用 Zustand 管理
- `lib`
  - 放统一的请求实例和拦截器
- `@/`
  - 已配置前端路径别名，文件引入统一使用 `@/`

## 后端架构说明

后端已经按现代服务端项目方式拆分：

- `config`
  - 数据库连接、环境变量配置
- `controllers`
  - 接口控制器
- `middleware`
  - 鉴权、中间件校验、统一错误处理
- `models`
  - Mongoose 数据模型
- `routes`
  - 按业务模块拆分路由
- `services`
  - 抽离业务聚合逻辑和通用数据操作
- `validators`
  - 使用 Zod 做请求参数校验
- `tests`
  - 使用 `mongodb-memory-server + supertest` 做接口链路验证

## 功能模块

### 认证

- 管理员登录
- 当前用户信息获取
- 退出登录
- JWT 鉴权
- 前端自动注入 Bearer Token
- 401 自动清理登录态

### Dashboard

- 管理员总数
- 客户总数
- 线索总数
- 产品总数
- 本月新增客户
- 本月新增线索
- 线索预算总额
- 线索转化率
- 产品可用率
- 最近线索列表
- 最近产品列表

### 管理员

- 管理员列表
- 管理员新增
- 管理员编辑
- 管理员删除
- 管理员密码重置

### 客户

- 客户列表
- 客户新增
- 客户编辑
- 客户删除
- 客户搜索
- 客户卡片选择页

### 线索

- 线索列表
- 线索新增
- 线索编辑
- 线索删除
- 线索搜索
- 状态管理

### 产品

- 产品列表
- 产品新增
- 产品编辑
- 产品删除
- 产品搜索

### 账户设置

- 当前登录管理员资料展示

## 页面路由

- `/login`
  - 登录页

- `/`
  - 仪表盘首页

- `/admins`
  - 管理员管理

- `/customers`
  - 客户管理

- `/customer-select`
  - 客户卡片选择页

- `/leads`
  - 线索管理

- `/products`
  - 产品管理

- `/settings`
  - 账户设置

## 接口概览

后端统一前缀：`/api`

### 认证

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### 仪表盘

- `GET /api/dashboard/summary`

### 管理员

- `GET /api/admins`
- `POST /api/admins`
- `GET /api/admins/:id`
- `PATCH /api/admins/:id`
- `PATCH /api/admins/:id/password`
- `DELETE /api/admins/:id`

### 客户

- `GET /api/customers`
- `POST /api/customers`
- `GET /api/customers/:id`
- `PATCH /api/customers/:id`
- `DELETE /api/customers/:id`

### 线索

- `GET /api/leads`
- `POST /api/leads`
- `GET /api/leads/:id`
- `PATCH /api/leads/:id`
- `DELETE /api/leads/:id`

### 产品

- `GET /api/products`
- `POST /api/products`
- `GET /api/products/:id`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`

## 环境变量

### 服务端

复制 `server/.env.example` 为 `server/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern-admin-web
JWT_SECRET=replace-with-a-secure-secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
DEFAULT_ADMIN_EMAIL=admin@demo.com
DEFAULT_ADMIN_PASSWORD=Admin123456!
DEFAULT_ADMIN_FIRST_NAME=System
DEFAULT_ADMIN_LAST_NAME=Admin
```

### 前端

复制 `client/.env.example` 为 `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 安装与启动

### 1. 安装依赖

项目使用 npm workspace，根目录直接安装即可：

```bash
npm install
```

### 2. 初始化示例数据

确保 MongoDB 可用后执行：

```bash
npm run seed
```

会创建默认管理员和一组示例客户、线索、产品数据。

默认管理员账号：

- Email: `admin@demo.com`
- Password: `Admin123456!`

### 3. 启动开发环境

```bash
npm run dev
```

启动后：

- 前端地址：`http://localhost:5173`
- 后端地址：`http://localhost:5000`

### 4. 单独启动

只启动后端：

```bash
npm run dev:server
```

只启动前端：

```bash
npm run dev:client
```

## 验证命令

### 后端接口验证

```bash
npm run test:server
```

如本机没有现成 MongoDB，可直接使用 Docker 验证：

```bash
npm run test:server:docker
```

### 前端构建验证

```bash
npm run build
```

### 整体验证

```bash
npm run verify
```

如果需要带 Docker 一起完成后端验证，可执行：

```bash
npm run verify:docker
```

## 当前项目改造结果

- 前后端已经完全拆分为 `client` 和 `server`
- 前端由老旧 CRA 方案升级到 Vite
- 前端目录已重新按 `router / page / components / services / hooks / store` 拆分
- 后端目录已重新按 `config / controllers / middleware / models / routes / services / validators` 拆分
- 旧版模板目录和无用文件已清理
- 页面 UI 已按新的组件库风格重做
- 通用 CRUD 逻辑已经抽离
- 登录、仪表盘、管理员、客户、线索、产品、设置页已形成完整链路
