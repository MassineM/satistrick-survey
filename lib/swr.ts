import store from "@/store";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const PREFIX = "api/v1";
export const API = `${API_URL}/${PREFIX}`;

export const fetcher = (
  url: string,
  token?: string,
  args?: Record<string, string>
) => {
  const params = new URLSearchParams(args);

  let keysForDel: string[] = [];
  params.forEach((value, key) => {
    if (value == "" || value == "undefined" || value == null) {
      keysForDel.push(key);
    }
  });

  keysForDel.forEach((key) => {
    params.delete(key);
  });

  return fetch(
    `${API_URL}/${PREFIX}${url.startsWith("/") ? url : "/" + url}?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        token: token ? `Bearer ${token}` : "",
      },
    }
  ).then((res) => handler(res, token));
};

export const handler = async (res: Response, token?: string) => {
  const data = await res.json();

  if (data.code === 600001) {
    await refreshToken(token);
  }

  if (!res.ok) {
    throw data;
  }

  return data;
};

export async function refreshToken(token?: string) {
  try {
    const response = await fetch(`${API_URL}/${PREFIX}/refreshToken`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        token: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();
    if (response.ok) {
      if (store.session) {
        const newSession = { ...store.session, token: data.token };
        localStorage.setItem("session", JSON.stringify(newSession));
        store.session.token = data.token;
      }
    } else {
      throw data;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
