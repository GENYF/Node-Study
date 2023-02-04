const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// .env 파일을 읽어서 process.env에 넣어줌
dotenv.config();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

// 포트 전역 설정
app.set('port', process.env.PORT || 3000);

// 요청과 응답을 기록하는 라우터 미들웨어
// 개발: dev, 배포: combined
app.use(morgan('dev'));

// 쿠키를 더욱 편리하게 사용하게 해주는 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 미들웨어
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  },
}));

// static 미들웨어는 정적인 파일을 제공, public 폴더에 있는 파일을 제공
// app.use('/', (req, res, next) => {
//   // 미들웨어 확장으로 세션을 사용하여 로그인 여부를 확인
//   if (req.session.id) {
//     express.static(__dirname, 'public')(req, res, next);
//   } else {
//     next();
//   }
// }); 

// 요청의 본문을 쉽게 가져올 수 있게 해주는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true  })); // true면 qs, false면 querystring

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

app.use('/', indexRouter);
app.use('/user', userRouter);

// 전역 변수 사용 금지
app.use((req, res, next) => {
  req.session.data = 'password';
  req.data = 'password';
  next();
});

// multer 미들웨어를 이용한 파일 업로드
const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

// 이미지 업로드용 객체 생성
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드용 GET 라우터(이미지 업로드 페이지)
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

// 이미지 업로드용 POST 라우터(이미지 업로드 처리)
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

// 한 라우터에서 여러개의 응답을 보낼 수 없음
app.get('/', (req, res, next) => {
  // 쿠키를 더욱 편리하게 사용 가능
  // req.cookies; // 암호화되지 않은 쿠키
  // req.signedCookies; // 서명된 쿠키
  // res.cookie('name', encodeURIComponent(name), {
  //   expires: new Date(),
  //   httpOnly: true,
  //   path: '/',
  // });
  // res.clearCookie('name', encodeURIComponent(name), {
  //   httpOnly: true,
  //   path: '/',
  // });

  // 요청의 본문을 쉽게 가져올 수 있음
  // req.body.name; 

  // 세션 데이터, 다음 요청시에도 남아있음
  // req.session.data; 

  // 데이터, 다음 요청시에 남아있지 않음
  // req.data;

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