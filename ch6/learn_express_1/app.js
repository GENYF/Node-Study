const express = require('express');
const path = require('path');

const app = express();

// 포트 전역 설정
app.set('port', process.env.PORT || 3000);

// 미들웨어 설정, 미들웨어는 여러개 사용 가능
app.use((req, res, next) => {
  console.log('Always run 1');
  next();
}, (req, res, next) => {
  console.log('Always run 2');
  next();
}, (req, res, next) => {
  console.log('Always run 3');
  next();
}, (req, res, next) => {
  try {
    // 에러 핸들링 미들웨어, 보안 취약점이 있음
    // throw new Error('error');
    next();
  } catch (err) {
    next(err);
  }
});

// 한 라우터에서 여러개의 응답을 보낼 수 없음
app.get('/', (req, res, next) => {
  // HTML 파일 로드하여 사용
  res.sendFile(path.join(__dirname, 'index.html'));
  // 하단 미들웨어가 실행되지 않고 다음 라우터가 실행, 분기 처리와 함께 사용하면 유용
  next('route');
}, (req, res) => {
  res.send('Is runable?');
});

app.get('/', (req, res) => {
  console.log('Runable!');
});

app.post('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// 카테고리 페이지, 그러나 모든 카테고리를 만드는 것은 비효율적
// app.get('/category/node', (req, res) => {
//   res.send('/category/node page');
// });
// app.get('/category/react', (req, res) => {
//   res.send('/category/react page');
// });
// app.get('/category/vue', (req, res) => {
//   res.send('/category/vuepage');
// });

// 카테고리 페이지를 와일드 카드를 사용하여 구현
app.get('/category/:name', (req, res) => {
  res.send(`/category/${req.params.name} wildcard page`);
});

// 노드는 위에서 아래로 실행되므로 위의 와일드카드에 걸려 실행되지 않음
app.get('/category/js', (req, res) => {
  res.send('/category/js page');
});

app.get('/about', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.send('/about page');
});

// app.get('*', (req, res) => {
//   res.send('Hello Everybody');
// });

// 404 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

// 에러 핸들링 미들웨어, 모든 파라미터를 사용해야 함
app.use((err, req, res, next) => {
  console.error(err);
  res.send('Something broke!');
});

app.listen(app.get('port'), () => {
  console.log('App started on port 3000');
});