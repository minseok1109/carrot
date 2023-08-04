import { ImgInfo } from "./types";
import AWS from "aws-sdk";

const UploadImagesToS3 = async (imgList: ImgInfo[]) => {
  const promises = imgList.map((file: ImgInfo) => {
    return new Promise<string>((resolve, reject) => {
      const { blob } = file;
      const fileName = `${Date.now()}.${file.name}`;

      AWS.config.update({
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY as string,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET as string,
        },
        region: "ap-northeast-2",
        signatureVersion: "v4",
      });

      const s3 = new AWS.S3();
      s3.upload(
        {
          Bucket: "carrot-image",
          Key: fileName,
          Body: blob,
          ContentType: file.type,
        },
        (upLoadError: Error, data: AWS.S3.ManagedUpload.SendData) => {
          if (upLoadError) {
            reject(upLoadError);
          } else if (data && data.Location) {
            resolve(data.Location);
          } else {
            reject(new Error("S3 Upload Error"));
          }
        }
      );
    });
  });
  const uploadedImageUrls = await Promise.all(promises);
  return uploadedImageUrls;
};

export default UploadImagesToS3;
