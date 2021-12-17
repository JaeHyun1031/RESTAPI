# REST API
This is a REST API that ensure if the patient exists and process the request if it is appropriate.

+ Status Code
  + 200
    + REST API worked properly.
  + 404
    + REST API couldn't find the patient with the SSN the user put.
  + 401
    + REST API couldn't find the patient with firstname or lastname the user put.
  + 504
    + REST API failed to complete the request because the request was not appropriate.
    + ex) If the request is deletion of other patients, it would fail.
