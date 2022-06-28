import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Db, MongoClient } from 'mongodb'

import { app } from '../app'
import user from './data/user.json'
import post from './data/post.json'
import invalidTitlePost from './data/invalid_title_post.json'
import invalidContentPost from './data/invalid_content_post.json'
import invalidInvalidUserPost from './data/invalid_user_post.json'
import posts from './data/posts.json'

const should = chai.should()

chai.use(chaiHttp)

const DB_NAME = 'users-management'
const MONGODB_URL = `mongodb://localhost:27017/${DB_NAME}`

describe('Posts integrations tests', () => {
  let connection: MongoClient = null
  let db: Db = null

  before(async () => {
    connection = await MongoClient.connect(MONGODB_URL)
    db = connection.db(DB_NAME)
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
    await db.collection('posts').deleteMany({})
  })

  it('Should save a valid post', (done) => {
    chai
      .request(app)
      .post('/users')
      .send(user)
      .end((err, res) => {
        chai
          .request(app)
          .post('/posts')
          .send(post)
          .end((err, res) => {
            res.should.have.status(201)
            done()
          })
      })
  })

  it('Should not save a post with invalid title', (done) => {
    chai
      .request(app)
      .post('/users')
      .send(user)
      .end((err, res) => {
        chai
          .request(app)
          .post('/posts')
          .send(invalidTitlePost)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
  })

  it('Should not save a post with invalid content', (done) => {
    chai
      .request(app)
      .post('/users')
      .send(user)
      .end((err, res) => {
        chai
          .request(app)
          .post('/posts')
          .send(invalidContentPost)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
  })

  it('Should not save a post with invalid user', (done) => {
    chai
      .request(app)
      .post('/posts')
      .send(invalidInvalidUserPost)
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })

  it('Should not save a post with a nonexistent user', (done) => {
    chai
      .request(app)
      .post('/posts')
      .send(post)
      .end((err, res) => {
        res.should.have.status(403)
        done()
      })
  })

  it('Should return all posts of a given user', (done) => {
    chai
      .request(app)
      .post('/users')
      .send(user)
      .end((err, res) => {
        Object.keys(posts).forEach(async (key) => {
          const post = posts[key]
          await chai.request(app).post('/posts').send(post)
        })

        const testPostsLength = posts.length

        chai
          .request(app)
          .get(`/posts/${user.email}`)
          .end((err, res) => {
            res.should.have.status(200)
            const { posts } = res.body
            expect(posts.length).to.equal(testPostsLength)
            done()
          })
      })
  })

  it('Should not return posts of nonexistent user', (done) => {
    chai
      .request(app)
      .get('/posts/usuario@email.com')
      .end((err, res) => {
        res.should.have.status(404)
        const { errorMessage } = res.body
        expect(errorMessage).to.equal
        done()
      })
  })

  it('Should not return posts when given an invalid user e-mail', (done) => {
    chai
      .request(app)
      .get('/posts/usuario.email.com')
      .end((err, res) => {
        res.should.have.status(400)
        done()
      })
  })
})