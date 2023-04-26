export type LoginDto = {
  email: string;
  password: string;
};

export type CreateUserDto = {
  fullName: string;
} & LoginDto;

export type ResponseUser = {
  email: string;
  id: number;
  commentsCount?: number;
  accessToken: string;
};

export type PostItem = {
  title: string;
  description: string;
  tags: null | string;
  id: number;
  views: number;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
};

export type CommentItem = {
  id: number;
  text: string;
  post: PostItem;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
};

export interface IProduct {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
}
