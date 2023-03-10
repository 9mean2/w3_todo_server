const jsonServer = require("json-server");
const path = require("path");

const fs = require("fs"); //서버 배포 단계에서 /tmp 에러 발생하기 때문에 추가
const os = require("os"); //서버 배포 단계에서 /tmp 에러 발생하기 때문에 추가

//배포 deploy 과정에서 tmp경로안에 db.json을 찾을수 없는 에러 발생하여 로직 추가
fs.copyFile("db.json", os.tmpdir() + "/db.json", function (err) {
  if (err) console.log(err);
  else console.log("copy file succeed to" + os.tmpdir());
});

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(os.tmpdir() + "/db.json"));
const middlewares = jsonServer.defaults({
  static: path.resolve(__dirname + "/../build/"),
});

const port = process.env.PORT || 3001;

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running");
});
