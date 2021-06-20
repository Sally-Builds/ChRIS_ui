import React from "react";
import { Grid, GridItem, Button } from "@patternfly/react-core";
import { LocalFile } from "../../feed/CreateFeed/types";
import { LocalFileList } from "../../feed/CreateFeed/helperComponents";

const FileUpload = ({
  localFiles,
  dispatchFn,
  handleDeleteDispatch,
}: {
  localFiles: LocalFile[];
  dispatchFn: (files: LocalFile[]) => void;
  handleDeleteDispatch: (file: string) => void;
}) => {
  const openLocalFilesPicker = (): Promise<LocalFile[]> => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.click();
    return new Promise((res) => {
      input.onchange = async () => {
        if (input.files) {
          const files = Array.from(input.files).map((file) => {
            return {
              name: file.name,
              blob: file,
            };
          });
          res(files);
        }
      };
    });
  };

  const handleChoseFilesClick = () => {
    openLocalFilesPicker().then((files: LocalFile[]) => {
      dispatchFn(files);
    });
  };

  const fileList =
    localFiles.length > 0
      ? localFiles.map((file: LocalFile, index: number) => (
          <React.Fragment key={index}>
            <LocalFileList
              handleDeleteDispatch={handleDeleteDispatch}
              file={file}
              index={index}
              showIcon={true}
            />
          </React.Fragment>
        ))
      : null;
  return (
    <div className="local-file-upload">
      <Grid hasGutter={true}>
        <GridItem span={4} rowSpan={4}>
          <p className="section-header">File Upload</p>
          <Button
            style={{
              width: "100%",
            }}
            onClick={() => handleChoseFilesClick()}
          >
            Choose Files...
          </Button>
        </GridItem>
        <GridItem span={8} rowSpan={12}>
          <p className="section-header">Local files to add to new feed:</p>
          <div className="file-list">{fileList}</div>
        </GridItem>
      </Grid>
    </div>
  );
};

export default FileUpload;
