export const authenticationRouter = {
    loginJWT: `/api/user/login`,
    getAccessToken: `/auth/v1/oidc/access-token?_allow_anonymous=true`,
    refreshToken: `/auth/v1/oidc/refresh-token`,
    revokeToken: `/auth/v1/oidc/revoke-token`,
    getUserInfo: `/auth/v1/oidc/user-info`,
    introspectToken: `/auth/v1/oidc/introspect-token`
  };
  export const payRouter = {
    pay: `/api/vnpay/pay`,
    payInfo: `/api/vnpay/pay-info?idHoSo=`
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
    updateStatus: `/api/Order/update-status`
  };
  export const userRoutes = {
    create: `/api/user/create`,
    getAll: `/api/user/get-all-user?idRole=`,
    getUserById: `/api/user/get-user-by-id?id=`,
    update: `/api/user`,
    delete: `/api/user?id=`
  };
  export const hinhThucRoutes = {
    create: `/api/TransportType`,
    getAll: `/api/TransportType`,
    getById: `/api/TransportType`,
    update: `/api/TransportType`,
    delete: `/api/TransportType`
  };
  export const dichVuRoutes = {
    create: `/api/ServiceType`,
    getAll: `/api/ServiceType`,
    getById: `/api/ServiceType`,
    update: `/api/ServiceType`,
    delete: `/api/ServiceType`
  };
  export const khoiLuongRoutes = {
    create: `/api/WeightType`,
    getAll: `/api/WeightType`,
    getById: `/api/WeightType`,
    update: `/api/WeightType`,
    delete: `/api/WeightType`
  };
  export const giaVanChuyenRoutes = {
    create: `/api/Price`,
    getAll: `/api/Price`,
    getById: `/api/Price`,
    update: `/api/Price`,
    delete: `/api/Price`
  };