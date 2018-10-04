import btoa from "btoa";
import uuid from "uuid";

import {addNotification} from "./notifications";
import {getFormID} from "../utils";
import config from "../config";


export const FORM_PUBLISH = "FORM_PUBLISH";

export const FORM_PUBLICATION_PENDING = "FORM_PUBLICATION_PENDING";
export const FORM_PUBLICATION_DONE = "FORM_PUBLICATION_DONE";
export const FORM_PUBLICATION_FAILED = "FORM_PUBLICATION_FAILED";

export const FORM_RECORD_CREATION_PENDING = "FORM_RECORD_CREATION_PENDING";
export const FORM_RECORD_CREATION_DONE = "FORM_RECORD_CREATION_DONE";

export const SCHEMA_RETRIEVAL_PENDING = "SCHEMA_RETRIEVAL_PENDING";
export const SCHEMA_RETRIEVAL_DONE = "SCHEMA_RETRIEVAL_DONE";

export const RECORDS_RETRIEVAL_PENDING = "RECORDS_RETRIEVAL_PENDING";
export const RECORDS_RETRIEVAL_DONE = "RECORDS_RETRIEVAL_DONE";

/**
 * Publishes a new form and give the credentials to the callback function
 * when it's done.
 *
 * In case a 403 is retrieved, initialisation of the bucket is triggered.
 **/
export function publishForm(callback) {
  const thunk =  (dispatch, getState, retry = true) => {

    const form = getState().form;
    const schema = form.schema;
    const uiSchema = form.uiSchema;

    // Remove the "required" property if it's empty.
    if (schema.required && schema.required.length === 0) {
      delete schema.required;
    }

    const adminToken = uuid.v4().replace(/-/g, "");
    const formID = getFormID(adminToken);

    callback({form});
  };

  return thunk;
}

/**
 * Submit a new form answer.
 * New credentials are created for each answer.
 **/
export function submitRecord(record, collection, callback) {
  // return (dispatch, getState) => {
  //   dispatch({type: FORM_RECORD_CREATION_PENDING});

  //   // Submit all form answers under a different users.
  //   // Later-on, we could persist these userid to let users change their
  //   // answers (but we're not quite there yet).
  //   new KintoClient(config.server.remote, {
  //     headers: getAuthenticationHeaders(uuid.v4())
  //   })
  //   .bucket(config.server.bucket)
  //   .collection(collection)
  //   .createRecord(record).then(({data}) => {
  //     dispatch({type: FORM_RECORD_CREATION_DONE});
  //     if (callback) {
  //       callback();
  //     }
  //   })
  //   .catch((error) => {
  //     connectivityIssues(dispatch, "We were unable to publish your answers");
  //   });
  // };
}

export function loadSchema(formID, callback) {
  // return (dispatch, getState) => {
  //   dispatch({type: SCHEMA_RETRIEVAL_PENDING});
  //   new KintoClient(config.server.remote, {
  //     headers: getAuthenticationHeaders("EVERYONE")
  //   })
  //   .bucket(config.server.bucket)
  //   .collection(formID)
  //   .getData().then((data) => {
  //     dispatch({
  //       type: SCHEMA_RETRIEVAL_DONE,
  //       data,
  //     });
  //     if (callback) {
  //       callback(data);
  //     }
  //   })
  //   .catch((error) => {
  //     connectivityIssues(dispatch, "We were unable to load your form");
  //   });
  // };
}

/**
 * Retrieve all the answers to a specific form.
 *
 * The formID is derived from the the adminToken.
 **/
export function getRecords(adminToken, callback) {
  // return (dispatch, getState) => {
  //   const formID = getFormID(adminToken);
  //   dispatch({type: RECORDS_RETRIEVAL_PENDING});
  //   new KintoClient(config.server.remote, {
  //     headers: getAuthenticationHeaders(adminToken)
  //   })
  //   .bucket(config.server.bucket)
  //   .collection(formID)
  //   .listRecords().then(({data}) => {
  //     dispatch({
  //       type: RECORDS_RETRIEVAL_DONE,
  //       records: data
  //     });
  //     if (callback) {
  //       callback(data);
  //     }
  //   })
  //   .catch((error) => {
  //     connectivityIssues(
  //       dispatch,
  //       "We were unable to retrieve the list of records for your form."
  //     );
  //   });
  // };
}
