import base64url from "base64url";
import { hmac } from "fast-sha256";
import { TextEncoder } from "util";
import { toConsole } from "../log";

type Header = {
  typ: "JWT";
  alg: "HS256" | "RS256";
};

type Payload = {
  user_id: string;
  role: string;
  exp: number;
};

type JWType = {
  header: Header;
  payload: Payload;
  signature: Signature;
};

type Signature = string;

export class JWT {
  private static SECRET_KEY = process.env.JWT_SECRET;

  constructor() {}

  private static createSignature(jwt: JWType): string {
    const uint8array = new TextEncoder();
    const bufferedHeader = Buffer.from(JSON.stringify(jwt.header)).toString(
      "base64url"
    );
    const bufferedPayload = Buffer.from(JSON.stringify(jwt.payload)).toString(
      "base64url"
    );
    const unsignedToken = bufferedHeader + "." + bufferedPayload;
    const signature = hmac(
      uint8array.encode(JWT.SECRET_KEY),
      uint8array.encode(unsignedToken)
    );
    return unsignedToken + "." + Buffer.from(signature).toString("base64url");
  }

  public createRefreshJWT() {
    //TODO if needed
  }

  public createJWT(exp: number, user_id: string, role: string): string {
    const jwt_header: Header = {
      typ: "JWT",
      alg: "HS256",
    };
    const jwt_payload: Payload = {
      user_id: user_id,
      role: role,
      exp: Date.now() + exp,
    };
    const jwt: JWType = {
      header: jwt_header,
      payload: jwt_payload,
      signature: "",
    };
    return JWT.createSignature(jwt);
  }

  public verifyJWT(jwt_token: string, role: string): boolean {
    const uint8array = new TextEncoder();
    let [header, payload, signature] = jwt_token.split(".");
    header = header.split(" ")[1];

    try {
      const payloadDec: Payload = JSON.parse(base64url.decode(payload, "utf-8")); // Error when JWT in illegal

      if (payloadDec.exp < Date.now()) return false
      if (payloadDec.role != role) return false

      const signatureEnc = hmac(
        uint8array.encode(JWT.SECRET_KEY),
        uint8array.encode(header + "." + payload)
      );

      if (Buffer.from(signatureEnc).toString("base64url") === signature) {
        return true
      }
    } catch (err: unknown) {
      toConsole('Unauthorized jwt spotted!', 'error')
    }
    return false
  }
}
