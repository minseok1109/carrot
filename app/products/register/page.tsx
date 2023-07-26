export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg form-control">
        <label className="label">
          <span className="label-text">사진</span>
        </label>
        <input
          type="file"
          className="w-full max-w-lg mb-3 file-input file-input-bordered"
        />
        <label className="label">
          <span className="label-text">제목</span>
        </label>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full max-w-lg mb-3 input input-bordered"
        />
        <label className="label">
          <span className="label-text">가격</span>
        </label>
        <input
          type="text"
          placeholder="가격을 입력하세요"
          className="w-full max-w-lg mb-3 input input-bordered"
        />
        <label className="label">
          <span className="label-text">자세한 설명</span>
        </label>
        <input
          type="text"
          placeholder="자세한 설명을 입력하세요"
          className="w-full max-w-lg mb-3 input input-bordered"
        />
        <label className="label">
          <span className="label-text">거래 희망장소</span>
        </label>
        <input
          type="text"
          placeholder="거래 희망장소를 입력하세요"
          className="w-full max-w-lg mb-3 input input-bordered"
        />
        <button className="w-full mt-6 btn btn-primary" type="button">
          등록하기
        </button>
      </div>
    </div>
  );
}
