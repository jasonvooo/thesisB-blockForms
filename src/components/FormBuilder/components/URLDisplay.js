import React from "react";

export default function URLDisplay(props) {
  const onClick = (e) => {
    e.target.select();
  };

  const icon = props.type === "admin" ? "fa fa-eye-slash" : "fa fabullhorn";
  const label = props.type == "admin" ? "Admin link" : "Form link";

  return (
    <div>
      <div className="input-group input-group-lg">
        <span className="input-group-addon">{label} <i className={icon} /></span>
        <input onClick={onClick} type="text" className="form-control" defaultValue={props.url} />
      </div>
    </div>
  );
}
