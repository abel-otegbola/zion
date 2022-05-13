export const AUTH_DOMAIN = process.env.AUTH_DOMAIN || "";

const nonceStr = (nonce) => `|| id=${nonce}`;

export const signInMessage = (nonce, domain) => {
  "Sign this message to sign into " + domain + nonceStr(nonce);
};
