import React from "react";


export default function Welcome(props) {
  const createNewForm = () => {
    props.resetForm(() => {
      props.history.pushState(null, "/builder");
    });
  };

  return (
    <div>
      <div className="jumbotron">
        <div className="container">
        <h1>Create your own forms</h1>
        <p>
            This is the <strong>Kinto formbuilder</strong>, a tool to help
            you create online forms easily.
        </p>
        <p><button type="button" onClick={createNewForm} className="btn btn-primary btn-lg">Start a new form</button></p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p>Original repo: <a href="https://github.com/kinto/formbuilder">kinto/formbuilder</a><br />
            This fork: <a href="https://github.com/nkkollaw/formbuilder/">nkkollaw/formbuilder</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
