import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";

import "./CommentTextArea.css";
import { RiMailSendLine } from "react-icons/ri";
import { FaCommentDots } from "react-icons/fa";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

export default function CommentTextArea({ comments, submitComment }) {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [commentScore, setCommentScore] = useState("-1");
  const authContext = useContext(AuthContext);

  const onChangeHandler = (event) => {
    setNewCommentBody(event.target.value);
    console.log(newCommentBody);
  };

  return (
    <div className="comments">
      <div className="container">
        <div className="row">
          <div className="comment-container">
            <div className="comment-header">
              <FaCommentDots className="comment-header-icon" />
              <span className="comment-header-title">نظرات</span>
            </div>
            <div className="comment-content">
              {comments.length === 0 ? (
                <div className="alert alert-warning">
                  هنوز کامنتی برای این دوره ثبت نشده است
                </div>
              ) : (
                <>
                  {comments.map((comment) => (
                    <>
                      <div className="comment-item">
                        <div className="comment-question">
                          <div className="comment-question-header">
                            <div className="comment-question-header-right">
                              <div className="comment-question-header-right-details">
                                <span className="comment-question-name">
                                  {comment.creator.name}
                                </span>
                                <span className="comment-question-status">
                                  {comment.creator.role === "ADMIN"
                                    ? "مدیر"
                                    : " خریدار محصول "}
                                </span>
                                <span className="comment-question-date">
                                  {comment.createdAt.slice(0, 10)}
                                </span>
                              </div>
                              <div className="comment-question-header-right-text">
                                <p className="comment-paragraph">
                                  {comment.body}
                                </p>
                              </div>
                            </div>
                            <div className="comment-question-header-left">
                              <a
                                href="#"
                                className="comment-question-header-link"
                              >
                                پاسخ
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <Pagination />
                </>
              )}
            </div>

            {authContext.isLoggedIn ? (
              <>
                <div className="comments__rules">
                  <span className="comments__rules-title">
                    قوانین ثبت دیدگاه
                  </span>
                  <span className="comments__rules-item">
                    <i className="fas fa-check comments__rules-icon"></i>
                    اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت
                    نمایش انلاین استفاده نمایید و سوالات مربوط به رفع اشکال
                    تایید نخواهند شد
                  </span>
                  <span className="comments__rules-item">
                    <i className="fas fa-check comments__rules-icon"></i>
                    دیدگاه های نامرتبط به دوره تایید نخواهد شد.
                  </span>
                  <span className="comments__rules-item">
                    <i className="fas fa-check comments__rules-icon"></i>
                    سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
                  </span>
                  <span className="comments__rules-item">
                    <i className="fas fa-check comments__rules-icon"></i>
                    از درج دیدگاه های تکراری پرهیز نمایید.
                  </span>
                </div>
                <div className="comment-response-container">
                  <span className="comment-respons-title">
                    دیدگاهتان را بنویسید
                  </span>
                  <span className="comment-text">
                    <p className="comment-response-subtitle">
                      با عنوان {authContext.userInfos.name} وارد شده اید.
                      <Link to="/logout" className="comment-logout-text">
                        خارج میشوید ؟
                      </Link>
                    </p>
                  </span>

                  <div className="comment-content">
                    <div className="comments-score">
                      <p className="comment-score-title">امتیاز شما :</p>
                      <div className="select-score-part">
                        <select
                          className="select-score"
                          onChange={(event) =>
                            setCommentScore(event.target.value)
                          }
                        >
                          <option value="-1" className="select-score-option">
                            امتیاز خود را انتخاب کنید
                          </option>
                          <option value="5" className="select-score-option">
                            عالی
                          </option>
                          <option value="4" className="select-score-option">
                            خیلی خوب
                          </option>
                          <option value="3" className="select-score-option">
                            خوب
                          </option>
                          <option value="2" className="select-score-option">
                            ضعیف
                          </option>
                          <option value="1" className="select-score-option">
                            بد
                          </option>
                        </select>
                      </div>
                    </div>
                    <span className="comment-respond-content-title">
                      دیدگاه شما :
                    </span>
                    <textarea
                      cols="20"
                      rows="5"
                      className="comment-content-textarea"
                      onChange={onChangeHandler}
                    >
                      {newCommentBody}
                    </textarea>
                  </div>
                  <div className="comment-button-section">
                    <button
                      className="comment-button"
                      onClick={() =>
                        submitComment(newCommentBody, commentScore)
                      }
                    >
                      <RiMailSendLine className="comment-button-icon" />
                      فرستادن دیدگاه
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="alert alert-danger">
                برای ثبت نظر ابتدا باید
                <Link to="/login" className="comment-text-login">
                  وارد
                </Link>
                شوید
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
