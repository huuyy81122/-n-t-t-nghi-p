import { getAllJSDocTags } from "typescript";

export const authenticationRouter = {
    loginJWT: `/api/user/login`,
    getAccessToken: `/auth/v1/oidc/access-token?_allow_anonymous=true`,
    refreshToken: `/auth/v1/oidc/refresh-token`,
    revokeToken: `/auth/v1/oidc/revoke-token`,
    getUserInfo: `/auth/v1/oidc/user-info`,
    introspectToken: `/auth/v1/oidc/introspect-token`
  };
  export const applicationRouter = {
    create: `/api/v1/system-application`,
    createMany: `/api/v1/system-application/create-many`,
    update: `/api/v1/system-application`,
    delete: `/api/v1/system-application`,
    getById: `/api/v1/system-application/`,
    getFilter: `/api/v1/system-application/filter`,
    getAll: `/api/v1/system-application/all`,
    getCombobox: `/api/v1/system-application/for-combobox`
  };
  export const dotTuyenSinhRouter = {
    getFilter: `/api/dot-tuyen-sinh/filter`,
    getUrl: `/api/dot-tuyen-sinh/get-url`,
    getDetail: `/api/dot-tuyen-sinh/get-detail?dotDangKy=`
  };
  export const forgotPasswordRouter = {
    forgotPassword: `/admission-portal/v1/account/forgot-password`
  };
  export const registerRouter = {
    create: `/admission-portal/v1/account/register`
  };
  export const uploadRouter = {
    downloadBase64: `/system/v1/file/download-base64/`
  };
  export const minioRouter = {
    uploadObject: `/system/v1/file/upload-object`
  };
  export const giayToRouter = {
    getGiayToYeuCau: `/api/giay-to/yeu-cau`
  };
  export const thiSinhDangKyTuyenSinhRouter = {
    createThiSinhDangKyXetTuyen: `/api/tuyen-sinh-dang-ky-xet-tuyen/create`,
    getThiSinh: `/api/tuyen-sinh-dang-ky-xet-tuyen/get-thong-tin-ho-so`,
    getDanhSachHoSo: `/api/tuyen-sinh-dang-ky-xet-tuyen/danh-sach-ho-so?idHoSo=`,
    updateThiSinh: `/api/tuyen-sinh-dang-ky-xet-tuyen/update`,
    capNhatTrangThai: `/api/tuyen-sinh-dang-ky-xet-tuyen/cap-nhat-trang-thai`,
    capNhatHoaDon: `/api/tuyen-sinh-dang-ky-xet-tuyen/cap-nhat-hoa-don`,
    traCuu: `/api/tuyen-sinh-dang-ky-xet-tuyen/tra-cuu`,
  };
  export const userRoutes = {
    create: `/api/user/create`,
    getShipper: `/api/user/get-all-user?idRole=4`,
    updateStatus: `/api/user/update-status`,
    getById: `/api/user/get-user-by-id?id=`,
  };
  export const monXetTuyenRoutes = {
    getFilter: `/api/mon-xet-tuyen/filter`
  };
  export const nganhRoutes = {
    getFilter: `/api/nganh/combobox`
  };
  export const uploadFiledRoutes = {
    upload: `/api/images`
  };
  export const payRouter = {
    pay: `/api/vnpay/pay`,
    payInfo: `/api/vnpay/pay-info?idHoSo=`
  };
  export const toHopNganhRoutes = {
    getFilter: `/api/to-hop-nganh/combobox`,
    create: `/api/to-hop-nganh/create`,
    update: `/api/to-hop-nganh`,
    delete: `/api/to-hop-nganh/delete`,
    getbyid: `/api/to-hop-nganh/get-by-id`,
    getdetail: `/api/to-hop-nganh/get-detail`
  };
  export const donHangRoutes = {
    getServicesTypeById: `/api/ServiceType`,
    getTransportById: `/api/TransportType`,
    getWeightTypeById: `/api/WeightType`,
    getPrice: `/api/Price/get-detail`,
    create: `/api/Order`,
    update: `/api/Order`,
    delete: `/api/Order`,
    getAll: `/api/Order`,
    getdetail: `/api/Order`,
    getTinh: `/api/Province`,
    getHuyen: `/api/District`,
    getXa: `/api/Commune`,
    updateStatus: `/api/Order/update-status`,
    getByMaDonHang: `/api/Order/ma-don-hang`,
    ganShipper: `/api/Order/gan-shipper`,
    deXuatShipper: `/api/Recommendation/recommend-shipper`,
    thongKe: `/api/Order/thong-ke`
  };

  export const lichSuDonHangRoutes = {
    getAll: `/api/Order`,
    getForShipper:  `/api/Order/for-shipper`
  };

  export const bangGiaRoutes = {
    getAll : '/api/Price'
  }

  export const voteRoutes = {
    getVoteForShipper: `/api/Vote/for-shipper`,
    createVote: `/api/Vote`
  };