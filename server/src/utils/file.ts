import fs from "fs";

export const deleteFile = (filePath: fs.PathLike) => {
  fs.stat(filePath, (err, stats) => {
    if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log(stats);
    }

    if (
      err &&
      process?.env?.NODE_ENV &&
      process.env.NODE_ENV === "development"
    ) {
      console.log("fail to find file path", err);
    } else {
      fs.unlink(filePath, (err) => {
        if (
          err &&
          process?.env?.NODE_ENV &&
          process.env.NODE_ENV === "development"
        ) {
          console.log("fail to delete file", err);
        }

        if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
          console.log("successfully deleted the file");
        }
      });
    }
  });
};

export default deleteFile;
