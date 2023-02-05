const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');
const Post = require('../models/post');

// 동작 분석 필요
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 세션에 user.id만 저장
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ // req.user에 저장
        where: { id },
        include: [{
            model: Post,
        }, { 
            model: User, 
            attributes: ['id', 'nick'], 
            as: 'Followers' 
        }, {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followings',
        }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};