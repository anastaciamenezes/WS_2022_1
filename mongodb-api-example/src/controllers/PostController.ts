import { Post, PostModel } from './../models/PostModel'

export default class PostController {
  async save(post: Post): Promise<Post> {
    const savedPost = await PostModel.create(post)
    return savedPost
  }

  async findByUserId(userId: number): Promise<Post[]> {
    const posts: Post[] = await PostModel.find({ user: userId })
    return posts
  }
}