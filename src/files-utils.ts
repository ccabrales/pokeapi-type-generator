import * as fs from "fs";
import * as path from "path";

const FILE_EXT = ".json";

/**
 * Iterate over a directory and delete any files that do not
 * share the desired extension, or .json by default.
 * @param src
 * @param ext
 */
export function removeFilesWithoutExt(src: string, ext: string = FILE_EXT) {
  fs.readdirSync(src).forEach(file => {
    const fileExt = path.extname(file);
    if (fileExt !== FILE_EXT) {
      fs.unlinkSync(path.join(src, file));
      console.log("Deleted file: ", file);
    }
  });
}
