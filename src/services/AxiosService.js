import { urlParamToStr } from '../shared/utils/strings'
import axiosInstance from '../services/AxiosInstance'
import Swal from "sweetalert2";

const refreshToken = async () => {
  try {
    const res = await axiosInstance.post(`auth/refresh-token`, {
      refresh_token: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", res.data.access_token);
  } catch (error) {
    forceLogout();
  }
};

function forceLogout() {
  localStorage.clear();
  window.location.href = process.env.REACT_APP_URL + "/login";
}

function Catch(error) {
  Swal.close();
  if (error.response && error.response.data && error.response.data.statusCode === 403) {
    // Swal.fire({
    //   icon: "error",
    //   title: `${error.response.data.message}`,
    //   allowOutsideClick: false
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     window.location.href = (import.meta.env.VITE_URL) + "forbidden";
    //   }
    // });
    window.location.href = (import.meta.env.VITE_URL) + "forbidden";
  } else {
    Swal.fire({
      icon: "error",
      title: `${error.response.data.message}`
    });
  }
}

async function getHeaders(customHeaders = {}) {
  const authorizationToken = localStorage.getItem('accessToken')
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }
  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`
  }
  return headers
}

export async function POST(endpoint, data = {}, callback, headers) {
  try {
    const header = await getHeaders(headers)
    const response = await axiosInstance.post(`${endpoint}`, data, {
      headers: header,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 400 || error.response.status === 403) {
      if (typeof(callback) !== "undefined") {
        callback(error.response);
      } else {
        await refreshToken()
        const header = await getHeaders(headers)
        const response = await axiosInstance.post(`${endpoint}`, data, {
          headers: header,
        })
        return response.data
      }
    } else {
      Catch(error)
    }
  }
}

export async function GET(endpoint, params = {}, configs = {}, headers) {
  try {
    const header = await getHeaders(headers)
    let config = {
      headers: header,
      ...configs,
    }
    const response = await axiosInstance.get(`${endpoint}${urlParamToStr(params)}`, config)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 400) {
      await refreshToken()
      const header = await getHeaders(headers)
      let config = {
        headers: header,
        ...configs,
      }
      const response = await axiosInstance.get(`${endpoint}${urlParamToStr(params)}`, config)
      return response.data
    } else {
      Catch(error)
    }
  }
}

export async function DELETE(endpoint, headers) {
  try {
    const header = await getHeaders(headers)

    const response = await axiosInstance.delete(`${endpoint}`, {
      headers: header,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 400) {
      await refreshToken()
      const header = await getHeaders(headers)

      const response = await axiosInstance.delete(`${endpoint}`, {
        headers: header,
      })
      return response.data
    } else {
      Catch(error)
    }
  }
}

export async function PATCH(endpoint, data = {}, headers) {
  try {
    const header = await getHeaders(headers)
    const response = await axiosInstance.patch(`${endpoint}`, data, {
      headers: header,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 400) {
      await refreshToken()
      const header = await getHeaders(headers)
      const response = await axiosInstance.patch(`${endpoint}`, data, {
        headers: header,
      })
      return response.data
    } else {
      Catch(error)
    }
  }
}