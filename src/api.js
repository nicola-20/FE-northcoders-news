import axios from "axios";

const BASE_URL = "https://stormy-river-98715.herokuapp.com/api";

export const getArticles = async sort => {
  const sortString =
    sort.length > 1
      ? `&sort=${sort.split(" ")[0]}&by=${sort.split(" ")[1]}`
      : "";
  const { data } = await axios.get(
    `${BASE_URL}/articles?limit=1000${sortString}`
  );
  return data.articles;
};

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const getArticlesByTopic = async (sort, topic_slug) => {
  const sortString =
    sort.length > 1
      ? `&sort=${sort.split(" ")[0]}&by=${sort.split(" ")[1]}`
      : "";
  const { data } = await axios.get(
    `${BASE_URL}/topics/${topic_slug}/articles?limit=1000${sortString}`
  );
  return data.articles;
};

export const addArticleToTopic = async (topic_slug, newArticle) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topic_slug}/articles`,
    newArticle
  );
  return data.article;
};

export const getArticleByID = async article_id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return data.article;
};

export const updateArticleVotes = async (article_id, change) => {
  const { data } = await axios.patch(
    `${BASE_URL}/articles/${article_id}?vote=${change}`
  );
  return data;
};

export const getComments = async sort => {
  const sortString =
    sort.length > 1
      ? `&sort=${sort.split(" ")[0]}&by=${sort.split(" ")[1]}`
      : "";
  const { data } = await axios.get(
    `${BASE_URL}/comments?limit=1000${sortString}`
  );
  return data.articles;
};

export const getCommentsByArticleID = async (article_id, sort) => {
  const sortString =
    sort.length > 1
      ? `&sort=${sort.split(" ")[0]}&by=${sort.split(" ")[1]}`
      : "";
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments?limit=1000${sortString}`
  );
  return data.comments;
};

export const addCommentToArticle = async (article_id, newComment) => {
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
  return data;
};

export const deleteComment = async comment_id => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${comment_id}`);
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
