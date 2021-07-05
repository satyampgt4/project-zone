import React, { useState } from "react";
import ProjectDetailCard from "../ProjectDetailCard/ProjectDetailCard";
import "./ProjectDeatils.css";
import ParticlesBg from "particles-bg";
import userImg from "../../assets/user.png";
import moment from "moment";
import { useDataLayerValues } from "./../../datalayer";
import { AddComment } from "./../../axios/instance";
import { ToastContainer, toast } from "react-toastify";

function ProjectDetails(props) {
  const [{ user, ProjectDetails, dashboard }, dispatch] = useDataLayerValues();
  const [comment, setcomment] = useState("");

  const CommentBtnHandler = async () => {
    const data = {
      project_id: ProjectDetails.id,
      fname: user.fname,
      userimg: dashboard.profile_pic,
      data: comment,
    };
    try {
      const comment_add = await AddComment(data);
      const comments_new = comment_add.data.data;
      const projectdata = {
        ...ProjectDetails,
        comments: comments_new,
      };
      dispatch({
        type: "SET_PROJECT_DETAILS",
        ProjectDetails: projectdata,
      });
      toast.success(`${comment_add.data.msg}`);
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(`${err.response.data.error}`);
      }
    }
  };

  return (
    <div className="project_details_container">
      <ToastContainer position="bottom-left" />
      <ParticlesBg type="coweb" bg={true} />

      <ProjectDetailCard
        title={props.title}
        descr={props.descr}
        skills={props.skills}
        level={props.level}
      />

      <div className="comment_section">
        <div className="comment_user_data">
          <h1> Add Your Suggestion </h1>
          <div className="comment_user">
            <img
              src={dashboard.profile_pic ? dashboard.profile_pic : userImg}
              alt="user_image"
            />

            <h2>{user.fname ? user.fname : "Guest"}</h2>
          </div>

          <div className="comment_inputbox">
            <textarea
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            ></textarea>
          </div>
          <h4 class="comment_btn" onClick={CommentBtnHandler}>
            Comment
          </h4>
        </div>

        <div className="comment_header">
          <p> Comments : {ProjectDetails.comments.length}</p>
        </div>

        <div className="comment_content">
          {ProjectDetails.comments.map((item) => (
            <div className="user_comment">
              <div className="comment_info">
                <div className="comment_user">
                  <img
                    src={
                      dashboard.profile_pic ? dashboard.profile_pic : userImg
                    }
                    alt="user_image"
                  />
                  <h2>{item.fname}</h2>
                </div>
                <p className="comment_timestamp">{item.createdat}</p>
              </div>

              <p className="comment_desc">{item.data}</p>
            </div>
          ))}
          {/* <div className="user_comment">
            <div className="comment_info">
              <div className="comment_user">
                <img src={userImg} alt="user_image" />
                <h2>You</h2>
              </div>
              <p className="comment_timestamp">2days ago</p>
            </div>

            <p className="comment_desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec
              pulvinar molestie urna, mollis mattis nibh cursus vel.
            </p>
          </div>

          <div className="user_comment">
            <div className="comment_info">
              <div className="comment_user">
                <img src={userImg} alt="user_image" />
                <h2>Kanak</h2>
              </div>
              <p className="comment_timestamp">2days ago</p>
            </div>

            <p className="comment_desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec
              pulvinar molestie urna, mollis mattis nibh cursus vel.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
