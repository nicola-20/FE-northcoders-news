import axios from "axios";

const BASE_URL = "https://stormy-river-98715.herokuapp.com/api";

export const getArticles = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/articles`
  );
  return data.articles;
};

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const getArticlesByTopic = async topic_slug => {
  const { data } = await axios.get(
    `${BASE_URL}/topics/${topic_slug}/articles`
  );
  return data.articles;
};

export const addArticleToTopic = async (topic_slug, newArticle) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topic_slug}/articles`,
    newArticle
  );
  // newArticle must have title and body
  return data.article;
};

export const getArticleByID = async article_id => {
  console.log(article_id, "api articleid");
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  console.log(data.article, "data.article");
  return data.article;
};

export const updateArticleVotes = async (article_id, change) => {
  const { data } = await axios.patch(
    `${BASE_URL}/articles/${article_id}?vote=${change}`
  );
  // change = up or down
  return data;
};

export const getComments = async () => {
  const { data } = await axios.get(`${BASE_URL}/comments`);
  return data.articles;
};

export const getCommentsByArticleID = async article_id => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments`
  );
  return data.comments;
};

export const addCommentToArticle = async (article_id, newComment) => {
  // const {title, body} = newComment
  // const body = { title, body }
  const { data } = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    newComment
  );
  return data.comment;
};

export const getCommentByCommentID = async comment_id => {
  const { data } = await axios.get(`${BASE_URL}/comments/${comment_id}`);
  return data.comment;
};

export const updateCommentVotes = async (comment_id, change) => {
  const { data } = await axios.patch(
    `${BASE_URL}/comments/${comment_id}?vote=${change}`
  );
  // change = up or down
  return data;
};

export const deleteComment = async id => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${id}`);
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data.users;
};

export const getUserByUsername = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
};

export const login = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`)
  return data.user
}