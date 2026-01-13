import { useState } from "react";
import { commentsData } from "./data";

export const useComment = () => {
  const [comments, setComments] = useState(commentsData);

  const insertNode = (tree, parentId, newComment) => {
    return tree.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          replies: [...node.replies, newComment],
        };
      }

      return {
        ...node,
        replies: insertNode(node.replies, parentId, newComment),
      };
    });
  };

  const editNode = (tree, id, newContent) => {
    return tree.map((node) => {
      if (node.id === id)
        return {
          ...node,
          content: newContent,
        };

      return { ...node, replies: editNode(node.replies, id, newContent) };
    });
  };

  const deleteNode = (tree, id) => {
    return tree
      .filter((node) => node.id != id)
      .map((node) => ({ ...node, replies: deleteNode(node.replies, id) }));
  };

  const addNewComment = (id, content) => {
    const newComment = {
      id: Math.floor(Math.random() * 1000),
      content,
      votes: 0,
      timeStamp: new Date().toISOString(),
      replies: [],
    };
    if (id) {
      setComments((prev) => insertNode(prev, id, newComment));
    } else setComments((prev) => [...prev, newComment]);
  };

  const editComment = (id, content) => {
    console.log(id, content);
    setComments((prev) => editNode(prev, id, content));
    console.log(comments);
  };

  const deleteComment = (id) => {
    setComments((prev) => deleteNode(prev, id));
  };
  return { comments, addNewComment, editComment, deleteComment };
};
