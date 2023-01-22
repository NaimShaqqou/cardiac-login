import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const MySQL = require("promise-mysql");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("addUserToDatabase function executed");

  var { user, access_token, refresh_token } = req.body;

  console.log(user);

  const connection = await MySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  const students: [] = await new Promise((resolve, reject) =>
    connection.query(
      "SELECT * FROM `students` WHERE `SID` = ?",
      [user.id],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          return reject(error);
        }
        resolve(results);
      }
    )
  );

  console.log(students);

  var rowsAffected;
  if (students.length == 0) {
    // insert
    rowsAffected = await new Promise((resolve, reject) =>
      connection.query(
        "INSERT INTO `students` (SID, StudentName, access_token, refresh_token) VALUES (?, ?, ?, ?)",
        [user.id, user.name, access_token, refresh_token],
        function (error, result) {
          if (error) {
            console.log(error);
            context.res = {
                body: {error: error}
            }
          }

          resolve(result.affectedRows);
        }
      )
    );

    if (rowsAffected == 0) console.log("insert failed");
    else console.log("insert succeeded");
  } else {
    // update
    rowsAffected = await new Promise((resolve, reject) =>
      connection.query(
        "UPDATE `students` SET `StudentName` = ?, `access_token` = ?, `refresh_token` = ? WHERE `SID` = ?",
        [user.name, access_token, refresh_token, user.id],
        function (error, result) {
          if (error) {
            console.log(error);
            context.res = {
                body: {error: error}
            }
          }

          resolve(result.affectedRows);
        }
      )
    );

    if (rowsAffected == 0) console.log("update failed");
    else console.log("update succeeded");
  }

  context.res = {
    body: { error: "" },
  };
};

export default httpTrigger;
