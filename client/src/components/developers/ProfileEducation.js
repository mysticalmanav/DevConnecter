import React, { Fragment } from "react";
import Moment from "react-moment";
export const ProfileEducation = ({ education }) => {
  const educations = education.map((edu) => (
    <div>
      <h3>{edu.school}</h3>
      <p>
        {" "}
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {edu.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>{" "}
        {edu.description !== undefined && edu.description.length > 0
          ? edu.description
          : "There is no description availaible"}
      </p>
    </div>
  ));
  return (
    <Fragment>
      <div class="profile-edu bg-white p-2">
        <h2 class="text-primary">Education</h2>
        {educations}
      </div>
    </Fragment>
  );
};
