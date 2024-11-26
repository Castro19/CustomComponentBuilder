import { Auth, Update } from "@calpoly/mustang";
import { ButtonConfig } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "button/index":
      indexButtons(user).then((buttonIndex: ButtonConfig[] | undefined) =>
        apply((model) => ({ ...model, buttonIndex }))
      );
      break;
    case "button/select":
      selectButton(message[1], user).then((button: ButtonConfig | undefined) =>
        apply((model) => ({ ...model, button }))
      );
      break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
}

async function indexButtons(user: Auth.User) {
  const userid = user.username;

  return fetch(`/api/buttons?userid=${userid}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status !== 200) throw `Failed to load index of buttons`;
      return response.json();
    })
    .then((json: unknown) => {
      if (json) {
        const { data } = json as {
          data: ButtonConfig[];
        };
        return data;
      }
    });
}

async function selectButton(msg: { buttonid: string }, user: Auth.User) {
  return fetch(`/api/buttons/${msg.buttonid}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Button:", json);
        return json as ButtonConfig;
      }
    });
}

// async function saveButton(
//   msg: {
//     buttonid: string;
//     index: number;
//     button: ButtonConfig;
//   },
//   user: Auth.User
// ) {
//   return fetch(`/api/buttons/${msg.buttonid}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       ...Auth.headers(user),
//     },
//     body: JSON.stringify(msg.button),
//   })
//     .then((response: Response) => {
//       if (response.status === 200) return response.json();
//       else throw new Error(`Failed to save destination ${msg.index}`);
//     })
//     .then((json: unknown) => {
//       if (json) {
//         return json as ButtonConfig;
//       }
//       return undefined;
//     });
// }
