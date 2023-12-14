import { AppContext } from "$store/apps/site.ts";
import { fetchSafe } from "apps/utils/fetch.ts";

export interface Props {
  email: string;
  name: string;
}

const VTEX_ACCOUNT_NAME = "atacadaosexyshop";

const action = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
) => {
  const { platform } = ctx;

  if (platform !== "vtex") {
    return;
  }

  // const account = commerce.account;
  const account = VTEX_ACCOUNT_NAME; // TODO: account should be coming from context
  const entity = "NR";

  if (!account) {
    throw new Error("account not found!");
  }

  const { email, name } = props;
  const base = `https://${account}.vtexcommercestable.com.br`;
  const URL = `${base}/api/dataentities/${entity}/documents`;

  const response = await fetchSafe(URL, {
    method: "POST",
    body: JSON.stringify({ email, name }),
    headers: {
      "content-type": "application/json",
    },
    signal: AbortSignal.timeout(5000),
  });

  if (response.ok) {
    return response.statusText;
  }
};

export default action;
