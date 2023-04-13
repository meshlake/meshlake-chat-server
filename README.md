### 项目启动-开发

```
npm install
npm run start
```

### 项目 pm2 部署

```
npm run build
npm run pro
```

### 项目结构

```
.
├── src
│   ├── controller        //controller层
│   ├── entity            //实体类
│   ├── redis             //redis相关配置及工具类
│   ├── router            //路由配置
│   ├── service           //service层
│   ├── config.ts         //配置文件
│   ├── constants.ts      //项目常量
│   └── index.ts          //项目入口index.js
├── .env                  //配置文件
├── ecosystem.config.js   //pm2配置
├── ormconfig.json        //数据库 ORM 配置文件
├── nodemon.json          //nodemon配置
├── package.json          //npm 安装包
└── tsconfig.json         //ts配置文件
```

## 运行前准备

- `MySQL`

## 启动前配置项

### MySQL 数据库配置

`ormconfig.ts`中进行配置：

- `type` 数据库类型
- `host`主机名

具体参考 https://github.com/typeorm/typeorm

### 数据库文件位置

```
./public/mysql.sql
```
