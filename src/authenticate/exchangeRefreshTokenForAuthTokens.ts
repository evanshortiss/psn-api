import fetch from "isomorphic-unfetch";

import type { AuthTokensResponse } from "@/models";

import { AUTH_BASE_URL } from "./AUTH_BASE_URL";

export const exchangeRefreshTokenForAuthTokens = async (
  refreshToken: string
): Promise<AuthTokensResponse> => {
  const requestUrl = `${AUTH_BASE_URL}/token`;

  const res = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic YWM4ZDE2MWEtZDk2Ni00NzI4LWIwZWEtZmZlYzIyZjY5ZWRjOkRFaXhFcVhYQ2RYZHdqMHY="
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      token_format: "jwt",
      scope: "psn:mobile.v1 psn:clientapp"
    }).toString()
  });

  const raw = await res.json();

  return {
    accessToken: raw.access_token,
    expiresIn: raw.expires_in,
    idToken: raw.id_token,
    refreshToken: raw.refresh_token,
    refreshTokenExpiresIn: raw.refresh_token_expires_in,
    scope: raw.scope,
    tokenType: raw.token_type
  };
};
