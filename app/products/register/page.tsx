"use client";

import { ImgInfo } from "@/utils/type";
import { useState } from "react";
import UploadImagesToS3 from "@/utils/uploadImageToS3";
import axios from "axios";
import { ONLY_INPUT_NUMBER } from "@/app/constant";

interface FormData {
  title: string;
  min_price: string;
  content: string;
  dueToDate: string;
  photo_ip: ImgInfo[];
}

export default function Page() {
  const initialState: FormData = {
    title: "",
    min_price: "",
    content: "",
    dueToDate: "",
    photo_ip: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [priceError, setPriceError] = useState(false);

  const handlePostProductImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedImages = e.target.files;
    if (!selectedImages) {
      e.preventDefault();
      return;
    }
    const images = Array.from(selectedImages).map((image) => {
      const blob = new Blob([image], { type: image.type });
      return { name: image.name, type: image.type, size: image.size, blob };
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      photo_ip: images,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    console.log(formData);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { min_price } = formData;
      const res = await UploadImagesToS3(formData.photo_ip);
      if (isNaN(Number(min_price))) {
        setPriceError(true);
      }

      const result = { ...formData, photo_ip: res };
      //TODO: s3에 이미지 업로드 후, 이미지 url을  백엔드로 전송
      await axios.post("...", { result });
      setFormData(initialState);
      setPriceError(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg form-control">
        <form onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text">사진</span>
          </label>
          <input
            type="file"
            multiple={true}
            name="images"
            className="w-full max-w-lg mb-3 file-input file-input-bordered"
            accept="image/jpeg, image/png, image/gif, image/jpg"
            onChange={handlePostProductImage}
          />
          <label className="label">
            <span className="label-text">제목</span>
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            name="title"
            className="w-full max-w-lg mb-3 input input-bordered"
            onChange={handleChange}
            value={formData.title}
          />
          <label className="label">
            <span className="label-text">가격</span>
          </label>
          <input
            type="text"
            placeholder="가격을 입력하세요"
            name="min_price"
            className="w-full max-w-lg mb-3 input input-bordered"
            onChange={handleChange}
            value={formData.min_price}
          />
          {priceError && <p className="text-red-500">{ONLY_INPUT_NUMBER}</p>}
          <label className="label">
            <span className="label-text">마감기한</span>
          </label>
          <input
            type="datetime-local"
            name="dueToDate"
            className="w-full max-w-lg mb-3 input input-bordered"
            onChange={handleChange}
            value={formData.dueToDate}
          />
          <label className="label">
            <span className="label-text">자세한 설명</span>
          </label>
          <input
            type="text"
            placeholder="자세한 설명을 입력하세요"
            name="content"
            className="w-full max-w-lg mb-3 input input-bordered"
            onChange={handleChange}
            value={formData.content}
          />
          <button className="w-full mt-6 btn btn-primary" type="submit">
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
